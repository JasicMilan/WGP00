const express= require('express')
const app = express()

//const path =  __dirname + "/images"

index=[{ id: 1, name: '1.jpg'},
        {id: 2, name: '2.jpg'}]

index.push({id:3, name:'3.jpg'})

app.get("./api/", (req, res) => {
   //res.sendFile("1.jpg", __dirname + '/images')
   res.sendFile(index)
})

app.get('/:id', (req, res) => {
    //let ind = index.find(index => index.id === parseInt(req.params.id))
    //if(!index[parseInt(req.params.id)]) res.status(404).send("Page not available")
    console.log(req.params.id);
    res.sendFile(index[parseInt(req.params.id)].name,  { root: __dirname + "/images"})
})

app.listen(3000, () => console.log('Server started'))