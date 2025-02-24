const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const secretRoutes = require('./routes/secrets');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:admin@localhost:27017/secret_server?authSource=admin';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 5000,
  useFindAndModify: false, // Set useFindAndModify to false
}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');
});

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use('/api/secrets', secretRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;