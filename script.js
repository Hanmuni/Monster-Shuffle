//
// Variables
//

const appContainer = document.querySelector("#app");
const replay = document.querySelector("#replay");
let clickedMonsters = 0;

// The monster details
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
    name: "bomb",
    alt: "An explosive bomb",
  },
];

//
// Functions
//

/**
 * Shuffle the array of monsters
 * @param  {Array} array [description]
 */
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
};

/**
 * Render the monsters into the UI
 */
const renderApp = () => {
  // Randomize the array of monsters
  shuffleMonsters(monsters);

  // Inject a grid of doors with monsters behind them
  appContainer.innerHTML = `
    <div class="row" aria-live="polite">
      ${monsters
        .map((monster, index) => {
          return `
            <div class="grid">
              <button
                id="door${index + 1}"
                data-monster="${monster.name}"
                data-image="door"
                aria-atomic="false"
              >
                <img
                  src="img/door.svg"
                  alt="A brown door"
                />
              </button>
            </div>`;
        })
        .join("")}
    </div>`;
};

/**
 * Handle opening the door
 * @param  {Event} event The Event object
 */
const handleDoorEvent = (event) => {
  // Get the opened door
  // (This accounts for events triggered on an image inside the button)
  const door = event.target.closest("[data-monster]");

  // Get the monster from the array
  const monsterName = door.getAttribute("data-monster");
  const monsterAlt = monsters.find(
    (monster) => monster.name === monsterName
  ).alt;

  // Create the monster
  const monsterImg = document.createElement("img");
  monsterImg.alt = monsterAlt;
  monsterImg.src = `./img/${monsterName}.svg`;

  // Show the monster in the UI
  door.replaceWith(monsterImg);

  // Check for Win
  checkforWin(monsterName);
};

const checkforWin = (monsterName) => {
  // Count the monster
  clickedMonsters++;

  // Check for loss
  if (monsterName === "bomb") {
    setTimeout(() => {
      appContainer.innerHTML = `
      <div class="loss-message">
        <button id="replay" class="replay-btn"> PLAY AGAIN </button>
      </div>`;
    }, 500);
  }
  // Check for Win
  if (clickedMonsters === monsters.length - 1) {
    setTimeout(() => {
      appContainer.innerHTML = `
      <div class="win-message">
        <button id="replay" class="replay-btn">PLAY AGAIN </button>
      </div>`;
    }, 500);
  }
};

//
// Initialize & Listen for Events
//

// Render the UI
renderApp();

// Listen for clicks in the app
appContainer.addEventListener("click", (event) => {
  // Check if the click is on a door button
  const doorButton = event.target.closest("[data-monster]");
  if (doorButton) {
    handleDoorEvent(event); // Handle opening the door
  }

  // Check if the click is on the replay button
  if (event.target.matches("#replay")) {
    renderApp(); // Restart the game
  }
});
