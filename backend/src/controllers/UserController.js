require('dotenv/config');

const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

module.exports = {

    async index(request, response){

        jwt.verify(request.headers.authorization, process.env.SECRET, async (err, data) =>{
            if(err){
                response.sendStatus(403)
            }else{
                const users = await connection('user').select('*').orderBy('name');
                return response.json(users);
            }
        });        
    },


    async login(request, response){

        const { email, password } = request.body;

        const salt = bcrypt.genSaltSync(10);

        let user = await connection('user').where({
            email : email,
        });

        if(user[0] == undefined){
            return response.sendStatus(500);
        }

        const match = await bcrypt.compare(password, user[0].password);

        if(match){
            
            var token = jwt.sign({ user }, process.env.SECRET, {
                expiresIn: 1200 // expires in 20min
            });

            response.header('auth', token);

            return response.json({ name: user[0].name, email: user[0].email, token: token });

        }

        return response.sendStatus(500).json({message: 'Login inválido!'});

    },

    async logout(request, response){

        return response.json({email : null, auth: false, token: null });

    },

    async create(request, response){

        const { name, email, password  } = request.body;

        //Verifica se o ID já está cadastrado
        let user = await connection('user').where({
            email : email
        })

        if(user[0] == undefined){

            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);

            user = await connection('user').insert({
                name,
                email,
                password : hashPass
            })

            return response.sendStatus(200);
        }

        return response.sendStatus(404);

    },


}