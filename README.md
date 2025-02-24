# Secret Server

Secret Server is a web application that allows users to create, retrieve, update, and delete secrets. The application is built using Express.js for the backend and Nuxt.js for the frontend.

## Project Structure

```
/home/hunyi/projects/secret_server
├── backend
│   ├── models
│   ├── routes
│   ├── test
│   ├── app.js
├── frontend
│   ├── pages
│   ├── components
│   ├── layouts
│   ├── nuxt.config.js
├── jest.config.js
├── jest.setup.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/secret_server.git
   cd secret_server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URL=mongodb://admin:admin@localhost:27017/secret_server?authSource=admin
   ```

## Running the Application

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start both the backend and frontend servers.

### Production

To build and start the application in production mode:

```bash
npm run build
npm start
```

## Running Tests

To run the tests:

```bash
npm test
```

## API Endpoints

### Create a Secret

- **URL:** `/api/secrets`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "secret": "my secret",
    "redeemLeft": 5,
    "password": "mypassword"
  }
  ```

### Retrieve a Secret

- **URL:** `/api/secrets/:hash`
- **Method:** `GET`
- **Query Parameters:**
  - `password` (optional)

### Update a Secret

- **URL:** `/api/secrets/:hash`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "secret": "new secret"
  }
  ```

## License

This project is licensed under the MIT License.
