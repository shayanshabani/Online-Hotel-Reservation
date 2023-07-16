// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: person.sql

package database

import (
	"context"
	"database/sql"
)

const createPerson = `-- name: CreatePerson :one
INSERT INTO person(username, password)
VALUES ($1, $2)
RETURNING id, username, password, credit
`

type CreatePersonParams struct {
	Username string
	Password string
}

func (q *Queries) CreatePerson(ctx context.Context, arg CreatePersonParams) (Person, error) {
	row := q.db.QueryRowContext(ctx, createPerson, arg.Username, arg.Password)
	var i Person
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Password,
		&i.Credit,
	)
	return i, err
}

const getPersonByUsername = `-- name: GetPersonByUsername :one
SELECT id, username, password, credit
FROM person
WHERE username = $1
`

func (q *Queries) GetPersonByUsername(ctx context.Context, username string) (Person, error) {
	row := q.db.QueryRowContext(ctx, getPersonByUsername, username)
	var i Person
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Password,
		&i.Credit,
	)
	return i, err
}

const updateCredit = `-- name: UpdateCredit :exec
UPDATE person
SET credit = $2
WHERE username = $1
`

type UpdateCreditParams struct {
	Username string
	Credit   sql.NullInt32
}

func (q *Queries) UpdateCredit(ctx context.Context, arg UpdateCreditParams) error {
	_, err := q.db.ExecContext(ctx, updateCredit, arg.Username, arg.Credit)
	return err
}
