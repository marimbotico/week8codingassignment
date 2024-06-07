class Character { // defining the character's parent properties of the characters
  constructor(name, health, attackPower, defendAmount) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.defendAmount = defendAmount;
  }

  attack(target) { // this is a method that will subtract the attack power from the target's health
    alert(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);
    target.health -= this.attackPower;
    if (target.health < 0) target.health = 0;
  }
}

class Player extends Character {
  static players = [ // static array of preselected Players or Heroes. `Static` defines a property or method that belongs to the class itself, rather than to instances of the class.
    new Player('Harry Potter', 100, 15, 5),
    new Player('Aragorn', 120, 20, 10),
    new Player('Legolas', 110, 18, 8),
    new Player('Deadpool', 150, 25, 12)
  ];
  // Because 'player' is static, it is shared across all instances of the Player class and can be accessed without creating an instance of Player.

  constructor(name, health, attackPower, defendAmount) {
    super(name, health, attackPower, defendAmount); // super is used to call the constructor of the parent class (Character), *Inheritance
  }

  static getAllPlayers() { // this method returns the static `players` array
    return Player.players;
  }

  heal() {
    const healAmount = 10;
    this.health += healAmount; // adds the value of health amount to this.health in this case 10
    alert(`${this.name} heals for ${healAmount} points. Health is now ${this.health}.`);
  }

  defend() {
    const defendAmount = 5;
    this.health += defendAmount; // adds the value of defend amount to this.health in this case 5
    alert(`${this.name} defends and reduces damage by ${this.defendAmount} points.`);
  }

  static addPlayer(player) {
    if (player instanceof Player) {
      Player.players.push(player); // adds a new player at the end of the array
    } else {
      throw new Error(`You can only add an instance of Player. The argument is not a player: ${player}`);
    }
  }

  static deletePlayer(index) {
    if (index >= 0 && index < Player.players.length) {
      Player.players.splice(index, 1); // this asks for the index of which player you want to delete and deletes 1
    } else {
      alert("Invalid index");
    }
  }

  static displayPlayers() {
    let playerString = ''; // empty string to be able to add array of players
    for (let i = 0; i < Player.players.length; i++) {
      playerString += `${i + 1}) ${Player.players[i].name}\n`; // displays the array of players
    }
    alert(playerString);
  }
}

class Monster extends Character {
  static monsters = [ // predefined array of Monsters and properties
    new Monster('Goblin', 80, 10, 3),
    new Monster('Orc', 100, 15, 5),
    new Monster('Chupacabra', 90, 12, 4),
    new Monster('Werewolf', 120, 18, 8)
  ];

  constructor(name, health, attackPower, defendAmount) {
    super(name, health, attackPower, defendAmount);
  }

  static getAllMonsters() { // same method as getAllPlayers
    return Monster.monsters;
  }
}

class Game {
  constructor() {
    this.player = null;
    this.monster = null; // setting up to null to start the game. Makes the selection of players easier
  }

  start() {
    let selection = this.showMainMenuOptions(); // menu- options of methods or functions that you can choose from
    while (selection != '0') {
      switch (selection) {
        case '1':
          this.choosePlayer();
          break;
        case '2':
          this.addPlayer();
          break;
        case '3':
          this.deletePlayer();
          break;
        case '4':
          this.displayPlayers();
          break;
        default:
          alert("Invalid selection. Please try again.");
      }
      selection = this.showMainMenuOptions();
    }
    alert('Have a nice day!');
  }

  showMainMenuOptions() {
    return prompt(`
      0) Exit
      1) Choose existing Player
      2) Add new Player
      3) Delete a Player
      4) Display all Players
    `);
  }

