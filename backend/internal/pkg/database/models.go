// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2

package database

import (
	"database/sql"
)

type Person struct {
	ID       int64
	Username string
	Password string
	Credit   sql.NullInt32
}

type Reservation struct {
	RoomID   int32
	PersonID int32
	Dates    []int32
}

type Room struct {
	ID    int64
	Size  sql.NullInt32
	Beds  sql.NullInt32
	Floor sql.NullInt32
	Price sql.NullInt32
}
