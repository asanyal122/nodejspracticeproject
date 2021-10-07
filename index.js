const express=require('express')
const app=express()
const Joi=require('joi')
app.use(express.json())


const port = process.env.port || 3000

app.listen(port,() => console.log(`listening on port ${port}`))

function validateBook(book)
{
    const schema=Joi.object({
        "name":Joi.string().min(3).required(),
        "author":Joi.string().min(3).required()
    });

    const {error} = schema.validate(book);
    return error;
}

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
    const error = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message)



    const newBook = {
        "id":books.length+1,
        "name":req.body.name,
        "author":req.body.author
    };

    const similarBook=books.find( b => {
        return b.name === newBook.name && b.author === newBook.author;
    })

    if(similarBook) return res.status(400).send("Duplicate Book!Can't add.")

    books.push(newBook)
    return res.status(200).send(newBook)
})

