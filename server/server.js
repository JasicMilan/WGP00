const express = require('express')
const fileupload = require('express-fileupload')

const app = express()

app.use(fileupload({
    createParentPath: true
}));
//app.use(express.json())
//app.use(bodyParser.json());

let size = 3;
index=[{ id: 1, name: '1.jpg'},
        {id: 2, name: '2.jpg'},
        {id: 3, name: '3.jpg'}]

app.get('/', (req, res) => {
    res.send(index);
})

app.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.sendFile(index[parseInt(req.params.id)].name,  { root: __dirname + "/images"})
})

app.post('/test',(req, res) => {
    //console.log(req.body)
    const image = req.files.myFile
    const path = __dirname + '/images/' + image.name

    image.mv(path)
    index.push({id: size + 1, name: image.name})
    res.send(size)
})

app.listen(5000, () => console.log('Server started'))