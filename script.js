// 1. Get DOM elements
const amountInput = document.getElementById('amount'); // Selects the amount input field
const fromCurrency = document.getElementById('fromCurrency'); // Selects the "from" currency dropdown
const toCurrency = document.getElementById('toCurrency'); // Selects the "to" currency dropdown
const resultDisplay = document.getElementById('result'); // Selects the div for the result

// 2. API setup (using ExchangeRate-API - get your free key at exchangerate-api.com)
const apiKey = '8635f726e558c79a68f9f78c'; // Replace with your actual API key from ExchangeRate-API
const apiBaseUrl = 'https://v6.exchangerate-api.com/v6'; // Base URL for the API

// 3. Function to fetch exchange rates and convert
async function convertCurrency() { // Defines an async function to handle conversion
  const amount = Number(amountInput.value); // Converts the input amount to a number
  const from = fromCurrency.value; // Gets the selected "from" currency code
  const to = toCurrency.value; // Gets the selected "to" currency code
  
  if (isNaN(amount) || amount <= 0) { // Validates that the amount is a positive number
    resultDisplay.textContent = 'Please enter a valid amount!'; // Shows error if invalid
    return; // Exits the function
  }
  
  try { // Starts a try block to handle potential API errors
    const response = await fetch(`${apiBaseUrl}/${apiKey}/latest/${from}`); // Fetches exchange rates for the "from" currency
    if (!response.ok) { // Checks if the API request failed
      throw new Error('Failed to fetch exchange rates'); // Throws an error if response isn’t OK
    }
    const data = await response.json(); // Parses the JSON response from the API
    const rate = data.conversion_rates[to]; // Gets the exchange rate for the "to" currency
    
    if (!rate) { // Checks if the rate exists for the "to" currency
      throw new Error('Currency not supported'); // Throws an error if rate is missing
    }
    
    const convertedAmount = (amount * rate).toFixed(2); // Calculates the converted amount, rounded to 2 decimals
    resultDisplay.textContent = `${amount} ${from} = ${convertedAmount} ${to}`; // Displays the conversion result
  } catch (error) { // Catches any errors from the try block
    resultDisplay.textContent = error.message || 'Something went wrong!'; // Shows the error message
  }
  
  amountInput.value = ''; // Clears the input field after conversion
}

// 4. Event listener for Enter key on amount input
amountInput.addEventListener('keypress', (event) => { // Listens for keypress events on the amount input
  if (event.key === 'Enter') { // Checks if the pressed key is Enter
    convertCurrency(); // Calls convertCurrency if Enter is pressed
  }
});