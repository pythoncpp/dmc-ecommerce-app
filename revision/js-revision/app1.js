// const: constant
// let: scoped variable
// function:
// - types
//   - named
//   - unnamed  / anonymous / arrow  / fat arrow (=>)
// - by default every function received two hidden parameters
//   - this: current function
//   - arguments: list of all arguments passed to this function

function function1() {
  console.log('inside function1')
}

// function1()

function function2(p1, p2) {
  console.log(`p1: ${p1}, p2: ${p2}`)
}

// function2(10, 20)
// function2(10)
// function2()

// variable length argument function
function function3() {
  // console.log(arguments)
  let sum = 0
  for (const value of arguments) {
    sum += value
  }

  console.log(`sum = ${sum}`)
}

// function3(10, 20, 30, 40, 50, 60)
// function3(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

const function4 = () => {
  console.log(`inside function 4`)
}

// function4()
console.log(`function4 = ${function4}, type = ${typeof function4}`)
