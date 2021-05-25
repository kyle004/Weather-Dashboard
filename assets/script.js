document.getElementById('weatherSearch').addEventListener('click', event => {
  event.preventDefault()
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('citySearch').value}&units=imperial&appid=68d634195147f679bc3416e5b0e9d434`)
    .then(res => {
      let weather = res.data
      console.log(weather)
      document.getElementById('cityLocation').innerHTML = `${weather.name}`
      document.getElementById('conditions').innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'>`
      document.getElementById('temp').innerHTML = `${weather.main.temp}`
      document.getElementById('hum').innerHTML = `${weather.main.humidity}`
      document.getElementById('wndSpd').innerHTML = `${weather.wind.speed}`
      // document.getElementById('uvInd').innerHTML = `${weather.name}`
      document.getElementById('date').innerHTML = Date()

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=hourly,daily&appid=68d634195147f679bc3416e5b0e9d434`)
        .then(res => {
          let weather = res.data.current
          console.log(res)
          document.getElementById('uvInd').innerHTML = `${weather.uvi}`
          if (weather.uvi >= 0 && weather.uvi < 3) {
            document.getElementById("uvInd").classList.add("bg-success")
          } else if (weather.uvi >= 3 && weather.uvi < 6) {
            document.getElementById("uvInd").classList.add("bg-warning")
          } else if (weather.uvi >= 6 && weather.uvi < 9) {
            document.getElementById("uvInd").classList.add("bg-danger")
          } else {
            document.getElementById("uvInd").classList.add("bg-dark")
          }
        })
        .catch(err => console.error(err))
    }
    )
})

// gets 5 day forecast
document.getElementById('weatherSearch').addEventListener('click', event => {
  event.preventDefault()
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('citySearch').value}&units=imperial&appid=68d634195147f679bc3416e5b0e9d434`)
    .then(res => {
      let weather = res.data.data
      console.log(res)
      for (let i = 5; i < citySearch.length; i++) {
        console.log()
      }
    })
  })