const { urlencoded } = require('express');
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const urlRoutes = require('./routes/urlRoutes');
var port = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3000",
    allowedHeaders : ["Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"],
    credentials : true,
    methods: ["GET","PUT","POST","DELETE","HEAD","OPTIONS","PATCH"]
}

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.listen(port);


console.log('API started on:' + port);

mongoose
.connect(
    "mongodb://mab:51263@cluster0-shard-00-00.5xnhs.mongodb.net:27017,cluster0-shard-00-01.5xnhs.mongodb.net:27017,cluster0-shard-00-02.5xnhs.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-c5jdsq-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
.then(() => console.log("DB connected"));

app.use("/", urlRoutes);