
function getOfferings() {
  var saved = localStorage.getItem("managerOfferings");
  if (saved === null) {
    return [];               
  }
  return JSON.parse(saved); 
}

function saveOfferings(list) {
  localStorage.setItem("managerOfferings", JSON.stringify(list));
}


var addForm = document.getElementById("add-offering-form");

if (addForm) {
  addForm.onsubmit = function () {
    var name = document.getElementById("offering-name").value.trim();
    var country = document.getElementById("offering-country").value.trim();
    var price = document.getElementById("offering-price").value;
    var description = document.getElementById("offering-description").value.trim();
    var image = document.getElementById("offering-image").files[0];

    var problems = "";
        var missing = [];
        if (name === "") {
            missing.push("Offering Name");
        }
        if (country === "") {
            missing.push("Country");
        }
        if (price === "") {
            missing.push("Price");
        }
        if (description === "") {
            missing.push("Offering Description");
        }
        if (!image) {
            missing.push("Image");
        }
        if (missing.length > 0) {
            problems += "Please complete all fields. Missing: " + missing.join(", ") + ".\n";
               }

    if (name !== "" && /^\d/.test(name)) {
      problems += "The offering name cannot start with a number.\n";
    }

    if (country !== "" && /\d/.test(country)) {
      problems += "The country cannot contain numbers.\n";
    }

    if (price !== "" && (isNaN(price) || Number(price) < 0)) {
      problems += "The price must be a number (0 or more).\n";
    }

    if (image && image.type.indexOf("image/") !== 0) {
      problems += "Please upload an image file.\n";
    }

    if (problems !== "") {
      alert(problems);
      return false;
    }

    var offerings = getOfferings();
    offerings.push({
      name: name,
      country: country,
      price: Number(price),
      description: description,
      image: image.name
    });
    saveOfferings(offerings);

    alert(name + " has been added successfully.");
    addForm.reset(); 
    return false;
  };
}


var offeringsTable = document.querySelector(".offerings-table");

if (offeringsTable) {
  var savedOfferings = getOfferings();

  for (var i = 0; i < savedOfferings.length; i++) {
    var row = offeringsTable.insertRow(-1);
    row.insertCell(0).textContent = savedOfferings[i].name;
    row.insertCell(1).textContent = savedOfferings[i].country;
    row.insertCell(2).textContent = savedOfferings[i].price + " SAR";
  }
}