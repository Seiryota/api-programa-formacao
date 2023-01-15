const { getByTotals } = require("../repositories/total.repository");

exports.getTotals = async (req, res) => {
    try {
        if (!req.query.month) {
            throw { message: "Month é obrigatório" };
        }

        const total = await getByTotals(req.query.month);
        res.status(200).send(total);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
}; 