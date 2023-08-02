const colorOptions = document.querySelectorAll('.colors');
const playButtons = document.querySelectorAll('.choice');
const checkButton = document.querySelector('.subBtn');
const restartButton = document.querySelector('.playAgain');
const userGuesses = document.querySelectorAll('.user-guess');
const hintPalette = document.querySelectorAll('.hint-palette');

const colorObject={"red":1,"blue":2,"green":3,"yellow":4,"pink":5,"white":6,"purple":7,"orange":8};

//generate random 4 digit number where duplicates are not allowed
function generateUniqueCode() {
    const digits = new Set(); //set stores 
    const random = Math.floor(Math.random() * 8) + 1;
    let number;
  
    while (digits.size < 4) {
      number = Math.floor(Math.random() * 8) + 1;
      digits.add(number);
    }
  
    const array = Array.from(digits);
    return array;
  }
  

//mapping numbers to colors
function mapNumberToColor(numberArray) {
    const colorArray = numberArray.map(num => {
      for (const key in colorObject) {
        if (colorObject[key] === num) {
          return key;
        }
      }
    });
    return colorArray;
  }

const computerNumber = generateUniqueCode();
const colorArray = mapNumberToColor(computerNumber);  //computer generated

//displaying the random color
function displayRandomColor(){
    const div = document.querySelectorAll('.ans');
    for(let i=0;i<div.length;i++){
        const backgroundColor=colorArray[i];
        div[i].style.backgroundColor=backgroundColor;
        div[i].style.color=backgroundColor;
    }
}


//restart game
function restartGame(){
   window.location.reload();
   saveUserNameToLocalStorage();
}
restartButton.addEventListener('click',restartGame);


//taking color from user-guess
const selectedColors = [];

// Function to get bulls and cows
let result = [];
let score;
function getBullsAndCows(userGuess, computerNumber) {
  //creating the hint object
  const hint = {
    bull: "red",
    cow: "white"
  };

  const bullsAndCows = { bulls: 0, cows: 0 }; //another object to count bulls and cows

  for (let i = 0; i < 4; i++) {
    if (computerNumber[i] === userGuess[i]) {
      bullsAndCows.bulls++;
    } else {
      for (let j = 0; j < 4; j++) {
        if (computerNumber[i] === userGuess[j]) {
          bullsAndCows.cows++;
          break;
        }
      }
    }
  }
  for (let i = 0; i < bullsAndCows.bulls; i++) {
    result.push(hint.bull); // Push red color for each bull
  }
  for (let i = 0; i < bullsAndCows.cows; i++) {
    result.push(hint.cow); // Push white color for each cow
  }
  
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (result[i] === "red") {
        count++;
    }
    if (count === 4) {
        saveScoreToLocalStorage();
        // const savedUsername = localStorage.getItem('username');
        score = 1;
        const username = savedUsername ? ` ${savedUsername}` : '';
        // window.alert(`Congratulations${username}!!! You won.`);
        displayRandomColor();
        result = [];
        break;
    }else{
        score = 0;
    }
    // saveScoreToLocalStorage(score);
  }
}

//Shuffle array function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
 }

// drag and drop feature
colorOptions.forEach(option => {
    option.addEventListener('dragstart', handleDragStart);
});

playButtons.forEach(button => {
    button.addEventListener('dragover', handleDragOver);
    button.addEventListener('drop', handleDrop);
});

// Handle drag start event
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

// Handle drag over event
function handleDragOver(event) {
    event.preventDefault();
}


// Handle drop event
function handleDrop(event) {
  const color = event.dataTransfer.getData('text/plain');
  const button = event.target;
  button.style.backgroundColor = color;
  button.style.color = color;
}


//displaying bull cow in the one designated
let num = 1;
function checkGuesses() {
    let currentRoundID = `guess${num}`;
    let currentRoundDiv = document.getElementById(currentRoundID);
  
    if (!currentRoundDiv) {
      console.log("Game over.");
      return;
    }
  
    const buttons = currentRoundDiv.querySelectorAll('.user-guess button');
    buttons.forEach(button => {
      let color = button.style.backgroundColor;
      selectedColors.push(color);
    });
    result.length=0;
    getBullsAndCows(selectedColors,colorArray);
    addHints(shuffleArray(result),num);
    num++;
    if(num==11){
        window.alert(`Oh!! You failed to guess the color.Better luck next time!!The correct color combination was (${colorArray.join(', ')}).`);
        // displayPlayerName();
        displayRandomColor();
        //window.location.reload();
        //return;
    }
    selectedColors.length = 0;
    currentRoundID = `guess${num}`;
    currentRoundDiv = document.getElementById(currentRoundID);
    console.log(currentRoundDiv);
    currentRoundDiv.classList.remove("disabled");
}


