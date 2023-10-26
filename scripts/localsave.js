const numbofVisits = document.getElementById("visitcount");

let numbVisits = Number(window.localStorage.getItem("numbVisits")) || 0;

if (numbVisits !== 0) {
	numbofVisits.textContent = numbVisits;
} else {
	numbofVisits.textContent = `First Visit!`;
}

numbVisits++;

localStorage.setItem("numbVisits", numbVisits);

