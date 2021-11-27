import crypto from "crypto";
import Cookie from "cookies";
import jwt from "jsonwebtoken";
import db from "../../../controller/db";
import config from '../../../configs';
import User from '../../../models/User';

function login(req,res){
    const { username, password } = req.body;
    const cookies = new Cookie(req,res);
    if (!username || !password) {
        return res.status(200).json({
            error: 'Please include a username and password'
        });
    }
    try{
        User.findOne({username: username}, (err, user) => {
            if (!user) {
                return res.status(200).json({
                    error: 'Invalid username or password'
                });
            }
            const encryptedPassword = crypto.createHmac('sha256', config.PASSWORD_SECRET)
                .update(password)
                .digest('hex');
            if (user.password !== encryptedPassword) {
                cookies.set('token', "", { httpOnly: true , expires: new Date(Date.now() -10000)});
                return res.status(200).json({
                    error: 'Invalid username or password'
                });
            }

            const token = jwt.sign({
                username: user.username,
                isAdmin: user.isAdmin
            }, config.JWT_SECRET, { expiresIn: '2h' });
            cookies.set('token', token, { httpOnly: true , expires: new Date(Date.now() + 2 * 3600000)});
            return res.json({
                message: 'You are now logged in',
                isAdmin: user.isAdmin
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
}

export default db(login);
