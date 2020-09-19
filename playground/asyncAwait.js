const add = (a, b) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        }, 2000)
    })
}

const doWork = async () =>{
    const sum = await add(10,20)
    const sum2 = await add(sum,20)
    const sum3 = await add(sum2,20)
    return sum3
}

doWork().then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})

