let monsters = [
  {
    name: "monster1",
  },
  {
    name: "monster2",
  },
  {
    name: "monster3",
  },
  {
    name: "monster4",
  },
  {
    name: "monster5",
  },
  {
    name: "monster6",
  },
  {
    name: "monster7",
  },
  {
    name: "monster8",
  },
  {
    name: "monster9",
  },
  {
    name: "monster10",
  },
  {
    name: "monster11",
  },
  {
    name: "monster12",
  },
];

const app = document.querySelector("#app");

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

shuffle(monsters);

app.innerHTML = `<div class="row">
		${monsters
      .map((monster) => {
        return `
				<div class="grid">
					<img alt="${monster.alt}" src="img/${monster.name}.svg">
				</div>`;
      })
      .join("")}
	</div>`;
