document.getElementById("vote-submit").onclick = function () {
    var country = document.getElementById("vote-country").value;

    if (country === "Select a Country" || country === "") {
        alert("Please select a country.");
    } else {
        alert("Thank you! Your vote for " + country + " has been submitted.");
    }
};

// Theme Switch
// Theme Switch - Light and Dark Mode
document.getElementById("theme-toggle").onclick = function () {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        document.getElementById("theme-toggle").textContent = "☀️";
        document.getElementById("theme-toggle").setAttribute("aria-label", "Switch to light theme");
    } else {
        document.getElementById("theme-toggle").textContent = "🌙";
        document.getElementById("theme-toggle").setAttribute("aria-label", "Switch to dark theme");
    }

};

// Back to Top Button
var backToTopButton = document.getElementById("back-to-top");

// Show the button when the user scrolls down
window.onscroll = function () {
    if (window.scrollY > 200) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll smoothly to the top when clicked
backToTopButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Phase 3 - Real-Time Clock

function updateClock() {
    var now = new Date();

    var currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    document.getElementById("live-clock").textContent = currentTime;
}

// Display the time immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);