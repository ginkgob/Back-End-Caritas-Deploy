import User from '../models/user';
import express from 'express';

const userController = express();

export const createUser = async (req, res) => {
    const { name, age, email, password } = req.body;
    const newUser = new User({ name, age, email, password });
    await newUser.save();
    res.json({ message: 'User created successfully' });
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
    const { name, age, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, age, email });
    res.json({ message: 'User updated successfully' });
}

export const deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'User deleted successfully' });
}