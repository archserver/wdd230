const year_option = {year: 'numeric'};
document.getElementById('currentYear').textContent = "\u00A9" + new Date().toLocaleDateString('en-US',year_option);

document.getElementById('lastModified').textContent = document.lastModified;

const loaddate = document.getElementById('loadtime');
if (loaddate){
    window.onload = function(){
        let currentDate = new Date();
        let currentTime = currentDate.toISOString();
        document.getElementById('loadtime').value = currentTime;
    }
}