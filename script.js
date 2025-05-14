#!/usr/bin/env node

import { Command }  from  'commander'
import { readFile } from './utils.js'
import { writeFile } from './utils.js'


const program = new Command()


// 1) Create a Todo app CLI too with following functionality
// 	show => return all todos
// 	add todoName => return new todo
// 	delete todoId => delete todoitem
// 	update todoId todoName => update each todo
// 	use fs module and commander	

program
    .name('todo cli with commander')
    .description('test')
    .version('1.0.0')


program
    .command("show")
    .action(async () => {
        const todos = await readFile("todo-list.json", true)
        console.log(todos);
    })

program
    .command("add")
    .argument("<name>")
    .action(async (name) => {
        const todos = await readFile("todo-list.json", true)
        const lastId = todos[todos.length - 1]?.id || 0
        const newTodo = {
            id: lastId + 1,
            name
        }
        todos.push(newTodo)
        await writeFile ("todo-list.json", JSON.stringify(todos))
        console.log(`todo ${newTodo} added in list`);
    })
program
    .command("delete")
    .argument("<id>")
    .action(async (id) => {
        const todos = await readFile("todo-list.json", true)
        const index = todos.findIndex(el => el.id === Number(id))
        if (index === -1) {
            console.log("can not delete todo");
        }
        const deletedTodo = todos.splice(index, 1)
        await writeFile ("todo-list.json", JSON.stringify(todos))
        console.log(`deleted todo ${deletedTodo}`);
    })
program
    .command("update")
    .argument("<id>")
    .argument("<name>")
    .action(async (id, name) => {
        const todos = await readFile("todo-list.json", true)
        const index = todos.findIndex(el => el.id === Number(id))
        if (index === -1) {
            console.log("can not update todo");
        }
        const updatedTodo = todos[index].name = name
        await writeFile ("todo-list.json", JSON.stringify(todos))
        console.log(`updated ${todos[index]} to ${updatedTodo}`);
    })
program.parse()
