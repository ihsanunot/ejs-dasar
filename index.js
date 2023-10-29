const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

// passing data (cek terminal)
app.use(express.json()); //data json
app.use(express.urlencoded({extended : true})); //data body
// ------------------------------


// settingan EJS
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');


//====================================

// Untuk data nya

let comments = [
    {
        id: uuidv4(),
        username: 'Michael',
        text: `Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way`
    },
    {
        id: uuidv4(),
        username: 'Kelly',
        text: `I talk a lot, so I’ve learned to tune myself out`
    },
    {
        id: uuidv4(),
        username: 'Kevin',
        text: `I JUST WANT TO LIE ON THE BEACH AND EAT HOT DOGS.`
    },
    {
        id: uuidv4(),
        username: 'Dwight',
        text: `IDENTITY THEFT IS NOT A JOKE, JIM! MILLIONS OF FAMILIES SUFFER EVERY YEAR.`
    },
    {
        id: uuidv4(),
        username: 'Ryan',
        text: `I’M SUCH A PERFECTIONIST THAT I'D KINDA RATHER NOT DO IT AT ALL THAN DO A CRAPPY VERSION.`
    },
    {
        id: uuidv4(),
        username: 'Jim',
        text: `EVERYTHING I HAVE I OWE TO THIS JOB… THIS STUPID, WONDERFUL, BORING, AMAZING JOB.`
    },
];


//=== UNTUK CRUD NYA ===

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

app.get('/comments', (req,res) => {
    res.render('comments/index', {comments} )
})

// create

app.get('/create', (req,res) => {
    res.render('comments/create')
})

// post
app.post('/comments', (req,res) => {
    const {username, text} = req.body
    comments.push({ username, text, id: uuidv4()})
    res.redirect('/comments')
})

// show
app.get('/comments/:id/', (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

//patch

app.patch('/comments/:id',(req,res) => {
    const {id} = req.params
    const newComment = req.body.text
    const foundComment = comments.find(c => c.id === id)
    foundComment.text = newComment
    
    res.redirect('/comments')
})


// form edit
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

// delete

app.delete('/comments/:id',(req,res) => {
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

//=== UNTUK RUN SERVER ===

app.get('/order', (req,res) => {
    res.send('ini contoh aja get')
})

app.post('/order', (req, res) => {
    const { item, qty} = req.body
    res.send(` Item: ${item} dan Quantitas : ${qty}  `)
})


app.listen(8080,() => {
    console.log(`Server on http://localhost:8080`);
})