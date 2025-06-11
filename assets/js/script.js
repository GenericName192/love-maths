// wait for Dom to finish loading before running the game
// get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  document
    .getElementById("answer-box")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  // kick off the first game when the script is loaded
  runGame("addition");
});

/**
 * The main game "loop" called when the script is loaded.
 * and after the user's answer has been processed.
 */
function runGame(gameType) {
  // clear the answer box
  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();

  let num1 = Math.ceil(Math.random() * 25);
  let num2 = Math.ceil(Math.random() * 25);

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * checks the answer against the first element in the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Correct! :)");
    incrementScore();
  } else {
    alert(`Incorrect! :( The correct answer was ${calculatedAnswer[0]}`);
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]); // restart the game with the same type
}

/**
 * gets the numbers from the dom and then works out the correct answer to the current question
 * and returns it.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  switch (operator) {
    case "+":
      return [operand1 + operand2, "addition"];
    case "-":
      return [operand1 - operand2, "subtract"];
    case "x":
      return [operand1 * operand2, "multiply"];
    case "/":
      return [operand1 / operand2, "division"];
    default:
      alert(`Unknown operator: ${operator}`);
      throw `Unknown operator: ${operator}. Aborting!`;
  }
}

/**
 * gets the current score from the DOM and increments it by 1
 * updates the DOM with the new score.
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * gets the current number of wrong answers from the DOM and increments it by 1
 * updates the DOM with the new wrong answers.
 */
function incrementWrongAnswer() {
  let oldWrongAnswer = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldWrongAnswer;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 * operand2 : operand2 * operand1;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "/";
}
