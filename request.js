
const requestForm = document.getElementById("request-form");
const offering = document.getElementById("offering");
const fullName = document.getElementById("full-name");
const preferredDate = document.getElementById("preferred-date");
const submittedRequests = document.getElementById("submitted-requests");

requestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const selectedOffering = offering.value;
    const name = fullName.value.trim();
    const date = preferredDate.value;

    // 1. Validate offering
    if (selectedOffering === "") {
        alert("Please select an offering.");
        return;
    }

    // 2. Validate full name
    const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;

    if (!namePattern.test(name)) {
        alert("Please enter a valid first and last name.");
        return;
    }

    // 3. Validate future date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date || new Date(date + "T00:00:00") <= today) {
        alert("Please select a future date.");
        return;
    }

    // 4. Confirmation message
    const stay = confirm(
        "Your request has been sent successfully.\n" +
        "Press OK to stay on this page and add another request.\n" +
        "Press Cancel to return to the Member Dashboard."
    );

    if (stay) {
        // 5. Display submitted request
        const request = document.createElement("div");
        request.className = "submitted-request";

        const title = document.createElement("h3");
        title.textContent = "Submitted Request";

        const offeringText = document.createElement("p");
        offeringText.textContent =
            "Offering: " + offering.options[offering.selectedIndex].text;

        const nameText = document.createElement("p");
        nameText.textContent = "Member Name: " + name;

        const dateText = document.createElement("p");
        dateText.textContent = "Preferred Date: " + date;

        request.append(title, offeringText, nameText, dateText);
        submittedRequests.appendChild(request);

        // Clear form for another request
        requestForm.reset();

    } else {
        // 6. Return to Member Dashboard
        window.location.href = "member-dashboard.html";
    }
});
