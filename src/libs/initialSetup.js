import Role from '../models/Role';
import User from '../models/User';
import dotenv from "dotenv";
dotenv.config();

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if(count > 0) return;

    await Promise.all([
      new Role({name: 'admin'}).save(),
      new Role({name: 'user'}).save(),
      new Role({name: 'guest'}).save(),
    ])

  } catch (error) {
    console.error(error);
  }
}

export const createUsers = async () => {
  try {
    let count = await User.estimatedDocumentCount();
    
    if (process.env.NODE_ENV == 'test'/*  || process.env.NODE_ENV == 'development' */) {
      await User.deleteMany({});
      console.log('Users deleted in initialSetup');
      count = await User.estimatedDocumentCount();
      return count;
    };
    if (count > 0) {
      console.log('Users already exists');
      return;
    }
    
    const users = [
      {
        name: 'seeder user 1',
        surname: 'Surname',
        age: 20,
        email: 'seeder.user1@gmail',
        password: 'password',
      }, {
        name: 'seeder user 2',
        age: 19,
        sex: 'M',
        email: 'seeder.user2@gmail',
        password: 'password',
      }, {
        name: 'seeder user 3',
        age: 27,
        sex: 'F',
        nationality: 'Colombia',
        email: 'seeder.user3@gmail',
        password: 'password',
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
