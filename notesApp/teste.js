const chalk = require('chalk')
const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'save',
    describe: 'saving...',
    handler: function(){
        console.log('eh as guria')
    }
})

console.log(yargs.argv)