//PROMISES VS CALLBACK COMPARISON
//callback
const doWorkCallback = (callback) =>{
    setTimeout(()=>{
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result)=>{
    
    console.log(result)
})
//promise
const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve([7,4,1])
        reject("things went wrong") //vai cair no catch
    }, 2000)
})
//then só executa se as coisas forem bem!
doWorkPromise.then((result)=>{
    console.log('success!', result)
}).catch((error)=>{
    console.log('error', error)
})
