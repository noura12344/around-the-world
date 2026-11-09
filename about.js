var teamForm = document.querySelector(".join-team-form");

teamForm.onsubmit = function () {
  var name = document.getElementById("team-name").value.trim();
  var email = document.getElementById("team-email").value.trim();
  var skills = document.getElementById("team-skills").value.trim();
  var photo = document.getElementById("team-photo").files[0];
  var dob = document.getElementById("team-dob").value;
  var expertise = document.getElementById("team-expertise").value.trim();
  var education = document.getElementById("team-education").value.trim();

  var problems = "";

  // no empty fields
  if (name === "" || email === "" || skills === "" || !photo ||
      dob === "" || expertise === "" || education === "") {
    problems += "Please complete all fields.\n";
  }

  // the name cannot start with a number
  if (name !== "" && /^\d/.test(name)) {
    problems += "The name cannot start with a number.\n";
  }

  // the photo must be an image
  if (photo && photo.type.indexOf("image/") !== 0) {
    problems += "Please upload an image file.\n";
  }

  // the year of birth must be 2008 or earlier
  if (dob !== "") {
    var year = parseInt(dob.split("-")[0]);
    if (year > 2008) {
      problems += "The year of birth must be 2008 or earlier.\n";
    }
  }

  if (problems !== "") {
    alert(problems);
    return false;
  }

  alert("Thank you, " + name + ". Your application has been submitted successfully.");
  teamForm.reset();
  return false;
};