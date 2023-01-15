const { createInput, getAll, getById, updateInput, deleteInput, getByName, getByDate, getByMonth } = require("../repositories/input.repository");
const { inputValidation } = require("../validations/input.validation");

exports.create = async (req, res) => {
    try {
        req.body.userId = req.user.id;
        await inputValidation.validate(req.body);
        const input = await createInput(req.body);
        res.status(200).send(input);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    try {
        const inputs = await getAll();
        res.status(200).send(inputs);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getId = async (req, res) => {
    try {
        const input = await getById(Number(req.params.id));
        res.status(200).send(input);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.update = async (req, res) => {
    try {
        const input = await updateInput(Number(req.params.id), req.body);
        res.status(200).send(input);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.remove = async (req, res) => {
    try {
        await deleteInput(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getName = async (req, res) => {
    try {
        if (!req.query.name) {
            throw { message: "Name é obrigatório" };
        }

        const inputs = await getByName(req.query.name);
        res.status(200).send(inputs);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getDate = async (req, res) => {
    try {
        if(!req.query.date) {
            throw { message: "Date é obrigatório"};
        }

        const inputs = await getByDate(req.query.date);
        res.status(200).send(inputs);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getMonth = async (req, res) => {
    try {
        if (!req.query.month) {
            throw { message: "Month é obrigatório" };
        }

        const inputs = await getByMonth(req.query.month, Number(req.params.id));
        res.status(200).send(inputs);
    } catch (e) {
        res.status(400).send(e);
    }
};