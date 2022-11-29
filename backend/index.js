import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'test',
});


app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{

res.json('hello world')

})

app.get('/movies', (req, res)=>{
const q='SELECT * FROM movies'
db.query(q,(err,data)=>{
if(err) return res.json(err)

res.json(data)


})


})
// add movies
app.post('/movies', (req, res)=>{

    const q ='INSERT INTO movies (`title`,`desc`,`price`,`cover`) VALUES (?)'
const values=[
req.body.title,
req.body.desc,
req.body.price,
req.body.cover,
]

db.query (q,[values],(err,data) => {
    if(err) return res.json(err)

    res.json("movies created successfully")
})
});

//delete movie
app.delete("/movies/:id",(req,res) => {

const movieId = req.params.id
const q ="DELETE FROM movies WHERE id=?"
db.query(q,[movieId],(err,data)=>{
if(err) return res.json(err);
return res.json("movie deleted successfully")

})

});
// update movie
app.put("/movies/:id",(req,res) => {

    const movieId = req.params.id
    const q ="UPDATE movies SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=? "
const values=[
 req.body.title,
req.body.desc,
req.body.price,
req.body.cover,
]

    db.query(q,[...values,movieId],(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
    
    })
    
    })

app.listen (8800,()=>{

console.log("connected to backend ");

})