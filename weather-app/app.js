const request = require('request')
const forecast = require('./utils/forecast')


/* const city = 'Porto Alegre'
const key = '5d5fcbee6f54365d079d5fc0d88a2670'
const url = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`

request({url: url, json: true}, (error, response)=>{
    console.log(`${response.body.current.weather_descriptions}, it is currently ${response.body.current.temperature} degrees out, it feels like ${response.body.current.feelslike} degrees out!`)
})
 */
forecast('sao paulo', (error, data)=>{
    console.log(error)
    console.log(data)
})