const User = require('../model/user');
const{generateRefreshToken,generateAccessToken} = require('../auth')

const handleUserSignupRoute = async (req, res) =>{
  
    try {
        const body = req.body;
        console.log(body)
        if(!body || !body.name || !body.email || !body.password){
            return res.status(401).json({msg : "all the field are required"})
        }

        // now user has added all the field create a new document for the user

        const response = await User.create({
            name: body.name,
            email: body.email,
            password: body.password
        })

        console.log(response)
        /// now the new user has been created and the user will be provided a access token and the refresh tooken

        // payload means some basic information that before creating the token 

        const payload = {
            userId: response._id,
            username : response.name
        }

        const refreshToken = generateRefreshToken(payload);
        const accessToken = generateAccessToken(payload);

        // we should save the refreshtoken in the db
        response.refreshToken = refreshToken;
        await response.save();

        return res.status(200).json({msg : 'user created successfully', response, accessToken : accessToken, refreshToken: refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : "server error"});
    }

}
const handleUserLoginRoute = async (req, res) => {
    try {
        const {email, password} = req.body;
        /// verify the email and the password exist or not 
        const user = await User.findOne({email : email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({msg : "invalid username or password"});
        }

        const payload = {
            userId : user._id,
            username : user.name
        }

        const refreshtoken = generateRefreshToken(payload);
        const accessToken = generateAccessToken(payload);
        // we should save the refreshtoken to the user document 
        user.refreshToken = refreshtoken;
        await user.save();
        return res.status(200).json({msg : 'signin success', refreshtoken, accessToken});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : error.msg});
    }
}
module.exports = {handleUserSignupRoute, handleUserLoginRoute}