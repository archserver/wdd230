const furl = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
/*const lat = '30.25';  removed because already declared in weather API
const lon = '-94.2';
const units = 'imperial'; */
const count = '24';
//const apiOWKey = '70dbe44674a5d4d0eb5386681d8baa09'; // already declarecd in weather API

const forecasturl = `${furl}${lat}&lon=${lon}&units=${units}&cnt=${count}&appid=${apiOWKey}`;

async function apiForecastFetch(){
    try{
        const response = await fetch(forecasturl);
        if(response.ok){
            const data = await response.json();
           // console.log(data);
            displayForcast(data);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
            console.error('Error:', error);
    }
}

function displayForcast(data) {
    const forecastList = document.querySelector('.forecast ul');
    forecastList.innerHTML = '';

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = `${date.toDateString()} ${date.getHours()}:00`;
        const hour = date.getHours();

        if (hour === 0 || hour === 12)
        {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${dateString}</strong>
                <p>Temperature: ${item.main.temp}°F</p>
                <p>${item.weather[0].main}: ${item.weather[0].description}</p>
                <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}" />`;

            forecastList.appendChild(listItem);
        }
    });
}

apiForecastFetch();

