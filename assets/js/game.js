 var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
            
            // pick new enemy to fight based on the index enemy.names array
            var pickedEnemyObj = enemyInfo[i];
    
            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // use debugger to pause script from running to check whats going at that moment of code
            // debugger;
    
            // pass the pickedenemy.name variable's value into the fight function
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array and player health is above zero
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

                // if yes, take them to the store() 
                if (storeConfirm) {
                    shop();
                }
                
            }

        } else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    endGame();
};

// funnction to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing Robot Gladiators! Come back soon!");
    }
}; 

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop()  again to force player to pick a valid option
            shop();
            break;
    }
};

var fightOrSkip = function() {
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    //console.log(promptFight);

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    if (promptFight === 'skip') {
        var confirmSkip = window.confirm("Are you sure you'd like to quit");
    
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has chosen to skip this fight. Goodbye!');
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    console.log(enemy);

    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while(playerInfo.health > 0 && enemy.health > 0) {
        // Alert players that they are starting the round
       if (isPlayerTurn) {
            if (fightOrSkip()) {
            break;
            }
        
            //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
        
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');
                playerInfo.money = playerInfo.money + 20;
                console.log(playerInfo.name + " now has " + playerInfo.money + " in the bank.");
                break;
            } else { 
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }
        } else {
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
            playerInfo.health = Math.max(0, playerInfo.health - damage); 
        // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
        
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                break;
            } else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }    
            
        isPlayerTurn = !isPlayerTurn;
        
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

var getPlayername = function() {
    var name = window.prompt("What is your robot't name?");
    while (name === "" || name === null) {
        name = prompt("What is your robots name?")
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayername(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars!");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

    startGame();