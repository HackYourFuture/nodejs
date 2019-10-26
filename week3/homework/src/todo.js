'use strict';

const fs = require('fs');
const uuid = require('uuid/v4');

const DEFAULT_ENCODING = 'utf8';

class Todo {
  constructor(filename) {
    this._filename = filename;
  }

  async create(description) {
    const todos = await this.read();

    const todo = {
      id: uuid(),
      done: false,
      description,
    };

    todos.push(todo);

    await this._save(todos);

    return todo;
  }

  read() {
    return new Promise(resolve => {
      fs.readFile(this._filename, DEFAULT_ENCODING, (error, data) => {
        if (error) return resolve([]);

        return resolve(JSON.parse(data));
      });
    });
  }

  async update(id, description) {
    const todos = await this.read();

    const todo = todos.find(t => t.id === id);
    if (todo == null) {
      const error = new Error(`To-do with ID ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }

    todo.description = description;

    await this._save(todos);

    return todo;
  }

  async updateDone(id, done) {
    const todos = await this.read();
    const maybeTodo = todos.find(todo => {
      return todo.id === id;
    });
    if (maybeTodo) {
      maybeTodo.done = done;
      await this._save(todos);
      return maybeTodo;
    } else {
      throw Error(`Couldn't find any to-do that has ${id}`);
    }
  }

  async delete_(id) {
    const todos = await this.read();
    const filteredTodos = todos.filter(t => t.id !== id);

    return this._save(filteredTodos);
  }
  async delete_() {
    let todos = await this.read();
    todos = [];
    return this._save(todos);
  }

  // Methods starting with underscore should not be used outside of this class
  _save(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._filename, JSON.stringify(todos, null, 2), error =>
        error == null ? resolve() : reject(error),
      );
    });
  }
}

module.exports = Todo;
