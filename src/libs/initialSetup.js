import User from '../models/User';
import dotenv from "dotenv";
dotenv.config();

export const createUsers = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    
    if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
      await User.deleteMany({});
      console.log('Users deleted in initialSetup');
    };
    if (count > 0) {
      console.log('Users already exists');
      return;
    }
    
    const users = [
      {
        name: 'seeder user 1',
        age: 20,
        email: 'seeder.user1@gmail'
      }, {
        name: 'seeder user 2',
        age: 19,
        email: 'seeder.user2@gmail'
      }, {
        name: 'seeder user 3',
        age: 27,
        email: 'seeder.user3@gmail'
      }
    ];
    
    for (let user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    console.log('Seeder users created');
  } catch (error) {
    console.log(error);
  }
}