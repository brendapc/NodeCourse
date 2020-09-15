const request = require('request')

const forecast = (local, callback)=>{
    const key = '5d5fcbee6f54365d079d5fc0d88a2670'
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${local}`

    request({url: url, json: true}, (error, response)=>{
        if(error){
            //callback(error, response)
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.error){
            callback('Unable to find place' , undefined)
        }else{
            callback(undefined, `the current temperature is ${response.body.current.temperature}`)
        }
    })
}

module.exports = forecast