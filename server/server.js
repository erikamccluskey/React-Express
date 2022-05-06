const express = require("express");

//middleware
const bodyParser = require("body-parser"); //parses incoming request bodies
const cookieParser = require("cookie-parser"); //parses the cookie header on the request, cookie data is req.cookies
const compression = require("compression"); //compresses response vodies for all requests that traverse through
const helmet = require("helmet"); //sets security-related HTTP response headers (i.e. secures HTTP headers)
const cors = require("cors"); //allows to reconfigure the API's security, restricts cross-origin HTTP requests (scripts from browsers)

//this will happen after every request
const logger = function (req, res, next) {
  console.log("Logged");
  next();
};

//routes
const homeRouter = require("./routes/home-route");
const usersRouter = require("./routes/users-route");

//port
const PORT = process.env.PORT || 4000;

//express app
const app = express();

//implement middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger);

//ensure we are in dev environment
if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
  app.get("*", (req, res) => {
    res.sendFile("build/index.html", { root: __dirname });
  });
}

//route for /api endpoint
app.use("/api", homeRouter);

//route for /users endpoint
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!"); //server error response
});

//start express app
app.listen(PORT, function () {
  console.log(`Server running on: ${PORT}`);
});
