import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import DB from './db.js';

// let data = [
    
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

const generateRandomInt = () => {
    const max = 5000;
    let generatedId = Math.floor(Math.random() * max);
    if (data.find(entry => entry.id === generatedId)) {generateRandomInt()}
    return generatedId;
}



const app = express();
app.use(express.json());
app.use(express.static('build'))

morgan.token('post', function (req, res) { return JSON.stringify(req.body) })

app.use(
    morgan(function (tokens, req, res) {
        
        if (tokens.method(req, res) === "POST") {
            
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens.post(req, res)
          ].join(' ')
        }

        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
          ].join(' ')
    
  })
)

app.use(cors());

app.get("/api/persons", (req, res) => {
  DB.getPhoneBookEntries()
  .then(result => res.send(result))
  .catch((err) => console.log(err))
})

app.get("/api/persons/:id", (req, res) => {
    let entry = data.find(entry => entry.id === Number(req.params.id));
    if(!entry) {res.status(404).end(); return;}
    res.json(entry);
})

app.get("/api/info", (req, res) => {
    res.send(`Phonebook has info for ${data.length}people\n${new Date()}`);
})

app.delete("/api/persons/:id", (req, res) => {
    data = data.filter(entry => entry.id !== Number(req.params.id));
    res.status(204).end();
})

app.post("/api/persons", (req, res) => {
    if (!req.body.name || !req.body.number) {return res.status(400).json({error: "name and/or number missing"})}
    // if (data.find(entry => entry.name === req.body.name)) {return res.status(400).json({error: "name already exists"})}
    // if (data.find(entry => entry.number === req.body.number)) {return res.status(400).json({error: "number already exists"})}
    
    // const entry = {
    //     id: generateRandomInt(),
    //     name: req.body.name,
    //     number: req.body.number
    //   }

    // data.push(entry);
    // res.json(entry);

    DB.createNewEntry(req.body.name, req.body.number)
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

