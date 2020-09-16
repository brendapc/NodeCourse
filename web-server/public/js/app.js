console.log('client side javascript')

fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.forecast)
            console.log(data.address)
        }
    })
})
