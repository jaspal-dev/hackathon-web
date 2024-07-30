# Flight Management System

## Overview
This application allows agents to register, manage flight updates, and add passenger tickets. Passengers are notified of flight status updates via SMS and email.

## Features
- Agent registration with OTP verification via phone and email
- Add and update flights
- Add passenger requiring phone and email
- Notification to passengers when flight is updated

## Technologies Used
- Node.js
- Express.js
- Nodemailer
- Redis
- JSON Web Tokens (JWT)

## Prerequisites
- Node.js (v14.x or later)
- Redis
- A configured SMTP server (e.g., Gmail)

## Environment Variables
Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
REACT_APP_BASE_URL=<backend url>
```

## Starting App

```npm run start:dev```
