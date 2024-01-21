// Promise
// - ways / style
//   - using Promise() function which returns a promise object
//   - using async .. await: preferred
// - outcomes
//   - resolve
//   - reject
const axios = require('axios').default

function function1() {
  console.log('started timeout')
  setTimeout(() => {
    console.log(`function executed..`)
    printInfo()
  }, 2000)

  function printInfo() {
    console.log('printing information....')
  }
}

// function1()

function function2() {
  function myFunction() {
    return new Promise(
      // resolver
      () => {
        console.log(`resolver called`)
        return 'success'
      },

      // rejecter
      () => {
        console.log(`rejecter called`)
        return 'error'
      }
    )
  }

  myFunction()
    .then((result) => {
      console.log('then called', result)
    })
    .catch((error) => {
      console.log('catch called', error)
    })
    .finally(() => {
      console.log('finally called')
    })
}

// function2()

function function3() {
  async function myFunction() {
    setTimeout(() => {
      console.log('timeout executed')
    }, 2000)
  }

  const value = myFunction()
  console.log(`value = ${value}`)
}

// function3()

function function4() {
  axios
    .get('https://dummy.restapiexample.com/api/v1/employees')
    .then((result) => {
      console.log('result -> ', result.data)

      // first api has finished its execution
      axios
        .get('https://dummy.restapiexample.com/api/v1/employee/1')
        .then((result) => {
          console.log(result.data)

          // call next api
          axios
            .delete('https://dummy.restapiexample.com/public/api/v1/delete/2')
            .then((result) => {
              console.log(result.data)
            })
        })
    })
    .catch((error) => {
      console.log('error -> ', error)
    })
}

// function4()

async function function5() {
  // first api call
  try {
    const result = await axios.get('https://dummy.restapiexample.com/ap')
    console.log(result.data)

    // second api call
    const result2 = await axios.get(
      'https://dummy.restapiexample.com/api/v1/employee/1'
    )
    console.log(result2.data)

    // third api call
    const result3 = await axios.delete(
      'https://dummy.restapiexample.com/public/api/v1/delete/2'
    )
    console.log(result3.data)
  } catch (ex) {
    console.log(ex)
  }
}

function5()
