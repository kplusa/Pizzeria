AOS.init();

const menu = document.querySelector(".menu");


const navLeft = menu.getBoundingClientRect().left;




// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
const logo= document.getElementById("logodiv");
const logoHeight = logo.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
    logo.style.display="none";
  } else {
    navBar.classList.remove("fix-nav");
    logo.style.display="block";
  }
  
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - navHeight + logoHeight ;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    document.body.classList.remove("show");
  });
});


