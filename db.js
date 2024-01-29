import mongoose from 'mongoose';
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((connect) => {
      console.log('Connected to MongoDB');
    }).catch((error) => {
      console.log('ERROR to MongoDB', error);
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;
