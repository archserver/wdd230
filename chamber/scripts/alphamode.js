const modeToggle = document.getElementById("toggleAlpha");
let isDarkMode = false;  // Track the current mode

modeToggle.addEventListener("click", () => {
    // If currently not in dark mode, darken the colors

    if (!isDarkMode) {
        adjustBrightness(-20); // Reduce brightness by 30%
        modeToggle.textContent = "Light"; // Change button text
    } else {
        adjustBrightness(25); // Increase brightness back to original
        modeToggle.textContent = "Dark"; // Change button text
    }
    isDarkMode = !isDarkMode; // Toggle the mode flag
});

function adjustBrightness(percentage) {
    const rootStyles = getComputedStyle(document.documentElement);
    
    // List of variables you want to adjust. Add more as needed
    let variablesToAdjust = [
        "--primary-color",
        "--secondary-color",
        "--accent1-color",
        "--accent2-color",
        "--headline-color-on-white",
        "--headline-color-on-color",
        "--paragraph-color-on-white",
        "--paragraph-color-on-color",
        "--paragraph-background-color",
        "--nav-link-color",
        "--nav-background-color",
        "--nav-hover-link-color",
        "--nav-hover-background-color"
    ];

    for (let variableName of variablesToAdjust) {
        let originalValue = rootStyles.getPropertyValue(variableName).trim();
        let adjustedColor = adjustColorBrightness(originalValue, percentage);
        document.documentElement.style.setProperty(variableName, adjustedColor);
    }
}

function adjustColorBrightness(color, percent) {
    let [r, g, b] = color.match(/\d+/g); // Extract RGB values from 'rgb()'
    r = Math.min(255, Math.max(0, parseInt(r * (1 + percent / 100))));
    g = Math.min(255, Math.max(0, parseInt(g * (1 + percent / 100))));
    b = Math.min(255, Math.max(0, parseInt(b * (1 + percent / 100))));
    return `rgb(${r},${g},${b})`;
}
