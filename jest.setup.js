const mongoose = require('mongoose');

beforeAll(async () => {
  const dbUrl = process.env.MONGO_URL || 'mongodb://admin:admin@localhost:27017/secret_server_test?authSource=admin';
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
