const { prisma } = require("../services/prisma");

exports.getByTotals = async (month) => {
    const totalInputs = await prisma.inputs.groupBy({
        where: {
            month,
        },
        by: ["month"],
        _sum: {
            value: true,
        },
    });

    const totalOutputs = await prisma.outputs.groupBy({
        where: {
            month,
        },
        by: ["month"],
        _sum: {
            value: true,
        },
    });

    const valueInputs = totalInputs.length ? totalInputs[0]._sum.value : 0;
    const valueOutputs = totalOutputs.length ? totalOutputs[0]._sum.value : 0;
    const balance = valueInputs - valueOutputs;
    
    return { valueInputs, valueOutputs, balance };
};