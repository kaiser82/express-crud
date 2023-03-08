const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const users = require('./data.json')


app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000


async function run() {
    try {

        app.get('/user/random', async (req, res) => {
            const randomIndex = Math.floor(Math.random() * users.length);
            const randomUser = users[randomIndex];
            res.send(randomUser)
        })

        app.get('/user/all', async (req, res) => {
            const limit = req.query.limit;
            res.send(users.slice(0, limit))
        })

        app.post('/user/save', async (req, res) => {
            const user = req.body;
            users.push(user)
            res.send(users)
        })

        app.patch('/user/update/:id', async (req, res) => {
            const { id } = req.params;
            const filter = { id: id }
            const result = users.find(user => user.id === id)
            console.log(result)
            res.send(result)
        })

        app.delete('/user/delete/:id', (req, res) => {
            const { id } = req.params;
            const filter = { id: id };
            const newUsers = users.filter(user => user.id !== id)
            res.send(newUsers);
        })

    }

    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('CRUD server is running')
})

app.listen(port, () => {
    console.log(`CRUD server is running on port ${port}`)
})