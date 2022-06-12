const express= require('express')
const app = express()

index=[{ id: 1, name: '1.jpg'},
        {id: 2, name: '2.jpg'}]

index.push({id:3, name:'3.jpg'})

app.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.sendFile(index[parseInt(req.params.id)].name,  { root: __dirname + "/images"})
})

app.listen(3000, () => console.log('Server started'))