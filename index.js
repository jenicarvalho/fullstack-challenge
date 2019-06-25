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

/** Middlewares */

function checkProjectExists(req, res, next) {
  const { index } = req.params;
  const project = projects.find(p => p.id === index);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

/** Lista todos os projetos */
server.get(route, (req, res) => {
  return res.json(projects);
});

/** Lista um único projeto */
server.get(`${route}:index`, checkProjectExists, (req, res) => {
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
server.post(`${route}:index/tasks`, checkProjectExists, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const addTask = [title];

  projects[index].tasks = addTask;

  return res.json(projects);
});

/** Edita nome do projeto */
server.put(`${route}:index`, checkProjectExists, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects);
});

/** Deleta projeto */
server.delete(`${route}:index`, checkProjectExists, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.send();
});

/** Define porta */
server.listen(3333);
