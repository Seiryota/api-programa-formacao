const { prisma } = require("../services/prisma");

exports.createOutput = async (data) => {
    const output = await prisma.outputs.create({
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId,
        },
    });
    return output;
};

exports.getAll = async () => {
    const outputs = await prisma.outputs.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }
        },
    });
    return outputs;
};

exports.getById = async (id) => {
    const output = await prisma.outputs.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }
        },
    });
    return output;
};

exports.updateOutput = async (id, data) => {
    const output = await prisma.outputs.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId,
        },
    });
    return output;
};

exports.deleteOutput = async (id) => {
    await prisma.outputs.delete({
        where: {
            id,
        },
    });
    return;
};

exports.getByName = async (name) => {
    const outputs = await prisma.outputs.findMany({
        where: {
            name,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }
        },
    });
    return outputs;
};

exports.getByDate = async (date) => {
    const outputs = await prisma.outputs.findMany({
        where: {
            date,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }
        },
    });
    return outputs;
};

exports.getByMonth = async (month, userId) => {
    const outputs = await prisma.outputs.findMany({
        where: {
            month,
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }
        },
    });
    return outputs;
};