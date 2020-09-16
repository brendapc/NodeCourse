//Object Property Shorthand

const name = 'Brenda'
const userAge = 17

const user = {
    name, //shorthand for "name: name"
    age: userAge, //shorthand doesn't apply
    location: 'Porto Alegre'
}

console.log(user)

//Object destructuring

const products = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4
}

const {label , stock} = products //extract from product the label and stock
console.log(label)
console.log(stock)

const { price:objectPrice} = products //extract with a rename
console.log(objectPrice)
console.log(products) //doen't change the object

const { rating = 5} = products //if doesn't have (undefined) rating, use 5
console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log( type , label, stock)
}

transaction('buy', products)