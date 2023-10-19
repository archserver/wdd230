let index = 0;
const images = document.querySelectorAll('.slideshow-images picture img');

function slideshow() {
    images[index].style.opacity = "0";
    index = (index + 1) % images.length;
    images[index].style.opacity = "1";
    setTimeout(slideshow, 10000);  // Change the image every 3 seconds
}

window.onload = slideshow;