// Keep track of the arguments
let argumentsCount = 1;

// Add argument input field and dropdown
document.getElementById('addArgument').addEventListener('click', function (event) {
  event.preventDefault();

  const argumentsDiv = document.getElementById('arguments');

  // Create argument input field
  const newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('name', `argument${argumentsCount}`);
  newInput.setAttribute('placeholder', `Argument ${argumentsCount}`);
  argumentsDiv.appendChild(newInput);

  // Create argument dropdown
  const newDropdown = document.createElement('select');
  newDropdown.setAttribute('name', `value${argumentsCount}`);

  // Create options for true and false
  const trueOption = document.createElement('option');
  trueOption.setAttribute('value', 'true');
  trueOption.textContent = 'True';

  const falseOption = document.createElement('option');
  falseOption.setAttribute('value', 'false');
  falseOption.textContent = 'False';

  // Append options to the dropdown
  newDropdown.appendChild(trueOption);
  newDropdown.appendChild(falseOption);

  // Append dropdown beside the argument input field
  argumentsDiv.appendChild(newDropdown);

  argumentsCount++;
});

// Handle form submission
document.getElementById('logicForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const operation = document.getElementById('operation').value;
  const inputs = document.getElementsByTagName('input');
  const argumentDropdowns = document.getElementsByTagName('select');
  const arguments = [];
  const values = [];

  // Get argument values and dropdown selected values
  for (let i = 0; i < inputs.length; i++) {
    arguments.push(inputs[i].value);
    values.push(argumentDropdowns[i].value);
  }

  // Perform logical operation
  let result;

  switch (operation) {
    case 'const':
      result = values[0];
      break;
    case 'and':
      result = values.every(value => value === 'true');
      break;
    case 'or':
      result = values.some(value => value === 'true');
      break;
    default:
      // Custom argument operation
      if (operation.startsWith('arg')) {
        const index = parseInt(operation.slice(3));
        result = values[index - 1];
      } else {
        result = undefined;
      }
  }

  // Display the result
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Result: ${result}`;
});
