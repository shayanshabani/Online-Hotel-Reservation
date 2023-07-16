package main

import (
	pb "final_project_backend/pbGenerated"
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"

	"google.golang.org/grpc"
)

var (
	addrHotel = flag.String("addrHotel", "localhost:8080", "the address to connect to")
)

func login(c *gin.Context) {
	flag.Parse()
	var req pb.LoginUserRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid body request",
		})
		return
	}

	conn, err := grpc.Dial(*addrHotel, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return
	}
	defer conn.Close()
	client := pb.NewUsersServiceClient(conn)

	resp, err := client.LoginUser(c, &req)
	if err != nil {
		log.Printf("could not process request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response = pb.LoginUserResponse{
		Message: resp.Message,
		Success: resp.Success,
		Credit:  resp.Credit,
	}

	if !resp.Success {
		c.IndentedJSON(http.StatusBadRequest, response)
	} else {
		c.IndentedJSON(http.StatusOK, response)
	}
}

func signUp(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.Header("Access-Control-Allow-Origin", "*")
	fmt.Println("before parse")
	flag.Parse()
	var req pb.SignUpUserRequest
	fmt.Println("before bind")
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid body request",
		})
		return
	}
	fmt.Println("after bind")

	conn, err := grpc.Dial(*addrHotel, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return
	}
	defer conn.Close()
	fmt.Println("dial grpc")
	client := pb.NewUsersServiceClient(conn)

	resp, err := client.SignUpUser(c, &req)
	if err != nil {
		log.Printf("could not process request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response = pb.SignUpUserResponse{
		Message: resp.Message,
		Success: resp.Success,
	}

	if !resp.Success {
		c.IndentedJSON(http.StatusBadRequest, response)
	} else {
		c.IndentedJSON(http.StatusCreated, response)
	}
}

func addCredit(c *gin.Context) {
	flag.Parse()
	var req pb.AddCreditRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid body request",
		})
		return
	}

	conn, err := grpc.Dial(*addrHotel, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return
	}
	defer conn.Close()
	client := pb.NewUsersServiceClient(conn)

	resp, err := client.AddCredit(c, &req)
	if err != nil {
		log.Printf("could not process request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response = pb.AddCreditResponse{
		Message: resp.Message,
		Credit:  resp.Credit,
	}
	c.IndentedJSON(http.StatusOK, response)
}

func unavailableDates(c *gin.Context) {
	flag.Parse()
	var req pb.UnavailableDatesRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid body request",
		})
		return
	}

	conn, err := grpc.Dial(*addrHotel, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return
	}
	defer conn.Close()
	client := pb.NewUsersServiceClient(conn)

	resp, err := client.UnavailableDates(c, &req)
	if err != nil {
		log.Printf("could not process request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response = pb.UnavailableDatesResponse{
		Dates: resp.Dates,
	}
	c.IndentedJSON(http.StatusOK, response)
}

func reserve(c *gin.Context) {
	flag.Parse()
	var req pb.ReserveRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid body request",
		})
		return
	}

	conn, err := grpc.Dial(*addrHotel, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return
	}
	defer conn.Close()
	client := pb.NewUsersServiceClient(conn)

	resp, err := client.Reserve(c, &req)
	if err != nil {
		log.Printf("could not process request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response = pb.ReserveResponse{
		Message: resp.Message,
		Success: resp.Success,
	}

	if !resp.Success {
		c.IndentedJSON(http.StatusBadRequest, response)
	} else {
		c.IndentedJSON(http.StatusOK, response)
	}
}

func main() {
	router := gin.Default()
	router.POST("/sign-up", signUp)
	router.POST("/login", login)
	router.POST("/add-credit", addCredit)
	router.POST("/unavailable-dates", unavailableDates)
	router.POST("/reserve", reserve)
	router.Run("localhost:8000")
}
