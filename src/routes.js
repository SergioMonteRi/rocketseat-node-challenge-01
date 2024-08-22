const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Desafio ignite",
    completed_at: null,
    created_at: "2021-06-23T00:00:00.000Z",
    updated_at: "2021-06-24T00:00:00.000Z",
  },
];

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      res.writeHead(200);
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      console.log(req.body);
      return res.writeHead(201).end();
    },
  },
];
