const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'auth filed' })
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer") {
            return res.status(401).json({error: "неверный тип токена"});
        }

        try {
            console.log(token, 'token')
            req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
            
            next()
        } catch (e) {
            return res.status(401).json({e});
        }
}