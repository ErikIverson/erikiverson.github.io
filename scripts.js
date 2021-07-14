
const table = document.getElementById('root')
// load logo img here
const row = document.createElement('tr')
row.setAttribute('class', 'container')
// Add logo as child here
table.appendChild(row)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const year = urlParams.get('classYear')
console.log(year)

const selectedOption = document.getElementById(year)
selectedOption.setAttribute('selected', 'true')
// Open a new connection, using the GET request on the URL endpoint
if (year == 'seniors'){
  request.open('GET', 'https://sheetdb.io/api/v1/k9kb39f1qbhol/search?Year=Senior&sort_by=Points&sort_order=desc', true)
} else if (year == 'juniors'){
  request.open('GET', 'https://sheetdb.io/api/v1/k9kb39f1qbhol/search?Year=Junior&sort_by=Points&sort_order=desc', true)
}else if (year == 'sophomores'){
  request.open('GET', 'https://sheetdb.io/api/v1/k9kb39f1qbhol/search?Year=Sophomore&sort_by=Points&sort_order=desc', true)
} else if (year == 'firstYears'){
  request.open('GET', 'https://sheetdb.io/api/v1/k9kb39f1qbhol/search?Year=First%20Year&sort_by=Points&sort_order=desc', true)
} else if (year == 'allMembers'){
  request.open('GET', 'https://sheetdb.io/api/v1/k9kb39f1qbhol?sort_by=Points&sort_order=desc', true)
}
request.onload = function () {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    var i = 1
    if (request.status >= 200 && request.status < 400) {
        data.forEach((person) => {
          const newRow = document.createElement('tr')

          const rank = document.createElement('td')
          rank.textContent = i
          newRow.appendChild(rank)
          i ++

          const points = document.createElement('td')
          points.textContent = person.Points
          newRow.appendChild(points)

          const firstName = document.createElement('td')
          firstName.textContent = person.First
          newRow.appendChild(firstName)

          const lastName = document.createElement('td')
          lastName.textContent = person.Last
          newRow.appendChild(lastName)

          const classYear = document.createElement('td')
          classYear.textContent = person.Year
          newRow.appendChild(classYear)

          table.appendChild(newRow)
        })
      } else {
        console.log('error')
      }
}

// Send request
request.send()

