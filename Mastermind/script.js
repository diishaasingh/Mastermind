const colorOptions = document.querySelectorAll('.colors');
const playButtons = document.querySelectorAll('.choice');
const userGuesses = document.querySelectorAll('.user-guess');
const checkButton = document.querySelector('.subBtn');

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
const div = document.querySelectorAll('.ans');
for(let i=0;i<div.length;i++){
    const backgroundColor=colorArray[i];
    div[i].style.backgroundColor=backgroundColor;
    div[i].style.color=backgroundColor;
}

//taking color from user-guess
const selectedColors = [];

// Function to get bulls and cows
let result = [];
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
    return result;
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


// //displaying bull cow in the one designated
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
        window.alert("Oh!! You failed to guess the color.Better luck next time!!");
        return;
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

checkButton.addEventListener('click', checkGuesses);

// Saving data in local storage
function saveDataInLocalStorage() {
    localStorage.setItem("selectedColors", JSON.stringify(selectedColors));
    localStorage.setItem("result", JSON.stringify(result));
}

// Loading data from local storage
function loadDataFromLocalStorage() {
    const selectedColorsData = localStorage.getItem("selectedColors");
    const resultData = localStorage.getItem("result");

    if (selectedColorsData) {
        selectedColors = JSON.parse(selectedColorsData);
    }
    if (resultData) {
        result = JSON.parse(resultData);
    }
}

// Adding event listener to the "Check" button to save data before checking
checkButton.addEventListener('click',saveDataInLocalStorage);


// Adding an event listener to the window to load data when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocalStorage();
});