//Movement Animation to happen
const card4 = document.querySelector(".card_fourth");
const card3 = document.querySelector(".card_third");
const card2 = document.querySelector(".card_second");
const container = document.querySelector(".container");

//Moving Animation Event
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 5;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 5;
  card3.style.transform = `rotateY(${-xAxis}deg)`;
  card4.style.transform = `rotateY(${xAxis}deg)`;

});
//Animate In
container.addEventListener("mouseenter", (e) => {
  // card3.style.transition = "none";
  // card4.style.transition = "none";
  card3.style.transition = "all 1s ease";
card4.style.transition = "all 1s ease";
});
//Animate Out
  container.addEventListener("mouseleave", (e) => {
    card3.style.transition = "all 2s ease";
    card3.style.transform = `rotateY(0deg)`;
    card4.style.transition = "all 2s ease";
    card4.style.transform = `rotateY(0deg)`;
});