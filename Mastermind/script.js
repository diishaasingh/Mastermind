const colorOptions = document.querySelectorAll('.colors');
const playButtons = document.querySelectorAll('.choice');
const userGuesses = document.querySelectorAll('.user-guess');

const colorObject={
    "red":1,
    "blue":2,
    "green":3,
    "yellow":4,
    "pink":5,
    "white":6,
    "purple":7,
    "orange":8
};


const userGuess =[];

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
const colorArray=mapNumberToColor(computerNumber);

//displaying the random color

const div = document.querySelectorAll('.ans');
for(let i=0;i<div.length;i++){
    const backgroundColor=colorArray[i];
    div[i].style.backgroundColor=backgroundColor;
    div[i].style.color=backgroundColor;
}

//taking color from user-guess
const selectedColors = [];

// Event listeners for play buttons (choice-1 A, choice-1 B, etc.)
playButtons.forEach((button, index) => {
  button.addEventListener('dragover', handleDragOver);
  button.addEventListener('drop', (event) => {
    handleDrop(event, index);
  });
});


// Function to get bulls and cows
function getBullsAndCows(userGuess, computerNumber) {
    //creating the hint object
    const hint = {
      bull: "red",
      cow: "white"
    };
  
    const result = [];
  
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

// playButtons.forEach(button =>{
//     button.addEventListener('dblclick',removeColour)
// })

 // Handle drag start event

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

// Handle drag over event

function handleDragOver(event) {
    event.preventDefault();
}

// Handle drop event

function handleDrop(event, index) {
    const color = event.dataTransfer.getData('text/plain');
    const button = event.target;
    button.style.backgroundColor = color;
    button.style.color = color;
    selectedColors[index] = color;
    console.log(selectedColors); 
}


// function removeColour(event) {
//    const button = event.target;
//    button.style.backgroundColor = '';
// }

//end of drag and drop

