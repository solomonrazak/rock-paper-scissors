// function to hide and display game section
const mainButton = document.getElementById("start_button");
mainButton.addEventListener("click", function(event){
    this.remove();
    document.querySelector("main").classList.remove("hidden");
})

// select emoji buttons for either rock scissors or paper.
const selectionButtons = document.querySelectorAll("[data-selection]");

const finalColumn = document.querySelector("[data-final-column]")
const computerScoreSpan = document.querySelector("[data-computer-score]")
const yourScoreSpan = document.querySelector("[data-your-score]")

// an array of objects of the various possible selections and what they beat.
const SELECTIONS = [
    {
        name: "rock",
        emoji: "✊",
        beats: "scissors"
    },
    {
        name: "paper",
        emoji: "✋",
        beats: "rock"
    },
    {
        name: "scissors",
        emoji: "✌",
        beats: "paper"
    }
]



selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
         const selectionName = selectionButton.dataset.selection
         const selection = SELECTIONS.find(selection => selection.name === selectionName)
         makeSelection(selection)
    })
})

function makeSelection(selection){
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner)

    if(yourWinner) incrementScore(yourScoreSpan)
    if(computerWinner) incrementScore(computerScoreSpan)
}

// function to increment the score
function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

// rendering the result and the winner to the html page.
function addSelectionResult(selection, winner){
    const div = document.createElement("div")
    div.innerText = selection.emoji
    div.classList.add("result-selection")
    if(winner) div.classList.add("winner")
    finalColumn.after(div)

}

// function to determine the winner
function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name;

}

// computer to randomly selects

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex];
}