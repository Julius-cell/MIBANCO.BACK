// PACKAGES REQUIRED
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

// FILES REQUIRED
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const transferRouter = require('./routes/transferRoutes');

const app = express();

app.enable('trust proxy');

// --------------------- GLOBAL MIDDLEWARES ---------------------
// Implement CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());
app.options('*', cors());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use(compression());
// -------------------------------------------------------

// -------------------  STATICS FILES  -------------------
app.use(express.static('public'));
// -------------------------------------------------------

// ----------------------- ROUTES ------------------------
app.use('/v1/user', userRouter);
app.use('/v1/transfer', transferRouter);
// -------------------------------------------------------

// --------------------- ROUTE ERROR ---------------------
app.use('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
// -------------------------------------------------------


// ---------  ERROR HANDLING MIDDLEWARES -----------------
app.use(globalErrorHandler);
// -------------------------------------------------------

module.exports = app;
