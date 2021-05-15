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

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
$(document).ready(function () {
  $("#delivery").click(function (event) {
    $("#correct-info").html("");
    event.preventDefault();var type = $("#pizza-type").val();
    var pizzaSize = $("#pizza-size").val();
    var pizzaDough = $("#pizza-dough").val();
    var pizzaSauce = $("#pizza-sauce").val();
    var pizzaQuantity = $("#pizza-quantity").val();
    var sum = 0;
    if(type=="---" || pizzaSize=="---" || pizzaDough=="---" || pizzaQuantity==0 || pizzaQuantity==""){  
      $("#correct-info").append("Invalid data");
      sleep(1000).then(() => {
        $("#correct-info").html("");
      });
      }
      else
      {
    $("#order").hide();
    $(".delivery-info").show();
      }
  });

  $("#pick").click(function (event) {
    
    $("#correct-info").html("");
    event.preventDefault();
    var type = $("#pizza-type").val();
    var pizzaSize = $("#pizza-size").val();
    var pizzaDough = $("#pizza-dough").val();
    var pizzaSauce = $("#pizza-sauce").val();
    var pizzaQuantity = $("#pizza-quantity").val();
    var sum = 0;
    
    if(type=="---" || pizzaSize=="---" || pizzaDough=="---" || pizzaQuantity==0 || pizzaQuantity==""){ 
    $("#correct-info").append("Invalid data");
    sleep(1000).then(() => {
      $("#correct-info").html("");
    });
    }
    else
    {
      axios.post('http://localhost:3000/create-order', {
        "delivery": "no",
        "pizzaType": type,
        "pizzaSize": pizzaSize,
        "pizzaDough": pizzaDough,
        "pizzaSauce": pizzaSauce,
        "amountOfPizzas": pizzaQuantity

      })
  .then(response => {
    sum= response.data.summ;
    $("#your-order").append("Pizza Type: " + type + "<br>");
    $("#your-order").append("Pizza Size: " + pizzaSize + "<br>");
    $("#your-order").append("Pizza Dough: " + pizzaDough + "<br>");
    $("#your-order").append("Pizza Sauce: " + pizzaSauce + "<br>");
    $("#your-order").append("Amount of Pizzas: " + pizzaQuantity + "<br>");
    $("#your-order").append("Total Cost: " + sum + " zł"+ "<br>");
  })
  .catch(error => {
    console.log(error);
  });
    $("#order").hide();
    $("#place-your-order").hide();
    $("#order-info").show();
    
    }  
  });
  
  $("#confirm").click(function (event) {
    $("#correct-info-delivery").html("");
    event.preventDefault();
    var sum = 0;
    var deliveryFee = 0;
    var name = $("#full-name").val();
    var number = $("#number").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var type = $("#pizza-type").val();
    var pizzaSize = $("#pizza-size").val();
    var pizzaDough = $("#pizza-dough").val();
    var pizzaSauce = $("#pizza-sauce").val();
    var pizzaQuantity = $("#pizza-quantity").val();
    if(name=="" || number=="" || street=="" || city==0){ 
      
      $("#correct-info-delivery").append("Invalid data");
      sleep(1000).then(() => {
        $("#correct-info-delivery").html("");
      });
      }
      else{
        axios.post('http://localhost:3000/create-order', {
        "delivery": "yes",
        "fullname": name,
        "telephoneNumber": number,
        "street": street,
        "city": city,
        "pizzaType": type,
        "pizzaSize": pizzaSize,
        "pizzaDough": pizzaDough,
        "pizzaSauce": pizzaSauce,
        "amountOfPizzas": pizzaQuantity

      })
  .then(response => {
    sum= response.data.summ;
    deliveryFee = response.data.deliveryFee;
    $("#your-order").append(
      name + " your order has been successfully placed <br>"
    );
    $("#your-order").append("Pizza Type: " + type + "<br>");
    $("#your-order").append("Pizza Size: " + pizzaSize + "<br>");
    $("#your-order").append("Pizza Dough: " + pizzaDough + "<br>");
    $("#your-order").append("Pizza Sauce: " + pizzaSauce + "<br>");
    $("#your-order").append("Amount of Pizzas: " + pizzaQuantity + "<br>");
    $("#your-order").append("Delivery fee: " + deliveryFee + "<br>");
    $("#your-order").append("Total Cost: " + sum + " zł"+"<br>");
  })
  .catch(error => {
    console.log(error);
  });
    $(".delivery-info").hide();
    $("#order-info").show();
    $("#place-your-order").hide();
      }
  });

  $("#order-again").click(function (event) {
    event.preventDefault();
    document.getElementById('pizza-type').value="---";
    document.getElementById('pizza-size').value="---";
    document.getElementById('pizza-dough').value="---";
    document.getElementById('pizza-sauce').value="---";
    document.getElementById('pizza-quantity').value="";
    $("#order-info").hide();
    $("#your-order").empty();
    
    $("#order").show();
    $("#place-your-order").show();
    
    
  });
});
