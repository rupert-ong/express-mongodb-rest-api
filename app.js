const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const usersRoutes = require('./routes/users');

// DB
mongoose.connect(process.env.MONGO_DB_CONNECTION);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);

// 404 Errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // Server output
  console.error(err);

  // Client output
  res.status(status).json({
    error: {
      message: err.message
    }
  });
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});