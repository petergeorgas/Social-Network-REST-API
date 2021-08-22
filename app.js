const express = require('express'); // Add express
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing the password 
const mongoose = require('mongoose'); // Import mongoose for model stuff
const middleware = require('./middleware');
require('dotenv').config();

const CONNECTION_URL = process.env.CONNECTION_STRING
const token_secret = process.env.TOKEN_SECRET
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;


const app = express(); // Init express.js


// Add headers before the routes are defined
app.use(middleware.enableCrossOrigin);


app.use(express.json()); // Apply json middleware

const port = 3000; // We will use port 8080 for this API 


const userRouter = express.Router();
// Registering (creating an account) 
userRouter.route('/register')
    .post((request, response) => {
        const {firstName, lastName, email, pass} = request.body; // Get the body 
        
        // Hash the password 
        bcrypt.hash(pass, 10, (err, hash) => {
            if(err) {
                response.status(500).json(error); 
            } else {
                // Create a new user matching our mongodb schema
                const newUser = User({
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email,
                    pass: hash
                }); 
                newUser.save()
                    .then(user => {
                        response.status(200).json({token: generateToken(user)});
                    })
                    .catch(error => {
                        response.status(500).json(error); 
                    });
            }
        })
    });

// Logging in 
userRouter.get('/login', (request, response) => {
    User.findOne({email: request.body.email})
    .then( user => {
        if(!user) {
            response.status(404).json({error: "No user found"});
        } else {
            bcrypt.compare(request.body.pass, user.pass, (err, match) => {
                if(err) {
                    response.status(500).json(err); 
                } else if (match) {
                    response.status(200).json({token: generateToken(user)});
                } else {
                    response.status(403).json({error: "Passwords do not match"});
                }
            });
        }
    })
    .catch(error => {
        response.status(500).json(error);
    })
});

app.use(userRouter);

const journalRouter = express.Router();
journalRouter.route('/entries')
    .get((request, response) => {
        return response.status(200);
    });
app.use(journalRouter);

app.listen(port, () => {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (error, client) => {
        if(error) {
            throw error;
        }
        database = mongoose.connection;
        user_collection = database.collection("uj_accounts");
        ent_collection = database.collection("uj_entries")
        console.log(`Connected to ${DB_NAME}! API Running on port ${PORT}.`);

        if(user_collection){console.log(`Found collection uj_accounts!`);}
        if(ent_collection){console.log(`Found collection ent_collection!`)};
    });
});

// Generate a token 
function generateToken(user) {
    return jwt.sign({data: user}, token_secret, {expiresIn: '24h'}); // Sign a certificate using our secret token that expires in 1 day... 
}