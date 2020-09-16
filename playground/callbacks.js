const names = ['Andrew','July', 'Anna']
const shortNames = names.filter((name)=>{
    return name.length <= 4
})

console.log(shortNames)

const exemplo = (adress, callback)=>{
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitute: 0
        }
        callback(data) 

    }, 2000);
}
/* não é possivel pois funções assincronas só retornam depois que o código todo ja foi executado aula 20 do curso de nodejs udemy
const result = exemplo("filadelfia")
*/

exemplo('new york',(result)=>{
    console.log(result)
})

//challange
const add = (a, b, callback)=>{
    setTimeout(() => {
        const res = a + b
        callback(res)

    }, 2000);
}

add(1,4,(sum)=>{
    console.log(sum)
})