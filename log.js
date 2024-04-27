const firebaseConfig = {
  apiKey: "AIzaSyDwJoZSozy2eSMMWbyZk6H9kqfQPRSARmY",
  authDomain: "status-page-1c514.firebaseapp.com",
  projectId: "status-page-1c514",
  storageBucket: "status-page-1c514.appspot.com",
  messagingSenderId: "440010962307",
  appId: "1:440010962307:web:38d031812d5010ecb232b6"
}

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let missed = 0

function show() {
  event.preventDefault()
  document.querySelector('#loginbox').style.display = 'none'
  document.querySelector('#maincontent').style.display = 'block'
}
function login() {
  console.log('Login')
  let pwinput = document.querySelector('#pw').value
  console.log(pwinput)
  if (pwinput == 'prestonkwei.com') {
    show()
  } else {
    console.log('Incorrect Password')
    alert('Sorry, the password you entered is incorrect. Please try again.')
  }
}

document.querySelector('#type').addEventListener('change', () => {
  let selectedValue = document.querySelector('#type').value
  if (selectedValue == 'partial') {
    document.querySelector('#preview').style.display = 'block'
    document.querySelector('#preview').style.background = '#f0ba3e'
  } else if (selectedValue == 'major') {
    document.querySelector('#preview').style.display = 'block'
    document.querySelector('#preview').style.background = '#f53b3b'
  } else if (selectedValue == 'minor') {
    document.querySelector('#preview').style.display = 'block'
    document.querySelector('#preview').style.background = '#94fc03'
  } else {
    document.querySelector('#preview').style.display = 'none'
  }
})
function generateCode() {
  let letters = 'abcdefghijklmnopqrstuvwxyz'
  let numbers = '0123456789'
  let result = ''
  
  for (let i = 0; i < 4; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  for (let i = 0; i < 4; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return result.split('').sort(() => 0.5 - Math.random()).join('')
}

let code = generateCode()
console.log(code)

document.querySelector('#outageid').innerHTML = 'Outage ID: '+ code

async function log() {
  console.log('Log Outage')
  console.log(document.querySelector('#type').value)
  await database.ref('outages/' + code).update({ 
    id: code,
    desc: document.querySelector('#desc'),
    type: document.querySelector('#type').value,
    date: document.querySelector('#outagedate')
  }) 
  // LAST THING TO HAPPEN
  alert('This outage has been logged. View this outage using outage id: '+code)
}

document.querySelector('#disruptionlog').addEventListener('submit', log)