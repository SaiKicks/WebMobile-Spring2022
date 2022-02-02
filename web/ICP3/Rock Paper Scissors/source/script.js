function playGame(humanValue) {
    botValue = random()
    humanWeapon = valueToWeapon(humanValue)
    botWeapon = valueToWeapon(botValue)

    document.getElementById("match").innerHTML = "<span id='weapon1'>" + humanWeapon + " </span> " + botWeapon
    document.getElementById("result").innerHTML = fightResult(humanValue, botValue)
}

function random() {
    return Math.floor(Math.random() * 3);
}

function valueToWeapon(value) {
    if(value === 0) {
        return "Rock"
    }else if(value == 1) {
        return "Paper"
    }else {
        return "Scissors"
    }
}

function fightResult(human, bot) {
    msg = ""
    if(human === bot) {
        msg = "Tie! Tough fight try again :)"
    }else if((human+1)%3 === bot) {
        msg = "You lost! Better luck next time :("
    }else {
        msg = "You won! Nice :)"
    }
    return msg
}