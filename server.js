// require Dependinces
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get(`/api/notes` ,(req, res) => {
	console.log(`Hitting the API/Notes Route`);
	res.json(db);
})

app.post(`/api/notes`, (req,res) =>{
	console.log(`Hitting the API/NOTES route (with post request)`);

	let newNote = req.body;
	newNote.id = uuidv4();
	db.push(newNote);
	fs.writeFileSync("./db/db.json" , JSON.stringify(db), (err) => {
	if(err) throw err;
	});
	res.send(db);
})

app.delete(`/api/notes/:id` , (req, res)=> {
	console.log(`Hitting the API/NOTES route (with delete request)`);

  const removeIndex = db.findIndex( note => note.id === req.params.id );
  db.splice(removeIndex, 1);
	fs.writeFileSync("./db/db.json" , JSON.stringify(db), (err) => {
		if(err) throw err;
	});
	res.send(db);
})





app.get('/notes' , (req,res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*' , (req,res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT , () => {
	console.log(`listening at port : http://localhost:${PORT}`)
})



