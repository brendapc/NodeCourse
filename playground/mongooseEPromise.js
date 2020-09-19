require('../task-manager/src/db/mongoose')
const User = require('../task-manager/src/models/user')
const Task = require('../task-manager/src/models/task')
/* 
User.findByIdAndUpdate('5f654d43c22d3e2a08690d8f', { age: 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
}) */
/* 
Task.findByIdAndDelete('5f650210c8fcff5524605504').then((task)=>{

    return Task.countDocuments({ completed: false})
}).then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})
 */
/* const uptadeAgeSndCount = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, { age: age})
    const count = await User.countDocuments({ age })
    return count
}

uptadeAgeSndCount('5f650210c8fcff5524605504', 1).then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
}) */

const deleteTask = async (id, situation) =>{
     await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: situation})
    return count
}

deleteTask('5f65e64899bf3b5a702cb08f', false).then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
})