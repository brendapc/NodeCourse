const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv){
        notes.addNotes(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing the note')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out all notes')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note')
    }
})

yargs.parse()