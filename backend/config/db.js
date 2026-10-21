const mongoose = require('mongoose');

async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured');
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message));
  await mongoose.connect(process.env.MONGO_URI, { autoIndex: true });
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
module.exports = connectDB;
