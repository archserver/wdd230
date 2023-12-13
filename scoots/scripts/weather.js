const url = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const lat = '20.51';
const lon = '-86.96';
const units = 'imperial';
const apiOWKey = '70dbe44674a5d4d0eb5386681d8baa09';

const totalurl = `${url}${lat}&lon=${lon}&units=${units}&appid=${apiOWKey}`;

async function apiFetch(){
    try{
        const response = await fetch(totalurl);
        if(response.ok){
            const data = await response.json();
            //console.log(data);
            displayResults(data);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
            console.error('Error:', error);
    }
}

function displayResults(results){
    const location = document.querySelector('#location');
    const currentTemp = document.querySelector('#temperature');
    const highTemp = document.querySelector('#hightemp');
    const humidity = document.querySelector('#humidity');
    const windspeed = document.querySelector('#windspeed');
    const winddirection = document.querySelector('#winddirection');
    const weatherIcon = document.querySelector('#wIcon');
    const weatherList = document.querySelector('#weatherList');
    const cDisc = document.querySelector('figcaption')

    if(location){
        location.textContent = results.name;
    }
    if (currentTemp){
        let fehrenheit = results.main.temp
       // let fehrenheit = (result.temp * 9 / 5) + 32;
        currentTemp.textContent = fehrenheit.toFixed(1)  + " °F";
    }
    if(highTemp){
        highTemp.textContent = "High Tempature for the day will be: " + results.main.temp_max;
    }
    if (humidity){
        humidity.textContent = results.main.humidity;
    }
    if (windspeed){
        windspeed.textContent = results.wind.speed + " fps";
     }
     if (winddirection){
        winddirection.textContent = results.wind.deg + "°";
     }
    if(weatherIcon){ 
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${results.weather[0].icon}.png`);
        weatherIcon.setAttribute('alt', `${results.weather[0].description}`);
    }
    if(weatherList){
        weatherList.innerHTML='';
        results.weather.forEach(item => {
            const wicon = `https://openweathermap.org/img/w/${item.icon}.png`
            const wdesc = item.description
            const listItem = document.createElement('li');
            listItem.innerHTML = `<p> ${wdesc} </p>
              <img src="${wicon}" alt="${wdesc}" />`;

            weatherList.appendChild(listItem);
        });
    }
    if(cDisc){
        cDisc.textContent = `${results.weather[0].description}`;
    }
}

apiFetch();

