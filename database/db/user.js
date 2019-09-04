let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankappUser', { useNewUrlParser: true , useCreateIndex:true}, function (err, data) {
    console.log(err || data);
    console.log('mongodb connected');
});
let userSchema = mongoose.Schema({
    username:{
        type: String,
        require:true,
    },
    amount:{
        type:Number,
        require:true
    },
    email:{
        type : String,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    dob:{
        type:String,
        default: Date.now
    }
})
let User = mongoose.model('user',userSchema);
module.exports=User;