// Phase 3 - Shared Light and Dark Theme

// Restore the saved theme when a page loads
if (localStorage.getItem("websiteTheme") === "dark") {
    document.body.classList.add("dark-theme");
}

// Find the theme toggle button
var themeButton = document.getElementById("theme-toggle");

if (themeButton) {

    // Display the correct icon
    themeButton.textContent =
        document.body.classList.contains("dark-theme") ? "☀️" : "🌙";

    themeButton.setAttribute(
        "aria-label",
        document.body.classList.contains("dark-theme")
            ? "Switch to light theme"
            : "Switch to dark theme"
    );

    // Switch themes when clicked
    themeButton.onclick = function () {

        document.body.classList.toggle("dark-theme");

        var isDark = document.body.classList.contains("dark-theme");

        localStorage.setItem("websiteTheme", isDark ? "dark" : "light");

        themeButton.textContent = isDark ? "☀️" : "🌙";

        themeButton.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
    };
}