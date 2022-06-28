import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
// import { MONGODB_URI_TEST, MONGODB_URI_PROD, NODE_ENV } from 'process.env';

// const conectionString = NODE_ENV === 'test' 
//   ? MONGODB_URI_TEST 
//   : MONGODB_URI_PROD;

mongoose.connect(process.env.MONGODB_URI_TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));