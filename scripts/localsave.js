const numbofVisits = document.getElementById("visitcount");

if (numbofVisits){
	let numbVisits = Number(window.localStorage.getItem("numbVisits")) || 0;

	if (numbVisits !== 0) {
		numbofVisits.textContent = numbVisits;
	} else {
		numbofVisits.textContent = `First Visit!`;
	}

	numbVisits++;

	localStorage.setItem("numbVisits", numbVisits);
}

const lastVisitlocation = document.getElementById("lastvisit");

if (lastVisitlocation){
	const msToDays = 84600000;
	const todaysDate = Date.now();
	let lastVisit = Number(window.localStorage.getItem("lastVisit")) || 0;

	if (todaysDate - lastVisit < msToDays){
		lastVisitlocation.textContent = "Back so soon! Awesome! ";
	} else if (lastVisit !== 0) {
		const numbDays = math.ceil((todaysDate - lastVisit) / msToDays);
		lastVisitlocation.textContent = "You last visited " + numbDays + "days ago.";
	} else {
		lastVisitlocation.textContent = "Welcome! Let us know if you have any questions.";
	}
	
	localStorage.setItem("lastVisit", todaysDate);	
}