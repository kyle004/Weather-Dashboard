const shortDate = (dt) => {
  let dateObject = new Date(dt * 1000)
  let humanDateFormat = dateObject.toLocaleString()
  let sdate = dateObject.toLocaleString("en-US", { weekday: "long" }) + ", " + dateObject.toLocaleString("en-US", { month: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { day: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { year: "numeric" })
  return sdate
}

const Display = (bold) => {

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${bold}&units=imperial&appid=68d634195147f679bc3416e5b0e9d434`)
    .then(res => {
      let weather = res.data
      // console.log(weather)
      document.getElementById('cityLocation').innerHTML = `${weather.name}`
      document.getElementById('conditions').innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'>`
      document.getElementById('temp').innerHTML = `${weather.main.temp}`
      document.getElementById('hum').innerHTML = `${weather.main.humidity}`
      document.getElementById('wndSpd').innerHTML = `${weather.wind.speed}`
      document.getElementById('date').innerHTML = Date()
      //gets 5 day forecast
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=imperial&appid=68d634195147f679bc3416e5b0e9d434`)
        .then(resp => {
          let weatherc = resp.data.current
          let future = resp.data.daily
          let resultName = res.data.name

          let history = JSON.parse(localStorage.getItem('history')) || []
          history.push({ resultName })
          localStorage.setItem('history', JSON.stringify(history))
          document.getElementById('searchHistory').innerHTML = ''
          for (let h = history.length - 1; h > -1; h--) {
            document.getElementById('searchHistory').innerHTML += `
        <button type="button" class="list-group-item list-group-item-action" data-val="${history[h].resultName}">${history[h].resultName}</button>`
          }
          // console.log(history)
          // console.log(future)
          for (let i = 0; i < 5; i++) {
            //inputs 5 day forecast data onto page
            document.getElementById(`slot-${i + 1}`).innerHTML = `
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">${shortDate(future[i].dt)}</h5>
        <img src='http://openweathermap.org/img/wn/${weatherc.weather[0].icon}.png'>
        <h6 class="card-text">Max: ${future[i].temp.max} &degF</h6>
        <h6 class="card-text">Min: ${future[i].temp.min} &degF</h6>
        <h6 class="card-text">Humidity: ${future[i].humidity}%</h6>
        </div>
        </div>
        `
            console.log(weatherc)
          }

          // identifies UV index and changes color based on its value
          document.getElementById('uvInd').innerHTML = `${weatherc.uvi}`
          if (weatherc.uvi >= 0 && weatherc.uvi < 3) {
            document.getElementById("uvInd").classList.add("bg-success")
          } else if (weatherc.uvi >= 3 && weatherc.uvi < 6) {
            document.getElementById("uvInd").classList.add("bg-warning")
          } else if (weatherc.uvi >= 6 && weatherc.uvi < 9) {
            document.getElementById("uvInd").classList.add("bg-danger")
          } else {
            document.getElementById("uvInd").classList.add("bg-dark")
          }
        })
    })
}
let history = JSON.parse(localStorage.getItem('history')) || []

document.getElementById('weatherSearch').addEventListener('click', event => {
  event.preventDefault()
  Display(document.getElementById('citySearch').value)
})
//clear history
document.getElementById('clearHistory').addEventListener('click', event => {
  event.preventDefault()
  let clrHst = confirm('Are you sure you want to clear your history?')
  if (clrHst) {
    localStorage.removeItem('history')
    history = []
  }
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('list-group-item')) {
    let historyValue = event.target.getAttribute('data-val')
    Display(historyValue)
  }
})

if (history.length > 0) {
  Display(history[history.length - 1].resultName)
}
