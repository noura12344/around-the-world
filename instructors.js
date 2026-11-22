
var instructors = [
  {
    name: "Fahad Abdullah",
    photo: "images/instructors/instructor-Fahad-Abdullah.jpg",
    dob: "1992-06-20",
    email: "fahad.inst@aroundtheworld.com",
    expertise: "Saudi Arabian Culture and Traditions",
    skills: "Saudi Heritage, Traditional Saudi Cuisine, Cultural Storytelling",
    education: "Bachelor's Degree in Cultural Heritage Studies"
  },
  {
    name: "Nouf Nasser",
    photo: "images/instructors/instructor-Nouf-Nasser.jpg",
    dob: "1996-09-08",
    email: "nouf.inst@aroundtheworld.com",
    expertise: "Italian Cuisine",
    skills: "Pasta Making, Italian Cooking",
    education: "Diploma in Culinary Arts"
  },
  {
    name: "Osama Faisal",
    photo: "images/instructors/instructor-Osama-Faisal.jpg",
    dob: "1995-03-12",
    email: "osama.inst@aroundtheworld.com",
    expertise: "Japanese Culture",
    skills: "Origami, Calligraphy",
    education: "BA Japanese Studies"
  },
  {
    name: "Sama Khalid",
    photo: "images/instructors/instructor-Sama-Khalid.jpg",
    dob: "1994-01-15",
    email: "sama.inst@aroundtheworld.com",
    expertise: "Spanish Language and Culture",
    skills: "Spanish Conversation, Grammar, Pronunciation",
    education: "BA Spanish Language and Literature"
  }
];

var instructorsTable = document.querySelector(".instructors-table");
var deleteForm = document.getElementById("delete-form");
var addForm = document.getElementById("add-instructor-form");

function showInstructors() {
  while (instructorsTable.rows.length > 1) {
    instructorsTable.deleteRow(1);
  }

  for (var i = 0; i < instructors.length; i++) {
    var row = instructorsTable.insertRow(-1);

    var img = document.createElement("img");
    img.src = instructors[i].photo;
    img.alt = instructors[i].name;
    img.width = 50;
    row.insertCell(0).appendChild(img);

    row.insertCell(1).textContent = instructors[i].name;
    row.insertCell(2).textContent = instructors[i].expertise;
    row.insertCell(3).textContent = instructors[i].email;

    var box = document.createElement("input");
    box.type = "checkbox";
    box.name = "delete";
    box.value = i;
    row.insertCell(4).appendChild(box);
  }
}

deleteForm.onsubmit = function () {
  var checked = instructorsTable.querySelectorAll("input[name='delete']:checked");

  if (checked.length === 0) {
    alert("Please select at least one instructor to delete.");
    return false;
  }

  if (!confirm("Are you sure you want to delete the selected instructor(s)?")) {
    return false;
  }

  var selected = [];
  for (var i = 0; i < checked.length; i++) {
    selected.push(Number(checked[i].value));
  }

  var remaining = [];
  for (var j = 0; j < instructors.length; j++) {
    if (selected.indexOf(j) === -1) {
      remaining.push(instructors[j]);
    }
  }
  instructors = remaining;

  showInstructors();  
  return false;
};

addForm.onsubmit = function () {
  var name = document.getElementById("instructor-name").value.trim();
  var photo = document.getElementById("instructor-photo").files[0];
  var dob = document.getElementById("instructor-dob").value;
  var email = document.getElementById("instructor-email").value.trim();
  var expertise = document.getElementById("instructor-expertise").value.trim();
  var skills = document.getElementById("instructor-skills").value.trim();
  var education = document.getElementById("instructor-education").value.trim();

  var problems = "";

    var missing = [];
    if (name === "") {
        missing.push("Name");
    }
    if (!photo) {
        missing.push("Photo");
    }
    if (dob === "") {
        missing.push("Date of Birth");
    }
    if (email === "") {
        missing.push("Email");
    }
    if (expertise === "") {
        missing.push("Area of Expertise");
    }
    if (skills === "") {
        missing.push("Skills");
    }
    if (education === "") {
        missing.push("Education");
    }
    if (missing.length > 0) {
        problems += "Please complete all fields. Missing: " + missing.join(", ") + ".\n";
    }

    if (name !== "" && !/^[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF\s.'-]*$/.test(name)) {
        problems += "The name must contain letters only.\n";
    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        problems += "Please enter a valid email address.\n";
    }

    if (photo && photo.type.indexOf("image/") !== 0) {
        problems += "Please upload an image file.\n";
    }

  if (dob !== "") {
    var date = new Date(dob);
    if (isNaN(date.getTime()) || date > new Date()) {
      problems += "Please enter a valid date of birth.\n";
    }
  }

  var textRule = /^[A-Za-z\u0600-\u06FF]/;
  if ((expertise !== "" && !textRule.test(expertise)) ||
      (skills !== "" && !textRule.test(skills)) ||
      (education !== "" && !textRule.test(education))) {
    problems += "Expertise, skills and education must start with a letter.\n";
  }

  if (problems !== "") {
    alert(problems);
    return false;
  }

  instructors.push({
    name: name,
    photo: URL.createObjectURL(photo),  
    dob: dob,
    email: email,
    expertise: expertise,
    skills: skills,
    education: education
  });

  showInstructors();
  alert(name + " has been added successfully.");
  addForm.reset();
  return false;
};

showInstructors();