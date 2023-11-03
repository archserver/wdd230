let testtemp = document.getElementById('temperature');


if (testtemp)
{
    const zip = '77657';
    const apiKey = '89Qb9sTIShikhKdVo2lwaw==Uk9rHkxSxpCdzRBa';

    function updateWeatherInfo(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.api-ninjas.com/v1/weather?zip=' + zip);
        xhr.setRequestHeader('X-Api-Key', apiKey);
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                let result = xhr.response;
                console.log(result);
                document.getElementById('location').textContent = zip;
                let fehrenheit = (result.temp * 9 / 5) + 32;
                document.getElementById('temperature').textContent = fehrenheit.toFixed(2)  + " °F";
                document.getElementById('windspeed').textContent = result.wind_speed;
                document.getElementById('winddirection').textContent = result.wind_degrees + "°";
            }
            else{
                console.error('Error: ', xhr.responseText);
            }
        };
        xhr.send();
    } 

updateWeatherInfo();
}