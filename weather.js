#!/usr/bin/env node

import { Command }  from  'commander'



const program = new Command()


program
    .name('weather cli with commander')
    .description('test')
    .version('1.0.0')



// 2) Create a weather API CLI tool that:
//         /Takes a city name as input.
//         /Fetches and displays the exact temperature in Celsius using this API endpoint:
//         /https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c


program 
    .command("show")
    .description("show weather")
    .argument("<cityName>")
    .action(async (cityName) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`)
        const data = await response.json()
        console.log(`weather in the ${cityName} is ${data.main.temp} Celsius`)
    })




program.parse()

