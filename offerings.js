
var list = document.querySelector(".offerings-list");
var cards = document.querySelectorAll(".offering-card");

// put every offering in an array of objects (name, price and its card)
var offerings = [];
for (var i = 0; i < cards.length; i++) {
  var name = cards[i].querySelector("h3").textContent;
  var priceText = cards[i].querySelector("p:last-child").textContent;   // "Price: 60 SAR"
  var price = parseInt(priceText.match(/\d+/)[0]);
  var country = cards[i].getAttribute("data-country");
  offerings.push({ name: name, price: price, country: country, card: cards[i] });
}

// show the offerings in the order of the array (only the chosen country)
function showOfferings() {
  var chosen = document.getElementById("country").value;
  for (var i = 0; i < offerings.length; i++) {
    list.appendChild(offerings[i].card);
    if (chosen === "" || offerings[i].country === chosen) {
      offerings[i].card.style.display = "";
    } else {
      offerings[i].card.style.display = "none";
    }
  }
}

// random order
function shuffleOfferings() {
  for (var i = offerings.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
  }
}

// sorting options
function sortOfferings(option) {
  if (option === "az") {
    offerings.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (option === "za") {
    offerings.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  } else if (option === "low-high") {
    offerings.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (option === "high-low") {
    offerings.sort(function (a, b) {
      return b.price - a.price;
    });
  }
}

// when the page opens
shuffleOfferings();
showOfferings();

// when the user chooses a sort option
document.getElementById("sort-offerings").onchange = function () {
  if (this.value !== "") {
    sortOfferings(this.value);
    showOfferings();
  }
};

// when the user chooses a country
document.getElementById("country").onchange = function () {
  showOfferings();
};