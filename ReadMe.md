# Node.js E-Commerce API

This is a Node.js E-Commerce API with user authentication using JSON Web Tokens (JWT), cart management, and order placement functionality.

## Prerequisites

- Node.js and npm installed on your system
- MongoDB database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/node-ecommerce-api.git
```

2. Navigate to the project directory:

```bash
cd node-ecommerce-api
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the project root and add the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your-secret-key
```

Replace `your_database_name` with your MongoDB database name and `your-secret-key` with your desired secret key for JWT encryption.

## Usage

1. Start the server:

```bash
npm start
```

2. Access the API at `http://localhost:3000`.

## Sawggar documentation of API
To access swagger documentation visit at `http://localhost:5000/api-docs/`
