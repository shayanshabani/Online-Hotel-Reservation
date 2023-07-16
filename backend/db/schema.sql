CREATE TABLE room
(
    id   BIGSERIAL PRIMARY KEY,
    size INTEGER DEFAULT 1,
    beds INTEGER DEFAULT 0,
    floor INTEGER DEFAULT 1,
    price INTEGER DEFAULT 100
);

CREATE TABLE person
(
    id   BIGSERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE reservation
(
    room_id INTEGER REFERENCES person(id),
    person_id INTEGER REFERENCES room(id),
    CONSTRAINT rooms_person_pk PRIMARY KEY(room_id,person_id, dates),
    dates Integer[]
);
