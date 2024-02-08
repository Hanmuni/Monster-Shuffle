const monsters = [
  {
    name: "monster1",
    alt: "A red monster who looks like a dinosaur",
  },
  {
    name: "monster2",
    alt: "A orange monster pumpkin with a scary visage",
  },
  {
    name: "monster3",
    alt: "A zombie girl with a violet sweater",
  },
  {
    name: "monster4",
    alt: "A green monster who looks like a snail",
  },
  {
    name: "monster5",
    alt: "A black monster who holds a laptop",
  },
  {
    name: "monster6",
    alt: "A green monster with three mouth tentacles",
  },
  {
    name: "monster7",
    alt: "A green monster with a robot head",
  },
  {
    name: "monster8",
    alt: "A green monster who is a meat eating plant",
  },
  {
    name: "monster9",
    alt: "A pink monster with headphones",
  },
  {
    name: "monster10",
    alt: "A green monster with big black eyes, two arms and four legs",
  },
  {
    name: "monster11",
    alt: "A violet monster with six tentacles",
  },
  {
    name: "monster12",
    alt: "A orange monster who looks like a dragon",
  },
];

const appContainer = document.querySelector("#app");

const shuffleMonsters = (array) => {
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

const generateMonsterHTML = (monster, index) => {
  return `
    <div class="grid">
      <button
        id="door${index + 1}"
        data-monster="${monster.name}"
        data-image="door"
        aria-label="Monster behind the door"
      >
        <img
          src="img/door.svg"
          alt="A brown door"
        />
      </button>
    </div>`;
};

const doors = document.querySelectorAll('[data-image="door"]');

for (const door of doors) {
  door.addEventListener("click", () => {
    console.log("Mouse clicked!");
    handleDoorEvent(door);
  });

  door.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      handleDoorEvent(door);
    }
  });
}

const handleDoorEvent = (door) => {
  const monsterName = door.getAttribute("data-monster");
  const monsterAlt = monsters.find(
    (monster) => monster.name === monsterName
  ).alt;
  const monsterImg = document.createElement("img");
  monsterImg.alt = monsterAlt;
  monsterImg.src = `img/${monsterName}.svg`;

  door.replaceWith(monsterImg);
};
