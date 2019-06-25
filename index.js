const express = require("express");

const server = express();

server.use(express.json());

/** Rota Padrão */
const route = "/projects/";

/** Array Base */
const projects = [
  { id: "1", title: "Sistema de Tarefa", tasks: [] },
  { id: "2", title: "Novo Site", tasks: [] }
];

/** Lista todos os projetos */
server.get(route, (req, res) => {
  return res.json(projects);
});

/** Lista um único projeto */
server.get(`${route}:index`, (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

/** Cadastra projeto */
server.post(route, (req, res) => {
  const { id, title } = req.body;
  const addProject = { id, title, tasks: [] };

  projects.push(addProject);

  return res.json(projects);
});

/** Cadastra Tarefa */
server.post(`${route}:index/tasks`, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const addTask = [title];

  projects[index].tasks = addTask;

  return res.json(projects);
});

/** Edita nome do projeto */
server.put(`${route}:index`, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects);
});

/** Deleta projeto */
server.delete(`${route}:index`, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.send();
});

/** Define porta */
server.listen(3333);
