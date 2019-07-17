import express from "express";
import dotenv from 'dotenv';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from "./swagger.json";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// IMPORT ROUTES
import registerRoute from "./routes/api/user";
import loginRoute from "./routes/api/auth";
import tripRoute from "./routes/api/trip";
import busRoute from "./routes/api/bus";
import bookingRoute from "./routes/api/booking";

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ROUTES
app.use("/api/user/signup", registerRoute);
app.use("/api/auth/signin", loginRoute);
app.use("/api/trip", tripRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/bus", busRoute);

// Home page route
app.get('/', (req, res) => {
    res.status(200).json(
      {
        data: [{
          message: 'Welcome to WayFare API Home Route',
        }],
      },
    );
  });

//  Handle invalid route 
app.use((req, res) => {
        res.status(404).json({
          status: 404,
          error: 'Wrong request. Route does not exist',
        });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`WAYFARER LISTENING ON PORT ${PORT}`)
});

export default app;
