const express = require("express"); // Importa o 'express' pro projeto
const mongoose = require("mongoose"); // Importa o banco de dados 'mongoose'

const app = express(); // Cria o nosso 'server/app' com o express
app.use(express.json()); // Faz com que o servidor consiga receber requisições JSON

const Person = mongoose.model("Person", {
  nome: String,
});

const port = 3000; // Instala uma porta no nosso servidor

app.get("/", async (req, res) => {
  const allPerson = await Person.find();
  res.send(allPerson);
}); // Lista tudo

app.post("/", async (req, res) => {
  const person = new Person({
    nome: req.body.nome,
  });

  await person.save();
  res.send(person);
}); // Enviando dados para o servidor

app.delete("/:id", async (req, res) => {
  const person = await Person.findByIdAndDelete(req.params.id);
  return res.send(person);
}); // Deleta um usuário do banco de dados

app.put("/:id", async (req, res) => {
  const person = await Person.findByIdAndUpdate(req.params.id, {
    nome: req.body.nome,
  });

  return res.send(person);
}); // Atualiza uma pessoa pelo seu ID

app.listen(port, () => {
  mongoose.connect("database login");
  console.log(`Server is Running in ${port}`);
});
