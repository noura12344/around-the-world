
const evaluationForm = document.getElementById("evaluation-form");
const completedOffering = document.getElementById("completed-offering");
const comments = document.getElementById("comments");

evaluationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Validate offering
    if (completedOffering.value === "") {
        alert("Please select an offering.");
        return;
    }

    // 2. Validate rating
    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    );

    if (!selectedRating) {
        alert("Please select a rating.");
        return;
    }

    // 3. Validate feedback
    if (comments.value.trim() === "") {
        alert("Please enter your feedback.");
        return;
    }

    // 4. Display rating response
    const rating = Number(selectedRating.value);

    if (rating >= 4) {
        alert("Thank you for your positive feedback!");
    } else {
        alert(
            "We're sorry your experience did not meet your expectations. " +
            "Thank you for your feedback."
        );
    }

    // 5. Return to Member Dashboard
    window.location.href = "member-dashboard.html";
});
