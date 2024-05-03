require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const app = express()

//Middleware
app.use(express.json())

//DB Modelos
const Tarefa = mongoose.model('tarefa', { nome: String })

//Rotas
app.get('/hello', (req, res) => {
    res.json("Hello")
})

app.get('/tarefas', async (req, res) => {
    const tarefa = await Tarefa.find()
    res.json(tarefa)
})

//Att

app.put('/tarefas/:id', async (req, res) => {
    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, { nome: req.body.nome }, { new: true})
    res.json(tarefa)
})

app.get('/tarefas/:id', async (req, res) => {
    const tarefa = await Tarefa.findById(req.params.id)
    res.json(tarefa)
})

app.post('/tarefas', async (req, res) => {
    const corpo = req.body
    const tarefa = new Tarefa({ nome: req.body.nome })
    await tarefa.save()
    res.json(tarefa)
})

//delete

app.delete('/tarefas/:id', async (req, res) => {
    await Tarefa.findByIdAndDelete(req.params.id)
    res.json()
})


const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://moisesmelo70:iIPun9a4wOwV0iam@minha-api.adys2zu.mongodb.net/?
retryWrites=true&w=majority&appName=Minha-API`)
    .then(() => console.log("Conectado ao meu MongoDB!"))
    .catch(err => console.log("Erro ao conectar no meu MongoDB: ", err))



app.listen(3000, () => {
    console.log("Api rodando em http://localhost:3000")
})