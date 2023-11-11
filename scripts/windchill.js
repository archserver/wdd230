function calculateWindChill() {

    const windSpeed = parseFloat(document.getElementById('windspeed').textContent);
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    let windChill = "N/A";

    if (!isNaN(windSpeed) && !isNaN(temperature)) {
        
        if(windSpeed > 3 && temperature <= 50){
            windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
        }
    }
        document.getElementById('windchill').textContent = windChill === "N/A" ? windChill : windChill.toFixed(2) + " °F";
}

window.addEventListener('load', function() {
    setTimeout(calculateWindChill, 500);
});