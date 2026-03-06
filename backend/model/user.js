const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String,
        default: null
    }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    try {
        
        const person = this;
        if(!person.isModified('password')) return;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next;
    } catch (error) {
        throw error
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isPasswordMatched = await bcrypt.compare(candidatePassword, this.password);
        return isPasswordMatched;
    } catch (error) {
        console.log(error);
        return res(error);
    }
}

const User = mongoose.model('User', userSchema);




module.exports = User;