function addHints(result, num) {
    const currentRoundID = `hint${num}`;
    const currentRoundDiv = document.getElementById(currentRoundID);

  if (!currentRoundDiv) {
    console.log("Game over or round not found.");
    return;
  }

  const hintDivs = currentRoundDiv.querySelectorAll('.hint-inner');

  for (let i = 0; i < result.length; i++) {
    const hintType = result[i];

    if (i < hintDivs.length) {
      hintDivs[i].classList.add(hintType);
    }
  }

}


function showHintPalette(btn) {
    const hintPalette = btn.parentElement.querySelector('.hint-palette');
    hintPalette.style.display = 'block';
    btn.style.display = 'none'; 
    checkGuesses();
}
  
// Event listener for the all Check button
const Check1 = document.querySelector('.check1');
Check1.addEventListener('click', function() {
    showHintPalette(Check1);
});

const Check2 = document.querySelector('.check2');
Check2.addEventListener('click', function() {
    showHintPalette(Check2);
});

const Check3 = document.querySelector('.check3');
Check3.addEventListener('click', function() {
    showHintPalette(Check3);
});

const Check4 = document.querySelector('.check4');
Check4.addEventListener('click', function() {
    showHintPalette(Check4);
});

const Check5 = document.querySelector('.check5');
Check5.addEventListener('click', function() {
    showHintPalette(Check5);
});

const Check6 = document.querySelector('.check6');
Check6.addEventListener('click', function() {
    showHintPalette(Check6);
});

const Check7 = document.querySelector('.check7');
Check7.addEventListener('click', function() {
    showHintPalette(Check7);
});

const Check8 = document.querySelector('.check8');
Check8.addEventListener('click', function() {
    showHintPalette(Check8);
});

const Check9 = document.querySelector('.check9');
Check9.addEventListener('click', function() {
    showHintPalette(Check9);
});

const Check10 = document.querySelector('.check10');
Check10.addEventListener('click', function() {
    saveScoreToLocalStorage();
    showHintPalette(Check10);
});




// PLAYING WITH LOCAL STORAGE

var arr = [];
if (localStorage.getItem("userData")) {
  arr = JSON.parse(localStorage.getItem("userData"));
}

// Add user name to local storage
function saveUserNameToLocalStorage() {
  const playerName = prompt('Please enter your name:');
  if (playerName) {
    const obj = { name: playerName };
    arr.push(obj);
    localStorage.setItem("userData", JSON.stringify(arr));
    alert(`Thanks "${playerName}" for providing your Name`);
  } else {
    alert('No username found');
  }
}

// Add score to local storage
function saveScoreToLocalStorage() {
  const scoreObj = { score: score };
  arr.push(scoreObj);
  localStorage.setItem("userData", JSON.stringify(arr));
}

// Add username and score to DOM
var div = document.getElementById('PlayerNameDisplay');
function displayDataToDom() {
    let tableHTML = `
        <h1>Leader Board</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
    `;
    
    for (let i = 0; i < arr.length; i += 2) {
        const name = arr[i].name;
        const score = (i + 1 < arr.length) ? arr[i + 1].score : 0;
        
        tableHTML += `
            <tr>
                <td id="name${i}">${name}</td>
                <td id="score${i}">${score}</td>
            </tr>
        `;
    }

    tableHTML += `</table>`;
    div.innerHTML = tableHTML;
}




const checkScoreButton = document.querySelector('.checkScore');
checkScoreButton.addEventListener('click', displayDataToDom);

//display in another page
const main = document.querySelector('.main');
const board = document.getElementById('PlayerNameDisplay');
const back = document.querySelector('.back');
back.style.display = "none";

checkScoreButton.addEventListener('click', function() {
    main.style.display = "none";
    board.style.display = "block";
    back.style.display = "block";
});

back.addEventListener('click', function() {
    window.location.reload();
    back.style.display = "none";
});