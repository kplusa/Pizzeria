AOS.init();

const menu = document.querySelector(".menu");

const navLeft = menu.getBoundingClientRect().left;

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
const logo = document.getElementById("logodiv");
const logoHeight = logo.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
    logo.style.display = "none";
  } else {
    navBar.classList.remove("fix-nav");
    logo.style.display = "block";
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - navHeight + logoHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    document.body.classList.remove("show");
  });
});

// Wrap every letter in a span
var textWrapper = document.querySelector(".ml1 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml1 .letter",
    scale: [0.2, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i + 1),
  })
  .add({
    targets: ".ml1 .line",
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: "-=875",
    delay: (el, i, l) => 80 * (l - i),
  })
  .add({
    targets: ".ml1",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

$(document).ready(function () {
  $("#delivery").click(function (event) {
    event.preventDefault();
    $("#order").hide();
    $(".delivery-info").show();
  });

  $("#pick").click(function (event) {
    event.preventDefault();
    $("#order").hide();
    $("#place-your-order").hide();
    $("#order-info").show();
    var type = $("#pizza-type").val();
    var pizzaSize = $("#pizza-size").val();
    var pizzaDough = $("#pizza-dough").val();
    var pizzaSauce = $("#pizza-sauce").val();
    var pizzaQuantity = $("#pizza-quantity").val();
    var sum = 0;
    sum = countSum(type, pizzaSize, pizzaQuantity);
    $("#your-order").append("Pizza Type: " + type + "<br>");
    $("#your-order").append("Pizza Size: " + pizzaSize + "<br>");
    $("#your-order").append("Pizza Dough: " + pizzaDough + "<br>");
    $("#your-order").append("Pizza Sauce: " + pizzaSauce + "<br>");
    $("#your-order").append("Pizza Quantity: " + pizzaQuantity + "<br>");
    $("#your-order").append("Total Cost: " + sum + " zł"+ "<br>");
  });
  
  $("#confirm").click(function (event) {
    event.preventDefault();
    $(".delivery-info").hide();
    $("#order-info").show();
    $("#place-your-order").hide();
    var sum = 0;
    var name = $("#full-name").val();
    var type = $("#pizza-type").val();
    var pizzaSize = $("#pizza-size").val();
    var pizzaDough = $("#pizza-dough").val();
    var pizzaSauce = $("#pizza-sauce").val();
    var pizzaQuantity = $("#pizza-quantity").val();
    sum = countSum(type, pizzaSize, pizzaQuantity);
    $("#your-order").append(
      name + " your order has been successfully placed <br>"
    );
    $("#your-order").append("Pizza Type: " + type + "<br>");
    $("#your-order").append("Pizza Size: " + pizzaSize + "<br>");
    $("#your-order").append("Pizza Dough: " + pizzaDough + "<br>");
    $("#your-order").append("Pizza Sauce: " + pizzaSauce + "<br>");
    $("#your-order").append("Pizza Quantity: " + pizzaQuantity + "<br>");
    $("#your-order").append("Delivery fee: " + "5 ZŁ" + "<br>");
    $("#your-order").append("Total Cost: " + (sum + 5) + " zł"+"<br>");
  });

  $("#order-again").click(function (event) {
    event.preventDefault();
    $("#order-info").hide();
    $("#your-order").empty();
    $("#order").show();
    $("#place-your-order").show();
  });
});
function countSum(type, pizzaSize, pizzaQuantity) {
  var sum = 0;
  if (type == "Margherita") {
    if (pizzaSize == "Small") sum += 21;
    else if (pizzaSize == "Medium") sum += 26;
    else sum += 33;
  } else if (type == "Capriciosa") {
    if (pizzaSize == "Small") sum += 25;
    else if (pizzaSize == "Medium") sum += 32;
    else sum += 41;
  } else if (type == "Carbonara") {
    if (pizzaSize == "Small") sum += 27;
    else if (pizzaSize == "Medium") sum += 35;
    else sum += 45;
  } else if (type == "Greek Pizza") {
    if (pizzaSize == "Small") sum += 23;
    else if (pizzaSize == "Medium") sum += 27;
    else sum += 37;
  } else if (type == "Napolitan Pizaa") {
    if (pizzaSize == "Small") sum += 28;
    else if (pizzaSize == "Medium") sum += 36;
    else sum += 45;
  } else if (type == "Barbecue Habanero Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 50;
  } else if (type == "BBQ Party Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 50;
  } else if (type == "Parma Fit Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 53;
  } else {
    if (pizzaSize == "Small") sum += 34;
    else if (pizzaSize == "Medium") sum += 40;
    else sum += 47;
  }
  sum *= pizzaQuantity;
  return sum;
}