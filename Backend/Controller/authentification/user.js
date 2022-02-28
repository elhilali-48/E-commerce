const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/authentifiaction/User')

const createToken = (id) => {
    return jwt.sign({ id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h' })
}

module.exports.login_get = (req,res)=>{
    res.render('login')
}

module.exports.login_post = async (req,res)=>{
   console.log(req.body.email)
    try {
        const user = await User.findOne({email:req.body.email})
        if (user){
            const passwordValid = await bcrypt.compare(req.body.password, user.password)
            if(!passwordValid){
               console.log("Password not valid");
               res.send('pasword not valid')
            }
            else{
                
                try {
                    const token = createToken(user._id)
                    res.cookie('jwt', token, { httpOnly: true })
                    res.status(200).json({ user: user, token })
                } catch (error) {
                    res.status(400).json({ errors })
                }
                res.status(201).json({ user: user })

            }
        }
        else{
            res.send('User non trouvé')
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports.logout = (req, res) =>
{
    res.cookie('jwt', '', { maxAge: 1 })
    res.send('logout success')
    res.redirect('/admin/login')
   
}