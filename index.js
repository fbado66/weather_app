window.addEventListener('load', ()=> {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector('.info');
  let temperatureDegree = document.querySelector('.degree');
  let temperatureHumidity = document.querySelector('.humidity');
  let temperatureWind = document.querySelector('.windSpeed');
  let locationTimezone = document.querySelector('.location_timezone')
  let extraSummary = document.querySelector('.summary')


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const promise = `${proxy}https://api.darksky.net/forecast/0b15019b5a7a13e7f6cd145593d3ab04/${longitude}, ${latitude}`;
    
      fetch(promise)
      .then(response =>{
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temperature, summary, humidity, windSpeed, icon } = data.currently
        //setting DOM elements from api = response
          temperatureDegree.textContent = temperature;
          temperatureHumidity.textContent = (humidity * 100);
          temperatureDescription.textContent = summary;
          temperatureWind.textContent = windSpeed;
          locationTimezone.textContent = data.timezone;
          extraSummary.textContent = data.daily.summary;
          //set icons 
          setIcons(icon, document.querySelector(".icon"));
  
          console.log(icon)

      });
    });
    
  }else{
    h1.textContent = 'hey this is not working properly';
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "black"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(currentIcon)
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);

  }
});