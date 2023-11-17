const bannerClose = document.querySelector(".banner_close");

if (bannerClose)
{
    const currentDay = new Date().getDay()

    if(currentDay >= 4 || currentDay === 0)
    {
        closeBanner();
    }
    else
    {
        bannerClose.addEventListener("click", closeBanner);
    }
}

function closeBanner(){
     bannerClose.closest(".banner").style.display = "none";
}