const colours = {
  fire: "red",
  water: "blue",
  grass: "green",
};

function adjustCardStyles(main, secondary) {
  let element = document.getElementById("image-of-pokemon");
  element.style.backgroundColor = colours[main];
}

export default adjustCardStyles;
