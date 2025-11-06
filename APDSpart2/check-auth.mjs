import jwt from "jsonwebtoken";

const checkauth=(req,res,next) =>
{

    try{

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token," this_secret_shoud_be_longer_than_it_Is")
        next()
    }
    catch(error)
    {
        res.status(401).json({
            message:"token invalid"
        });
    }
}
export default checkauth