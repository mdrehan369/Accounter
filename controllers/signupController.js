import session from "express-session";
import userModel from "./../lib/userSchema.js";

const signupController = async (req, res) => {
    const { Name, Email, Number, Password } = req.body;

    let p1 = await userModel.findOne({email: Email});
    let p2 = await userModel.findOne({number: Number});

    if(p1 == null && p2 == null){

        const user = new userModel({
            name: Name,
            email: Email,
            number: Number,
            password: Password
        });

        try{
            await user.save();
            console.log("Saved!!\n");
            session.user = {
                name: Name,
                email: Email,
                number: Number
            };
            res.redirect("/");
        }catch(err){
            res.render("signup", {user: session.user, msg: "Invalid Inputs!"});
        }

    }else{
        res.render("signup", {user: session.user, msg: "User Already Exists!"});
    }
};

export default signupController;
