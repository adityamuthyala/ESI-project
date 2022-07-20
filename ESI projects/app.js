const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require("./Database/connectDB");
const memberRouter = require('./Controllers/membership');
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('tiny'))


app.use("/api/v1/members", memberRouter);

app.get("*", (req, res) => {
  res.send("E S I");
});
app.post((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.setHeader({'content-type': `multipart/form-data; boundary=${form_data._boundary}` });
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port : ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


