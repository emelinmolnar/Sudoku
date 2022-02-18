window.onload = startGame;
const sudoku1 = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
let tileClickedBoolean = false;
let numberChoiceClickedBoolean = false;
let bothClicked = false;

let globalTileSelected;
let globalNumberSelected;
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
function startGame() {
    createBoard();
    for(let i = 0; i < 81; i++) {
        document.getElementById("tile" + i).addEventListener("click", () => {
            tileClicked(i);});
    }
    for(let i = 0; i < 9; i++) {
        document.getElementById(numbers[i]).addEventListener("click", () => {
            numberChoiceClicked(numbers[i]);
        });
    }
}


function tileClicked(tileNumber) {
    tileClickedBoolean = true;
    globalTileSelected = tileNumber;
    let currentTile = document.getElementById("tile" + tileNumber);
    currentTile.classList.add("tileSelected");
    for(let i = 0; i < 80; i++) {
        let tile = document.getElementById("tile" + i);
        tile.classList.add("avoid-clicks");
    }
    if(numberChoiceClickedBoolean && tileClickedBoolean) {
        checkCorrectness();
    }
}

function numberChoiceClicked (numberChoiceClickedID) {
    numberChoiceClickedBoolean = true;
    let currentTile = document.getElementById(numberChoiceClickedID);
    currentTile.classList.add("numberChoiceSelected");
    switch(numberChoiceClickedID) {
        case numbers[0]:
            globalNumberSelected = "1";
            break;
        case numbers[1]:
            globalNumberSelected = "2";
            break;
        case numbers[2]:
            globalNumberSelected = "3";
            break;
        case numbers[3]:
            globalNumberSelected = "4";
            break;
        case numbers[4]:
            globalNumberSelected = "5";
            break;
        case numbers[5]:
            globalNumberSelected = "6";
            break;
        case numbers[6]:
            globalNumberSelected = "7";
            break;
        case numbers[7]:
            globalNumberSelected = "8";
            break;
        case numbers[8]:
            globalNumberSelected = "9";
            break;
        default:
            alert("error");
    }
    for(let i = 0; i < numbers.length; i++) {
        document.getElementById(numbers[i]).classList.add("avoid-clicks");
    }
    if(numberChoiceClickedBoolean && tileClickedBoolean) {
        checkCorrectness();
    }
}

function createBoard() {
    let board = document.getElementById("board");
    
    let newDiv;
    for(let i = 1; i <= 81; i++) {
        if(i % 9 == 1) {
            newDiv = document.createElement("div");
            newDiv.classList.add("rowDivs");
        }
        let p = document.createElement("p");
        let text = document.createTextNode(sudoku1[0].charAt(i - 1));
        if(sudoku1[0].charAt(i - 1) == "-") {
            text = document.createTextNode(" ");
        }
        
        p.appendChild(text);
        if(sudoku1[0].charAt(i - 1) != "-") {
            p.classList.add("avoid-clicks");
            p.classList.add("completed");
        }
        p.classList.add("tile");
        p.id = "tile" + (i - 1);
        if(i >= 1 && i <= 9) {
            p.classList.add("border-top");
        }
        if(i % 3 == 0) {
            p.classList.add("border-right");
        }
        if(i % 9 == 1) {
            p.classList.add("border-left");
        }
        if((19 <= i && i <= 27) || (46 <= i && i <=54) || (73 <= i && i <= 81)) {
            p.classList.add("border-bottom");
        }
        newDiv.appendChild(p);
        board.appendChild(newDiv);
    }
    
    
    
}

function deselectAllBoxes() {
    let element = document.querySelectorAll(".tile");
    for(let i = 0; i < element.length ; i++) {
        if (element[i].classList.contains("tileSelected")) {
            element[i].classList.remove("tileSelected");
        }
        
        if(!(element[i].classList.contains("tileDone")) && (element[i].textContent == " ")) {
            element[i].classList.remove("avoid-clicks");
        }
        
    }
    for(let i = 0; i < numbers.length; i++) {
        document.getElementById(numbers[i]).classList.remove("avoid-clicks");
        if(document.getElementById(numbers[i]).classList.contains("numberChoiceSelected")) {
            document.getElementById(numbers[i]).classList.remove("numberChoiceSelected");
        }
    }
}

function gameDone() {
    let elements = document.querySelectorAll(".tile");
    for(let i = 0; i < elements.length; i++) {
        if(!(elements[i].classList.contains("completed"))) {
            return false;
        }
    }
    return true;
}

function printGameIsDone() {
    let p = document.createElement("p");
    let textNode = document.createTextNode("Game is Done");
    let divToInsertInto = document.getElementById("gameDone");
    p.appendChild(textNode);
    p.id = "gameDoneP";
    divToInsertInto.appendChild(p);
    let button = document.createElement("button");
    button.innerHTML = "Start Over";
    button.type = "button";
    button.id = "startOverButton";
    button.onclick = function () {
        location.reload();
    }

    divToInsertInto.appendChild(button);
}
function wrongChoice(currentTile) {
    currentTile.classList.remove("wrongTile");
    currentTile.textContent = " ";
    currentTile.classList.remove("avoid-clicks");
}
function checkCorrectness() {
    let spotToCheck = sudoku1[1].charAt(globalTileSelected);
    let currentTile = document.getElementById("tile" + globalTileSelected);
    currentTile.textContent = globalNumberSelected;
    if(spotToCheck == globalNumberSelected) {
        currentTile.classList.add("tileDone");
        currentTile.classList.add("completed");
        //alert("True");
    }
    else {
        currentTile.classList.add("wrongTile");
        setTimeout(() => {
            wrongChoice(currentTile)
        }, 1000);
    }
    tileClickedBoolean = false;
    numberChoiceClickedBoolean = false;
    let gameIsDone = gameDone();
    if(gameIsDone) {
        printGameIsDone();
    }
    
    deselectAllBoxes();
}

