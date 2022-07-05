import User from '../models/User';
// import express from 'express';

// const userController = express();

export const createUser = async (req, res) => {
    const { name, surname, age, sex, nationality, email, password } = req.body;
    const newUser = new User({ name, surname, age, sex, nationality, email, password });
    await newUser.save();
    res.json({ message: 'Usuario creado correctamente!' });
}


export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
    //res.json({ message: 'Get all users' });
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

export const updateUser = async (req, res) => {
    const { name, surname, age, sex, nationality, email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, surname, age, sex, nationality, email, password });
    res.json({ message: 'El usuario ha sido actualizado' });
}

export const deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'El usuario se ha eliminado correctamente' });
}