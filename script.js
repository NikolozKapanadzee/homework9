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











program.parse()
