const express = require('express');
const fileupload = require('express-fileupload');
const { stringify } = require('querystring');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(fileupload({
    createParentPath: true
}));

const index = require( __dirname + "/index.json");

//Sending list of available images
app.get('/', (req, res) => {
    res.json(index);
})

//Sending image
app.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.sendFile(index[parseInt(req.params.id)].name,  { root: __dirname + "/images"});
})

//Updating images
app.post('/upload',(req, res) => {
    const image = req.files.myFile;
    const path = __dirname + '/images/' + image.name;
    let size = +index[0].size + 1;

    index[0].size = size.toString();

    image.mv(path);
    index.push({id: index[0].size, name: image.name});

    const fs = require("fs");
    let indjson = fs.readFileSync("index.json","utf-8");

    let ind = JSON.parse(indjson);

    ind.push({id: index[0].size , name: image.name});
    ind[0].size=index[0].size;

    indjson = JSON.stringify(ind);

    fs.writeFileSync("index.json",indjson,"utf-8");
})

app.listen(5000, () => console.log('Server started'));