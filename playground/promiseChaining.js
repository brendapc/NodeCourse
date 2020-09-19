const add = (a, b) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        }, 2000)
    })
}

add(1,2).then((sum)=>{
    console.log(sum)
    return add(sum, 10) //chama a função de novo
}).then((sum2)=>{
    console.log(sum2)
}).catch((err)=>{      //pega o erro das duas
    console.log(err)
})

