# Technical Test - Readme

## 1. Local Development Guideline

### Prerequisites

- `Docker` & `Docker Compose`
- NodeJS (v10 or above), `npm` and `yarn`

### Setup Local Development Environment

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/mvldevtest/mvl-assignment-124a02dd.git
cd mvl-assignment-124a02dd
```

2. Run docker compose cli to setup the local DB

```
docker-compose up -d
```

3. Run the back-end in development mode (live-reload support)

```
yarn start:dev
```

4. The app should be accessible at http://localhost:4000. (Swagger UI for Documentation)

<image src="./imgs/swagger-img.png" />

<b>Note</b>: The local DB will use port `3306`. If the port is being used, please change it to a different port in `docker-compose.yaml` and `.env`

## 2. Other Notes

### What I have completed

### 1. Functionalities

### ERD

<p align="center">
  <image src="./imgs/dbdesign.png"/>
</p>

1. Login: Feature to log user in when existed
2. Sign Up: Register user into the system, using JWT for authentication
3. Create Reservation: Create a boarding reservation (Only logged in user can created)
4. Arranged Driver: Assign a driver for a reservation
5. Ride: Start/Finish/Cancelled user's reservation
6. Showing list of reservations

### 2. Others

1. Local Development Setup script (1 line setup with Docker)
2. Document with Swagger

### What can be improved

1. More unit tests for `back-end`
2. Mechanism for interacting with Drivers (Authenication, CRUD).
3. Real-time sync for Reservation using `socket.io`
