import { getToken } from "../service/authUser.js";


async function requiredAuth(req,res,next){

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const user = await getToken(token);
 
    if (!user) {
        return res.status(403).json({ message: "Invalid token! Please log in again." });
    }
    req.user=user;
    next()
};
export default  requiredAuth