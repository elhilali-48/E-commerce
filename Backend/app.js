const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.nctg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })

.then(() => console.log("connextion reussi "))
.catch(()=> console.log("connextion echoué "));

module.express = app;