/*
1. Vou importar o prisma para verificar se o usuário existe.
2. Instalar uma biblioteca (yarn add jsonwebtoken) chamada JWT , que gerará o token.
3.  Instalado, será realizado a importação do JWT.
4. Importar o bcrypt que faz a criptografia da senha - utilizado para comparar se a senha que está vindo é a mesma que está armazenada no banco de dados.
return: para a função e não executa o restante do código.
status 400 - erro / status 401 - não autorizado.
*/

const { prisma } = require("../services/prisma"); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt");

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status (400).json({message: "Usuário e senha são obrigatórios"});
        }

        const user  = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if(user && !user.status) {
            return res.status(401).json({message: "Usuário bloqueado"});
        }

        if (user  && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                process.env.TOKEN_KEY,
                { expiresIn: "1h" } 
            );

            return res.status(200).json({token})
        } else {
            res.status(401).json({ message: "Usuário e/ou senha incorretos" })
        }
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

exports.validate = async (req, res) => {
    try {
        if (!req.body.token) {
            return res.status(400).json({ message: "Necessário informar o token "});
        }

        const decode = await jwt.decode(req.body.token);
        res.status(200).send(decode);
    } catch (e) {
        res.status(400).send(e);
    }
};