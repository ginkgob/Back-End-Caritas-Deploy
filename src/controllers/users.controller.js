import User from '../models/User';

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

export const getUserRoles = async (req, res) => {
    const user = await User.findById(req.params.id).populate("roles");
    res.json({ roles: user.roles });
}

export const updateUser = async (req, res) => {
    const { name, surname, age, address, city, province, zip, phone, sex, nationality, email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, surname, age, address, city, province, zip, phone, sex, nationality, email, password });
    res.json({ message: 'El usuario ha sido actualizado' });
}

export const deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'El usuario se ha eliminado correctamente' });
}