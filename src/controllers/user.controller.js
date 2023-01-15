const bcrypt = require("bcrypt");
const {  userValidation  } = require("../validations/user.validation");
const { createUser, getAll, getById, updateUser, deleteUser } = require("../repositories/user.repository");

exports.create = async  (req, res) => {
    try {
        await userValidation.validate(req.body);

        const password = await bcrypt.hash(req.body.password, 10);
        req.body.password = password;

        const user = await createUser(req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    try {
        const users = await getAll();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getId = async (req, res) => {
    try {
        const user = await  getById(Number(req.params.id));
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.update = async (req, res) => {
    try {
        const user = await updateUser(Number(req.params.id), req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.remove = async (req, res) => {
    try {
        await deleteUser(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
}