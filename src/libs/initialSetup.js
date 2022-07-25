import Role from '../models/Role';
import User from '../models/User';
import dotenv from "dotenv";
dotenv.config();

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if(count > 0) return;

    await new Role({ name: "admin" }).save();
    await new Role({ name: "user" }).save();
    await new Role({ name: "guest" }).save();

    /* await Promise.all([
      new Role({name: 'admin'}).save(),
      new Role({name: 'user'}).save(),
      new Role({name: 'guest'}).save(),
    ]) */

  } catch (error) {
    console.error(error);
  }
}

export const createUsers = async () => {
  try {
    let count = await User.estimatedDocumentCount();
    
    if (process.env.NODE_ENV == 'test'/*  || process.env.NODE_ENV == 'development' */) {
      // search id of admin role
      // const adminRole = await Role.findOne({name: 'admin'});
      const userRole = await Role.findOne({name: 'user'});
      const guestRole = await Role.findOne({name: 'guest'});

      await User.deleteMany({
        // delete all users and guests
        $or: [
          {roles: {$in: [userRole._id]}},
          {roles: {$in: [guestRole._id]}},
        ]
      });
      console.log('Users deleted in initialSetup');
      count = await User.estimatedDocumentCount();
      return count;
    };
    if (count > 0) return;

    /* const admin = new User({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'password',
      roles: [await Role.findOne({name: 'admin'})._id]
    }); */
    
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

    // await newUser(admin).save();
    
    for (let user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    console.log('Seeder users created');
  } catch (error) {
    console.log(error);
  }
}
