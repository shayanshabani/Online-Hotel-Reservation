-- name: GetRoomsReservedDates :many
SELECT dates
FROM reservation
WHERE room_id = $1;

-- name: CreateReservation :one
INSERT INTO reservation(room_id, person_id, dates)
VALUES ($1, $2, $3)
RETURNING *;
