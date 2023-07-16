-- name: GetRoomById :one
SELECT *
FROM room
WHERE id = $1
LIMIT 1;
