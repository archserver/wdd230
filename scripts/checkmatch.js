const pw1 = document.getElementById('password');
const pw2 = document.getElementById('cpassword');
const notice = document.getElementById('ermsg')

pw2.addEventListener("focusout", checkEquality);

function checkEquality(){
    if (pw1.value !== pw2.value){
        notice.textContent = "Passwords do not Match!";    
		notice.style.color = "red"
		pw2.style.backgroundColor = "#fff0f3";
		pw2.value = "";
        notice.style.visibility = "visible";
		pw1.focus();
	} else {
		notice.style.visibility = "hidden";
		pw2.style.backgroundColor = "#fff";
		pw2.style.color = "#000";
	}
}