const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes')

const command = process.argv[2]

if(command === 'add'){
    console.log('Adding note!')
}