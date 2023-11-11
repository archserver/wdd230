const zip = '77657';
const apiNinjaKey = '89Qb9sTIShikhKdVo2lwaw==Uk9rHkxSxpCdzRBa';

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const lat = '30.25';
const lon = '-94.2';
const units = 'imperial';
const apiOWKey = '70dbe44674a5d4d0eb5386681d8baa09';

const totalurl = `${url}${lat}&lon=${lon}&units=${units}&appid=${apiOWKey}`;

function updateWeatherInfo(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.api-ninjas.com/v1/weather?zip=' + zip);
    xhr.setRequestHeader('X-Api-Key', apiNinjaKey);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = xhr.response;
            console.log(result);
            document.getElementById('location').textContent = zip;
            let fehrenheit = (result.temp * 9 / 5) + 32;
            document.getElementById('temperature').textContent = fehrenheit.toFixed(2)  + " °F";
            let fps =  result.wind_speed * 3.28084;
            document.getElementById('windspeed').textContent = fps.toFixed(1);
            document.getElementById('winddirection').textContent = result.wind_degrees + "°";
        }
        else{
            console.error('Error: ', xhr.responseText);
        }
    };
    xhr.send();
} 

async function apiFetch(){
    try{
        const response = await fetch(totalurl);
        if(response.ok){
            const data = await response.json();
            console.log(data);
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
    const location = document.querySelector('#loc2');
    const currentTemp = document.querySelector('#temp2');
    const windspeed = document.querySelector('#winds2');
    const winddirection = document.querySelector('#windd2');
    const weatherIcon = document.querySelector('#wIcon');
    const cDisc = document.querySelector('figcaption')

    if(location){
        location.textContent = results.name;
    }
    if (currentTemp){
        let fehrenheit = results.main.temp
       // let fehrenheit = (result.temp * 9 / 5) + 32;
        currentTemp.textContent = fehrenheit.toFixed(1)  + " °F";
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
    if(cDisc){
        cDisc.textContent = `${results.weather[0].description}`;
    }
}

updateWeatherInfo();

apiFetch();

