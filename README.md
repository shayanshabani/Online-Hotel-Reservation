# Online Hotel Reservation Website

Welcome to the Online Hotel Reservation Website! This web application allows users to sign up or login, manage their profiles, and reserve hotel rooms online.



https://user-images.githubusercontent.com/94615406/9460fcb3-f592-4366-b45b-5f8cd8136d42

![Online Hotel Reservation demo](./assets/Web.gif)


## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Contact](#contact)

## Introduction

The Online Hotel Reservation Website is a project developed for a web programming course. The goal of this project is to provide users with a user-friendly interface to find available hotel rooms, filter them based on various criteria, and make reservations. Additionally, users can manage their profiles and track their account balances.

Key features of the website include:

- User registration and login functionality.
- User profile management.
- Hotel room listing with details.
- Room search and filtering based on price, size, and other attributes.
- Room reservation with the option to increase account balance.
- User-friendly and responsive design.

## Features

### User Registration and Login
New users can sign up by providing a username and creating a password. Existing users can log in using their username and password.

### User Profile Management
Users can view and manage their profiles after logging in. They can increase their current account balance.

### Hotel Room Listing
The website displays a list of available hotel rooms with essential details such as room type, size, price, and amenities.

### Room Search and Filtering
Users can easily search for rooms based on their preferences. The search feature allows filtering by price range, room size, and other room attributes.

### Room Reservation
Once a suitable room is found, users can reserve it for their desired dates. If their account balance is insufficient, they can increase it before proceeding with the reservation.

### Account Balance Management
Users have the option to increase their account balance by making deposits. The balance is updated in real-time.

## Getting Started
### Prerequisites
To run this project locally, you need the following installed on your system:
- Nodejs and npm (for running fron-end)
- react, react-router, and react-router-dom
- data-fns
- go, migrate, and PostgreSQL (for running back-end)
- Web browser (Google Chrome, Mozilla Firefox, etc.)
- Git (for cloning the repository)
### Installation
1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/shayanshabani/Online-Hotel-Reservation.git
   ```
1. Create a new PostgreSQL database and add these environment variables:
DB__Server=postgresql,
DB__Name=postgres,
DB__Host=localhost,
DB__Port=5432,
and then use the make migrate_up command to add tables.

1. Run the gRPC server and then run the gateway in HotelServer/ using the go run command.

1. use `npm run start` to launch the website on `http://localhost:3000`

### Error handling
If you encounter any error launching the website use the following commands:
- `npm install data-fns`
- `npm install react-router-dom@5`
- `npm i --save-dev @types/react-router-dom`

## Technologies Used
The Online Hotel Reservation Website was built using the following technologies:
- React, JavaScript, CSS, and Tailwind for front-end development
- Go, gRPC, and gin for back-end
- PostgreSQL and sqlc for database management.

## Contact
If you have any questions or need further assistance, please feel free to contact me: [Shayan Shabani](mailto:shayan.shabani5814@gmail.com)
