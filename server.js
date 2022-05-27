const path = require('path');
const express = require('express');
const app = express();
const router = require('./route')


app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','views'));

app.use(router);

app.listen(5000, () => console.log("Server running in port 5000"));