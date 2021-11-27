import Cookie from "cookies";
export default function logout(req,res){
    const cookies = new Cookie(req,res);
    cookies.set('token', "", { httpOnly: true , expires: new Date(Date.now() -10000)});
    res.send({
        message: "Logged out successfully"
    });
}
