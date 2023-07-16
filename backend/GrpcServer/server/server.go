package main

import (
	"context"
	"database/sql"
	"final_project_backend/config"
	"final_project_backend/internal/pkg/database"
	pb "final_project_backend/pbGenerated"
	"final_project_backend/pkg/slice"
	"flag"
	"fmt"
	"github.com/lib/pq"
	_ "github.com/lib/pq"
	"log"
	"net"
	"sync"

	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 8080, "The server port")
)

type server struct {
	pb.UnimplementedUsersServiceServer
	db database.Querier
}

func (s *server) SignUpUser(ctx context.Context, req *pb.SignUpUserRequest) (*pb.SignUpUserResponse, error) {
	username := req.Username
	password := req.Password
	fmt.Println(username)
	fmt.Println(password)
	_, err := s.db.CreatePerson(ctx, database.CreatePersonParams{Username: username, Password: password})
	if err != nil {
		if pqerr, ok := err.(*pq.Error); ok &&
			pqerr.Code == "23505" {
			return &pb.SignUpUserResponse{Success: false, Message: "this username is already taken"}, nil
		} else {
			return nil, fmt.Errorf("create person %w", err)
		}
	}

	return &pb.SignUpUserResponse{Success: true, Message: "person created successfully"}, nil
}

func (s *server) LoginUser(ctx context.Context, req *pb.LoginUserRequest) (*pb.LoginUserResponse, error) {
	username := req.Username
	password := req.Password

	person, err := s.db.GetPersonByUsername(ctx, username)
	if err != nil {
		log.Println(fmt.Errorf("get user %w", err))
		return &pb.LoginUserResponse{Success: false, Message: "username or password is invalid"}, nil
	}

	if person.Password != password {
		return &pb.LoginUserResponse{Success: false, Message: "username or password is invalid"}, nil
	}

	return &pb.LoginUserResponse{Success: true, Credit: person.Credit.Int32, Message: "logged in successfully"}, nil
}

func (s *server) AddCredit(ctx context.Context, req *pb.AddCreditRequest) (*pb.AddCreditResponse, error) {
	username := req.Username

	person, err := s.db.GetPersonByUsername(ctx, username)
	if err != nil {
		return nil, fmt.Errorf("get person %w", err)
	}

	totalCredit := req.Credit + person.Credit.Int32

	err = s.db.UpdateCredit(ctx, database.UpdateCreditParams{Username: username, Credit: sql.NullInt32{Valid: true, Int32: totalCredit}})
	if err != nil {
		return nil, fmt.Errorf("add credit %w", err)
	}

	return &pb.AddCreditResponse{Credit: totalCredit, Message: "add credit successfully"}, nil
}

func (s *server) UnavailableDates(ctx context.Context, req *pb.UnavailableDatesRequest) (*pb.UnavailableDatesResponse, error) {
	roomId := req.RoomId

	reservations, err := s.db.GetRoomsReservedDates(ctx, roomId)
	if err != nil {
		return nil, fmt.Errorf("get reservation %w", err)
	}

	var reservedDates []int32
	for _, reservation := range reservations {
		reservedDates = append(reservedDates, reservation...)
	}

	reservedDates = slice.Unique(reservedDates)

	return &pb.UnavailableDatesResponse{Dates: reservedDates}, nil
}

func (s *server) Reserve(ctx context.Context, req *pb.ReserveRequest) (*pb.ReserveResponse, error) {
	roomId := req.RoomId
	username := req.Username
	dates := req.Dates

	room, err := s.db.GetRoomById(ctx, int64(roomId))
	if err != nil {
		log.Println(fmt.Errorf("get room %w", err))
		return &pb.ReserveResponse{Message: "invalid roomId", Success: false}, nil
	}

	person, err := s.db.GetPersonByUsername(ctx, username)
	if err != nil {
		log.Println(fmt.Errorf("get person %w", err))
		return &pb.ReserveResponse{Message: "invalid username", Success: false}, nil
	}

	if len(dates) < 0 {
		return &pb.ReserveResponse{Message: "selected dates are not valid", Success: false}, nil
	}

	if int32(len(dates))*room.Price.Int32 > person.Credit.Int32 {
		return &pb.ReserveResponse{Message: "your credit is not enough. please charge your valet", Success: false}, nil
	}

	_, err = s.db.CreateReservation(ctx, database.CreateReservationParams{Dates: dates, PersonID: int32(person.ID), RoomID: roomId})
	if err != nil {
		log.Println(fmt.Errorf("create reservation %w", err))
		return &pb.ReserveResponse{Message: "reservation failed. please try again", Success: false}, nil
	}

	totalCredit := person.Credit.Int32 - int32(len(dates))*room.Price.Int32

	err = s.db.UpdateCredit(ctx, database.UpdateCreditParams{Username: username, Credit: sql.NullInt32{Valid: true, Int32: totalCredit}})
	if err != nil {
		return nil, fmt.Errorf("add credit %w", err)
	}

	return &pb.ReserveResponse{Message: "reserved successfully", Success: true}, nil
}

func main() {
	flag.Parse()
	conf, err := config.Load()
	if err != nil {
		log.Fatalf("load config %v", err)
	}
	conn, err := database.NewDBConnection(&conf.DB)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	db := database.New(conn)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterUsersServiceServer(s, &server{db: db})

	wg := sync.WaitGroup{}
	wg.Add(1)
	go func() {
		defer wg.Done()
		if err := s.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	}()
	wg.Wait()
}
