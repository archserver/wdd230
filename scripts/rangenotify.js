const rangevalue = document.getElementById("ermsg");
const range = document.getElementById("pagerating");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.style.color = "#000"
    rangevalue.textContent = "You Ratedus with a: " + range.value;
    rangevalue.style.visibility = "visible";
    
}