// next => se está ok, avance, passe para a próxima etapa.
// headers => cabeçalho;

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ message: "Token é obrigatório" });
    } 

    try {
        const replace = token.replace("Bearer ", "" );
        const decoded = jwt.verify(replace, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
};