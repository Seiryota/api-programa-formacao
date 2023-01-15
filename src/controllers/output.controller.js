const { outputValidation } = require("../validations/output.validation");
const { createOutput, getAll, getById, updateOutput, deleteOutput, getByMonth, getByName, getByDate  } = require("../repositories/output.repository")

exports.create = async (req, res) => {
    try {
        await outputValidation.validate(req.body);
        const output = await createOutput(req.body);
        res.status(200). send(output);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    try {
        const outputs = await getAll();
        res.status(200).send(outputs);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getId = async (req, res) => {
    try {
        const output = await getById(Number(req.params.id));
        res.status(200).send(output);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.update = async (req, res) => {
    try {
        const output = await updateOutput(Number(req.params.id), req.body );
        res.status(200).send(output);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.remove = async (req, res) => {
    try {
        await deleteOutput(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getName = async (req, res) => {
    try {
        if(!req.query.name) {
            throw { message: "Name é obrigatório" };
        }
        const outputs = await getByName(req.query.name);
        res.status(200).send(outputs);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getDate = async (req, res) => {
    try {
        if (!req.query.date) {
            throw { message: " Date é obrigatório" };
        }
        const outputs = await getByDate(req.query.date);
        res.status(200).send(outputs);
    } catch (e) {
        res.status(400).send(e);
    }
};
 
exports.getMonth = async (req, res) => {
    try{
        if (!req.query.month) {
            throw { message: "Month é obrigatório" }; 
        }
        const outputs = await getByMonth(req.query.month, Number(req.params.id));
        res.status(200).send(outputs);
    } catch (e) {
        res.status(400).send(e);
    }
};