  choosePlayer() {
    const playerNames = Player.getAllPlayers().map((player, index) => `${index + 1}) ${player.name}`).join('\n');
    /*Player.getAllPlayers - This method is called to get an array of all player objects. The map method is used to create a new array by applying a function to each element of the original array.
    Here, the function takes two arguments: player and index.
    The template literal constructs a string for each player in the format index) player.name, for example, 1) Harry Potter.*/
    let chosenIndex = parseInt(prompt(`Choose a player by number:\n${playerNames}`), 10) - 1;
    /*The parseInt function is used to convert the user's input from a string to an integer.
    The second argument, 10, specifies that the number is in base 10 (decimal).
    Since the indices displayed to the user start from 1 but the array indices start from 0, we subtract 1 from the user's input to get the correct zero-based index.
    For example, if the user enters 1, parseInt converts it to 1, and then subtracting 1 gives 0, which corresponds to the first element of the array.*/
    if (isNaN(chosenIndex) || chosenIndex < 0 || chosenIndex >= Player.getAllPlayers().length) {
      alert('Invalid player selection. Choosing the first player by default.');
      this.player = Player.getAllPlayers()[0];
    } else {
      this.player = Player.getAllPlayers()[chosenIndex];
    }
    this.chooseMonster();
    alert(`A wild ${this.monster.name} appears! What will you do?!`);
    this.gameLoop();
  }

  chooseMonster() {
    const monsterNames = Monster.getAllMonsters().map((monster, index) => `${index + 1}) ${monster.name}`).join('\n');
    let chosenIndex = parseInt(prompt(`Choose a monster by number:\n${monsterNames}`), 10) - 1; // parseInt(prompt(...), 10) - 1 converts the user's input to a zero-based index.
    // If the user inputs 2, parseInt('2', 10) gives 2, and subtracting 1 gives 1, which correctly selects Aragorn from the array.
    if (isNaN(chosenIndex) || chosenIndex < 0 || chosenIndex >= Monster.getAllMonsters().length) {
      alert('Invalid monster selection. Choosing the first monster by default.');
      this.monster = Monster.getAllMonsters()[0];
    } else {
      this.monster = Monster.getAllMonsters()[chosenIndex];
    }
  }

  addPlayer() {
    const name = prompt("Enter the name of the new player:");
    const health = parseInt(prompt("Enter the health of the new player:"), 10);
    const attackPower = parseInt(prompt("Enter the attack power of the new player:"), 10);
    const defendAmount = parseInt(prompt("Enter the defend amount of the new player:"), 10);

    if (isNaN(health) || isNaN(attackPower) || isNaN(defendAmount)) {
      alert("Invalid input. Please enter valid numbers for health, attack power, and defend amount.");
      return;
    }
    const newPlayer = new Player(name, health, attackPower, defendAmount); // since there are 5 properties each new entry needs to define all the properties of the new players
    Player.addPlayer(newPlayer);
  }

  deletePlayer() {
    Player.displayPlayers();
    let index = parseInt(prompt('Enter the index of the player that you wish to delete:'), 10) - 1;
    if (isNaN(index) || index < 0 || index >= Player.getAllPlayers().length) {
      alert("Invalid index");
    } else {
      Player.deletePlayer(index);
    }
  }

  displayPlayers() {
    Player.displayPlayers();
  }

  gameLoop() {
    while (this.player.health > 0 && this.monster.health > 0) {
      this.playerTurn();
      if (this.monster.health > 0) {
        this.monsterTurn(); // the monster's turn is automatic
      }
    }
    this.endGame();
  }

  playerTurn() {
    let action;
    do {
      action = prompt('Choose an action: 1) Attack 2) Defend 3) Heal');
      if (action == '1') {
        this.player.attack(this.monster);
        alert(`You have hurt the enemy! The monster's health: ${this.monster.health}`);
      } else if (action == '2') {
        this.player.defend();
      } else if (action == '3') {
        this.player.heal();
      } else {
        alert('Please make a valid selection');
      }
    } while (action != '1' && action != '2' && action != '3');
  } // do while loop to loop between the 3 actions that the player can choose from.

  monsterTurn() {
    this.monster.attack(this.player);
    alert(`Player's health: ${this.player.health}`);
  }

  endGame() {
    if (this.player.health > 0) {
      alert(`You have defeated the ${this.monster.name}!`);
    } else {
      alert(`You have been defeated by the ${this.monster.name}...`);
    }
  }
}

// To start the game
const game = new Game();
game.start();
