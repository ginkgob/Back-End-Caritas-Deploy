import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
// import { MONGODB_URI_TEST, MONGODB_URI_TESTING, NODE_ENV } from 'process.env';

const conectionString = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_URI_TESTING 
  : process.env.MONGODB_URI_TEST;

// mongoose.connect(process.env.MONGODB_URI_TEST, {
mongoose.connect(conectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
  // useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));