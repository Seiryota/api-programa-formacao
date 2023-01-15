const { prisma } = require("../services/prisma");

exports.createInput = async (data) => {
    const input = await prisma.inputs.create({
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId,
        },
    });
    return input;
};

exports.getAll = async () => {
    const inputs = await prisma.inputs.findMany({
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
    return inputs;
};

exports.getById = async (id) => {
    const input = await prisma.inputs.findUnique({
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
    return input;
};

exports.updateInput = async (id, data) => {
    const input = await prisma.inputs.update({
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId,
        },
        where: {
            id,
        },
    });
    return input;
};

exports.deleteInput = async (id) => {
    await prisma.inputs.delete({
        where: {
            id,
        },
    });
    return; 
};

exports.getByName = async (name) => {
    const inputs = await prisma.inputs.findMany({
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
    return inputs;
};

exports.getByDate = async (date) => {
    const inputs = await prisma.inputs.findMany({
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
    return inputs;
};

exports.getByMonth = async (month, userId) => {
    const inputs = await prisma.inputs.findMany({
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
    return inputs;
};