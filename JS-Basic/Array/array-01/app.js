const numbers = [1, 2, 3];
// const moreNumbers = new Array('Hi', 'ABC')//new Array === []
// console.log("numbers: ", numbers)
// console.log("moreNumbers: ", moreNumbers)
// const yetMoreNumbers = Array.of(2)
// console.log("yetMoreNumbers: ", yetMoreNumbers)
// const person = {
//     age: 26
// }
// const hobbies = ['Cooking', 'Playing']
// console.log(hobbies)
// hobbies.push('Reading')
// console.log(hobbies)
// hobbies.unshift('Coding')
// const poppedValue = hobbies.pop()
// hobbies.shift()
// console.log(hobbies)

// hobbies[5] = 'Reading'

// hobbies.splice(0, 0, 'Good Food')
// console.log("1", hobbies)
// const removedElement=hobbies.splice(-2, 1);
// console.log("2:",hobbies, removedElement)

const testResult = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedArray = testResult
// console.log(storedArray)
// testResult.push(5.5)
// console.log(storedArray)
// console.log(testResult.slice(-1))

const personData = [{ name: 'Max' }, { name: 'Manu' }, 3];
const max = personData.find((person, index, persons) => {
    return person.name === 'Max';
});
max.name = 'Anna';
console.log(max);
console.log(personData);

const manuIndex = personData.findIndex((person, idx, persons) => {
    return person.name === 'Manu';
});
console.log(manuIndex);

const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
//const taxAdjPrices = []

// for (const price of prices) {
//     taxAdjustedPrices.push(price *(tax+1))
// }

// prices.forEach((price, idx, prices) => {
//     const priceObj = { index: idx, taxAdjPrice: price * (1 + tax) }
//     taxAdjPrices.push(priceObj)
//  })
// console.log(taxAdjPrices)

//map

// const mapPrice =prices.map(([price, idx, prices]) => {
//     const priceObj = { index: idx, taxAdjPrice: price * (1 + tax) }
//     return priceObj
// })

const storedPrice = prices.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else return -1;
});
console.log(storedPrice.reverse());

//filter
const filteredArray = prices.filter(price => price >= 6);
console.log(filteredArray);

//reduce

// let sum =0 
// const test1 = prices.forEach((price) => { 
//     sum+=price
// }) 
// console.log(sum)

const sumPrices = prices.reduce((acc, cur) => acc+cur, 0)
console.log(sumPrices)


// const test2 = prices.reduce((prevValue, curValue, curIndex, prices) => { 

// })

//배열 구조 분해 할당 

const nameFragment = ['Max', 'Schwarz', 'Mr.', 30]
const [firstName, lastName, ...otherInfo] = nameFragment
console.log(firstName, lastName, otherInfo)