# Full-Stack Chat Application

A modern, real-time chat application built with a full-stack architecture. This project demonstrates seamless communication between users with features like authentication, message persistence, and responsive design.

## Features

- **Real-Time Messaging**: Instant communication using WebSocket technology.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Message Persistence**: Chat history is stored and retrievable.
- **Scalable Architecture**: Built to handle multiple users simultaneously.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/full-stack-chat-application.git
   cd full-stack-chat-application
   ```

2. Install dependencies for both the server and client:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory and configure the required variables (e.g., database URL, JWT secret).
   - Create a `.env` file in the `client` directory if needed.

4. Start the application:
   ```bash
   # Start the server
   cd server
   npm start

   # Start the client
   cd ../client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Register a new account or log in with existing credentials.
2. Start a chat with other users in real time.
3. Enjoy the responsive and user-friendly interface.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker, Vercel/Heroku

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork:
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```
4. Open a pull request on the main repository.

## License

This project is licensed under the [MIT License](LICENSE).



