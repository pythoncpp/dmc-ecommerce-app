// functional programming language
// - functions are considered as first class citizens
// - function can be passed to another function as a parameter
// - function can be returned as a return value from another function

// collection
// - collection of similar to dissimilar values

function function1() {
  const numbers = [10, 20, 30, 40, 50]
  console.log(numbers)

  // for .. of loop
  for (const value of numbers) {
    console.log(`value = ${value}`)
  }

  console.log('----')

  // traditional for loop
  for (let index = 0; index < numbers.length; index++) {
    console.log(`value = ${numbers[index]}`)
  }

  console.log('----')

  // for .. in loop
  for (const index in numbers) {
    console.log(`index = ${index}, value = ${numbers[index]}`)
  }

  console.log('----')

  // forEach loop
  numbers.forEach((value) => {
    console.log(`value = ${value}`)
  })
}

// function1()

function function2() {
  // array of numbers
  const numbers = [1, 2, 3, 4, 5]
  console.log(numbers)

  const squares = numbers.map((value) => {
    return value ** 2
  })
  console.log(`squares = ${squares}`)

  const cubes = numbers.map((value) => {
    return value ** 3
  })
  console.log(`cubes = ${cubes}`)
}

// function2()

function function3() {
  const persons = [
    { id: 1, name: 'person1', address: 'pune', age: 10 },
    { id: 2, name: 'person2', address: 'mumbai', age: 20 },
    { id: 3, name: 'person3', address: 'satara', age: 14 },
    { id: 4, name: 'person4', address: 'pune', age: 17 },
    { id: 5, name: 'person5', address: 'karad', age: 30 },
    { id: 6, name: 'person6', address: 'kolhapur', age: 60 },
  ]

  console.log(persons)

  console.log('------')

  // get names and ages of all persons
  // select name, age from persons;
  const info = persons.map((person) => {
    return { name: person['name'], age: person['age'] }
  })
  console.log(info)
}

// function3()

function function4() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(numbers)

  const evenNumbers = numbers.filter((value) => {
    return value % 2 == 0
  })
  console.log(evenNumbers)

  const oddNumbers = numbers.filter((value) => {
    return value % 2 != 0
  })
  console.log(oddNumbers)
}

// function4()

function function5() {
  const persons = [
    { id: 1, name: 'person1', address: 'pune', age: 10 },
    { id: 2, name: 'person2', address: 'mumbai', age: 20 },
    { id: 3, name: 'person3', address: 'satara', age: 14 },
    { id: 4, name: 'person4', address: 'pune', age: 17 },
    { id: 5, name: 'person5', address: 'karad', age: 30 },
    { id: 6, name: 'person6', address: 'kolhapur', age: 60 },
  ]

  console.log(persons)

  console.log('------')

  // get persons from pune
  // select * from persons where address = 'pune';
  const personsFromPune = persons.filter((person) => {
    return person['address'] == 'pune'
  })
  console.log(personsFromPune)

  // get persons from pune
  const personsFromPuneAbove15 = persons.filter((person) => {
    return person['address'] == 'pune' && person['age'] >= 15
  })
  console.log(personsFromPuneAbove15)
}

// function5()

function function6() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(numbers)

  // square of even numbers
  const squaresOfEvenNumbers = numbers
    .filter((value) => {
      return value % 2 == 0
    })
    .map((value) => {
      return value ** 2
    })
  console.log(squaresOfEvenNumbers)

  // cube of odd numbers
  const cubeOfOddNumbers = numbers
    .filter((value) => {
      return value % 2 != 0
    })
    .map((value) => {
      return value ** 3
    })
  console.log(cubeOfOddNumbers)
}

function6()
