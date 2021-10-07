const express=require('express')
app=express()
app.use(express.json())


const port = process.env.port || 3000

app.listen(port,() => console.log(`listening on port ${port}`))

const obj={"name":"Arun"}

let books=[
    {
        "id":1,
        "name":"C Programming Language",
        "author":"Dennis Ritchie"
    },
    {
        "id":2,
        "name":"Algorithms",
        "author":"Coremann"
    }
]


app.get('/',(req,res) =>{ res.send(obj)})

app.get('/api/books',(req,res) =>{ res.send(books)})

app.get('/api/books/:id',(req,res) =>
{ 
    const book = books.find(b => b.id === parseInt(req.params.id))
    res.send(book)
})

app.post('/api/books',(req,res) => {
    console.log(req.body)
    const newBook = {
        "id":books.length+1,
        "name":req.body.name,
        "author":req.body.author
    }

    if(!newBook) return res.status(400).send('Bad Request!')

    books.push(newBook)
    return res.status(200).send(newBook)
})

