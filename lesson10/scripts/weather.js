const url = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const lat = '15.76';
const lon = '-86.79';
const units = 'imperial';
const apiKey = '70dbe44674a5d4d0eb5386681d8baa09';

const totalurl = `${url}${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
//console.log(totalurl);

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
            console.error('Error: ', error);
    }
}


function displayResults(results){
    const currentTemp = document.querySelector('#cTemp');
    const weatherIcon = document.querySelector('#wIcon');
    const cDisc = document.querySelector('figcaption')

    if (currentTemp){
       // let fehrenheit = (result.temp * 9 / 5) + 32;
       let fehrenheit = results.main.temp
        currentTemp.textContent = fehrenheit.toFixed(0)  + " °F";
    }
    if(weatherIcon){ 
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${results.weather[0].icon}.png`);
        weatherIcon.setAttribute('alt', `${results.weather[0].description}`);
    }
    if(cDisc){
        cDisc.textContent = `${results.weather[0].description}`;
    }
}
    

apiFetch();