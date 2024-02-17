const ids = new Set([1, 2, 3])
ids.add(2)
ids.delete(2)
console.log(ids.has(2))

// for (const entry of ids.entries()) { 
//     console.log(entry[0])
// }


//Map

// const person1 = {name: 'Max'}
// const person2 = { name: 'Anna' }

// const personData = new Map([[person1, [{ date: 'today', price: 10 }]]])

// personData.set(person2, [{ date: 'now', price: 20 }])
// // console.log(personData)
// // console.log(personData.get(person1))//key를 이용하여 - value값을 얻음

// for (const entry of personData.entries()) { 
//     console.log(entry)
// }

// for (const [key, value] of personData.entries()) { 
//     console.log(key, value)
// }

// for (const key of personData.keys()) { 
//     console.log(key)
// }
// for (const value of personData.values()) { 
//     console.log(value)
// }

//Weak Set + Weak Map

let person = { name: 'Max' }
const persons = new WeakSet()
persons.add(person)
//WeakSet:: 가바지 컬렉션으로 해당 Set에 포함되어 있는 해당 항목을 직접 삭제헤서 더이상 코드의 일부로 남아 있지 않게 함.
//~> WeakSet을 이용하면 가비지 컬렉션 작업이 뒤따른다.