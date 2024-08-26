import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import path from "node:path";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      if (!req.body?.title || !req.body?.description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Title and description are required" }));
      }

      const { title, description } = req.body;

      console.log(title, description);

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Title or description is required" }));
      }

      const [task] = database.select("tasks", { id });

      database.update("tasks", id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.update("tasks", id, {
        completed_at: task?.completed_at ? null : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(204).end();
    },
  },
];
