const express = require('express'); // Add express
const mongoose = require('mongoose'); // Import mongoose for model stuff
const middleware = require('./middleware');
const authRoute = require('./routes/auth');



const CONNECTION_URL = process.env.CONNECTION_STRING
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;


const app = express(); // Init express.js


// Add headers before the routes are defined
app.use(middleware.enableCrossOrigin);


app.use(express.json()); // Apply json middleware
app.use('/api/auth', authRoute);


app.listen(PORT, () => {
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

