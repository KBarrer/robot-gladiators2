var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

 
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
            
            // pick new enemy to fight based on the index enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            //reset enemyHealth before starting new fight
            enemyHealth = 50;
    
            // use debugger to pause script from running to check whats going at that moment of code
            // debugger;
    
            // pass the pickedEnemyName variable's value into the fight function
            fight(pickedEnemyName);
        } else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    endGame();
};

// funnction to end the entire game
var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great jon, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.")
    }

    // ask player if they would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing Rbot Gladiators! Come back soon!");
    }
}; 

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        // Alert players that they are starting the round
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
        //console.log(promptFight);

        if (promptFight === 'skip' || promptFight === 'SKIP') {
            var confirmSkip = window.confirm("Are you sure you'd like to quit");
        
            if (confirmSkip) {
                window.alert(playerName + ' has chosen to skip this fight. Goodbye!');
                playerMoney = playerMoney - 10;
                console.log('playerMoney', playerMoney);
                break;
            }
        }
            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack;
        
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            )
        
            if (enemyHealth <= 0) {
                window.alert(enemyName + ' has died!');
                playerMoney = playerMoney + 20;
                console.log(playerName + " now has " + playerMoney + " in the bank.");
                break;
            } else { 
                window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
            }
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            )
        
            if (playerHealth <= 0) {
                window.alert(playerName + ' has died!');
                break;
            } else {
                window.alert(playerName + ' still has ' + playerHealth + ' health left.');
            }
        }
    };

    startGame();