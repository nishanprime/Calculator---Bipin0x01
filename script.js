let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetOnNextInput = false; // Flag to track if we should clear after result
let calculationHistory = []; // Store calculation history
let historyVisible = false; // Track history visibility

const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');
const historyDisplay = document.getElementById('history');

// Get all buttons
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const resultButton = document.querySelector('.result-btn');
const clearButton = document.querySelector('.clear-btn');
const backspaceButton = document.querySelector('.backspace-btn');
const decimalButton = document.querySelector('.decimal-btn');
const historyToggleButton = document.getElementById('historyToggle');
const closeButton = document.querySelector('.close');
const closeCenterButton = document.querySelector('.close-center');
const minimizeButton = document.querySelector('.minimize');

// Number button click handlers
//add a listener to each digit button.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        //gets the visible digit (could contain whitespace).
        const number = button.textContent;
        
        // If we just got a result, clear everything and start fresh
        //after an equals, clear inputs so typing starts a new number.
        if (shouldResetOnNextInput) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldResetOnNextInput = false;
        }
        
        // block entering a second leading zero.
        if (currentInput === '0' && number === '0') return;
        
        // If current input is just "0", replace it with the new number
        if (currentInput === '0') {
            currentInput = number;
        } else {
            // build the number as a string (parsed later when calculating).
            currentInput += number;
        }
        easterEggShown = false; // Reset easter egg flag when typing
        updateDisplay();
    });
});

// Operator button click handlers
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.textContent;
        
        if (currentInput === '') return;
        
        // Reset the flag since we're continuing with an operation
        shouldResetOnNextInput = false;
        
        if (previousInput !== '') {
            calculate();
        }
        
        operation = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    });
});

// Decimal button click handler
decimalButton.addEventListener('click', () => {
    if (shouldResetOnNextInput) {
        currentInput = '';
        previousInput = '';
        operation = null;
        shouldResetOnNextInput = false;
    }
    
    // Prevent multiple decimal points
    if (currentInput.includes('.')) return;
    
    // If currentInput is empty, start with "0."
    if (currentInput === '') {
        currentInput = '0.';
    } else {
        currentInput += '.';
    }
    updateDisplay();
});

// Clear button click handler
clearButton.addEventListener('click', () => {
    clear();
    // Add visual feedback
    clearButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clearButton.style.transform = '';
    }, 100);
});

// Backspace button click handler
backspaceButton.addEventListener('click', () => {
    if (shouldResetOnNextInput) {
        clear();
        return;
    }
    
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
    // Add visual feedback
    backspaceButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        backspaceButton.style.transform = '';
    }, 100);
});

// History toggle button
historyToggleButton.addEventListener('click', () => {
    historyVisible = !historyVisible;
    if (historyVisible) {
        historyDisplay.style.display = 'block';
        updateHistoryDisplay();
    } else {
        historyDisplay.style.display = 'none';
    }
    // Add visual feedback
    historyToggleButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        historyToggleButton.style.transform = '';
    }, 100);
});

// Result button click handler
resultButton.addEventListener('click', () => {
    if (previousInput !== '' && currentInput !== '' && operation !== null) {
        const expression = `${formatNumber(previousInput)} ${operation} ${formatNumber(currentInput)}`;
        calculate();
        if (currentInput !== '') {
            // Add to history
            calculationHistory.unshift({
                expression: expression,
                result: formatNumber(currentInput)
            });
            // Keep only last 5 calculations
            if (calculationHistory.length > 5) {
                calculationHistory.pop();
            }
            if (historyVisible) {
                updateHistoryDisplay();
            }
        }
    }
    operation = null;
    shouldResetOnNextInput = true; // Set flag to clear on next number input
});

// Close button handler
closeButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to close the calculator?')) {
        alert('Calculator closed! (In a real app, this would close the window)');
    }
});

// Close center button handler (clears expression/search)
closeCenterButton.addEventListener('click', () => {
    clear();
    // Add visual feedback
    closeCenterButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        closeCenterButton.style.transform = '';
    }, 100);
});

// Minimize button handler
minimizeButton.addEventListener('click', () => {
    // Toggle history as a "minimize" feature
    historyVisible = !historyVisible;
    if (historyVisible) {
        historyDisplay.style.display = 'block';
        updateHistoryDisplay();
    } else {
        historyDisplay.style.display = 'none';
    }
    // Add visual feedback
    minimizeButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        minimizeButton.style.transform = '';
    }, 100);
});

// Format number with commas for better readability
function formatNumber(num) {
    if (num === '' || num === null || num === undefined) return '0';
    
    const numStr = num.toString();
    // Check if it's a decimal number
    if (numStr.includes('.')) {
        const parts = numStr.split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${integerPart}.${parts[1]}`;
    } else {
        return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// Parse formatted number back to number string
function parseFormattedNumber(formattedNum) {
    return formattedNum.replace(/,/g, '');
}

// Calculate function
function calculate() {
    if (previousInput === '' || currentInput === '' || operation === null) return;
    
    const prev = parseFloat(parseFormattedNumber(previousInput));
    const current = parseFloat(parseFormattedNumber(currentInput));
    let result = 0;
    
    try {
        switch(operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    // Show humorous error message
                    const randomHumor = humorMessages[Math.floor(Math.random() * humorMessages.length)];
                    showError('Cannot divide by zero!', randomHumor);
                    clear();
                    return;
                }
                result = prev / current;
                break;
        }
        
        // Handle very large or very small numbers
        if (Math.abs(result) > 1e15) {
            currentInput = result.toExponential(6);
        } else if (Math.abs(result) < 1e-6 && result !== 0) {
            currentInput = result.toExponential(6);
        } else {
            // Round to avoid floating point precision issues
            result = Math.round(result * 1e12) / 1e12;
            currentInput = result.toString();
        }
        
        // Check for easter eggs in result
        const resultStr = Math.round(result).toString();
        if (easterEggs[resultStr]) {
            easterEggShown = true;
            expressionDisplay.textContent = easterEggs[resultStr];
            expressionDisplay.style.color = '#6a1b9a';
            expressionDisplay.style.fontWeight = '600';
            expressionDisplay.style.fontSize = '11px';
            setTimeout(() => {
                expressionDisplay.textContent = '';
                expressionDisplay.style.color = '#a57b82';
                expressionDisplay.style.fontWeight = 'normal';
                expressionDisplay.style.fontSize = '12px';
                easterEggShown = false;
            }, 3000);
        }
        
        previousInput = '';
        updateDisplay();
    } catch (error) {
        showError('Calculation error!');
        clear();
    }
}

// Show error with visual feedback
function showError(message, humorMessage = '') {
    resultDisplay.textContent = 'Error';
    resultDisplay.style.color = '#d32f2f';
    resultDisplay.style.animation = 'shake 0.3s';
    
    setTimeout(() => {
        resultDisplay.style.color = '#3f2b2e';
        resultDisplay.style.animation = '';
    }, 300);
    
    // Show error message, then humor if provided
    expressionDisplay.textContent = message;
    expressionDisplay.style.color = '#d32f2f';
    expressionDisplay.style.fontWeight = '600';
    
    if (humorMessage) {
        setTimeout(() => {
            expressionDisplay.textContent = humorMessage;
            expressionDisplay.style.color = '#6a1b9a';
            setTimeout(() => {
                expressionDisplay.textContent = '';
                expressionDisplay.style.color = '#a57b82';
                expressionDisplay.style.fontWeight = 'normal';
            }, 3000);
        }, 2000);
    } else {
        setTimeout(() => {
            expressionDisplay.textContent = '';
            expressionDisplay.style.color = '#a57b82';
            expressionDisplay.style.fontWeight = 'normal';
        }, 2000);
    }
}

// Easter eggs and humor messages
const easterEggs = {
    '42': 'The Answer to Life, the Universe, and Everything! 🌌',
    '1337': 'LEET! You\'re a hacker now! 🔥',
    '404': 'Error: Calculator not found! 😄',
    '80085': 'Nice! 😏',
    '69': 'Nice! 😎',
    '420': 'Blaze it! 🌿',
    '314': 'π is approximately 3.14... close enough! 🥧',
    '256': '2^8 - A byte of fun! 💾',
    '1024': '1 KB of awesomeness! 📦',
    '2048': '2 KB - Game reference! 🎮',
    '65536': '2^16 - Maximum unsigned 16-bit! 🚀',
    '2147483647': 'MAX_INT32 - You\'ve reached the limit! ⚠️',
    '4294967295': 'MAX_UINT32 - Overflow incoming! 💥',
    '0': 'Zero is not nothing, it\'s something! 🎯',
    '1': 'The loneliest number... 🎵',
    '2': 'Binary: 10 💻',
    '3': 'A prime number! ✨',
    '5': 'High five! ✋',
    '7': 'Lucky number 7! 🍀',
    '8': 'Infinity symbol on its side! ♾️',
    '13': 'Unlucky for some, but not for you! 🍀',
    '21': 'Blackjack! 🎰',
    '99': '99 bottles of code on the wall... 🍺',
    '100': 'Century! 🎉',
    '200': 'HTTP 200 OK! ✅',
    '500': 'HTTP 500 - Internal Server Error! 😱',
    '1000': '1K - Thousand! 💯',
    '1000000': '1M - Millionaire! 💰',
    '999999999': 'Almost a billion! 🚀',
    '111111111': 'Binary pattern detected! 🔢',
    '123456789': 'Sequential perfection! 📈',
    '987654321': 'Reverse sequential! 📉',
    '666': 'The number of the beast! 😈',
    '777': 'Jackpot! 🎰',
    '888': 'Triple infinity! ♾️♾️♾️',
};

const humorMessages = [
    'Dividing by zero? That\'s undefined behavior! 🚫',
    'Math is just organized counting! 📊',
    'There are 10 types of people: those who understand binary and those who don\'t! 😄',
    'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    'Real programmers count from 0! 💻',
    'NaN is not a number, but it\'s still a number! 🤔',
    'In math, you don\'t understand things. You just get used to them! 🧮',
    'Why was 6 afraid of 7? Because 7 8 9! 😂',
    'I would tell you a joke about infinity, but it never ends! ♾️',
    'Parallel lines have so much in common. It\'s a shame they\'ll never meet! 📐',
    'Why don\'t scientists trust atoms? Because they make up everything! ⚛️',
    'I\'m reading a book about anti-gravity. It\'s impossible to put down! 📚',
    'Why did the programmer quit? They didn\'t get arrays! 😂',
    'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?" 🍻',
    'Why do Java developers wear glasses? Because they can\'t C#! 👓',
    'How do you comfort a JavaScript bug? You console it! 🐛',
    'Why did the function break up? It had too many arguments! 💔',
    'What\'s a programmer\'s favorite hangout? Foo Bar! 🍺',
    'Why don\'t programmers like nature? It has too many bugs! 🌳',
    'What do you call a programmer from Finland? Nerdic! 🇫🇮',
];

let lastHumorMessage = '';
let easterEggShown = false;

// Update display function
function updateDisplay() {
    if (currentInput === '') {
        resultDisplay.textContent = '0';
        easterEggShown = false;
    } else {
        // Format the number for display
        const parsedInput = parseFormattedNumber(currentInput);
        resultDisplay.textContent = formatNumber(currentInput);
        
        // Check for easter eggs
        if (!easterEggShown && easterEggs[parsedInput]) {
            easterEggShown = true;
            expressionDisplay.textContent = easterEggs[parsedInput];
            expressionDisplay.style.color = '#6a1b9a';
            expressionDisplay.style.fontWeight = '600';
            expressionDisplay.style.fontSize = '11px';
            setTimeout(() => {
                if (previousInput === '' && operation === null) {
                    expressionDisplay.textContent = '';
                    expressionDisplay.style.color = '#a57b82';
                    expressionDisplay.style.fontWeight = 'normal';
                    expressionDisplay.style.fontSize = '12px';
                }
            }, 3000);
            return;
        }
    }
    
    if (previousInput !== '' && operation !== null) {
        expressionDisplay.textContent = `${formatNumber(previousInput)} ${operation} ${currentInput ? formatNumber(currentInput) : ''}`;
        expressionDisplay.style.color = '#a57b82';
        expressionDisplay.style.fontWeight = 'normal';
        expressionDisplay.style.fontSize = '12px';
        easterEggShown = false;
    } else if (currentInput === '' || easterEggShown === false) {
        expressionDisplay.textContent = '';
        expressionDisplay.style.color = '#a57b82';
        expressionDisplay.style.fontWeight = 'normal';
        expressionDisplay.style.fontSize = '12px';
    }
}

// Update history display
function updateHistoryDisplay() {
    if (calculationHistory.length === 0) {
        historyDisplay.innerHTML = '<div class="history-empty">No calculations yet</div>';
        return;
    }
    
    historyDisplay.innerHTML = calculationHistory.map(item => 
        `<div class="history-item">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
        </div>`
    ).join('');
}

// Clear function
function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    easterEggShown = false;
    expressionDisplay.style.color = '#a57b82';
    expressionDisplay.style.fontWeight = 'normal';
    expressionDisplay.style.fontSize = '12px';
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    // Prevent default for calculator keys
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', '=', 'Escape', 'Backspace', 'Delete'].includes(e.key)) {
        e.preventDefault();
    }
    
    if (e.key >= '0' && e.key <= '9') {
        // If we just got a result, clear everything and start fresh
        if (shouldResetOnNextInput) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldResetOnNextInput = false;
        }
        
        // Handle leading zero
        if (currentInput === '0' && e.key === '0') return;
        if (currentInput === '0') {
            currentInput = e.key;
        } else {
            currentInput += e.key;
        }
        updateDisplay();
    } else if (e.key === '.') {
        // Decimal point
        if (shouldResetOnNextInput) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldResetOnNextInput = false;
        }
        if (currentInput.includes('.')) return;
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
        updateDisplay();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (currentInput === '') return;
        shouldResetOnNextInput = false;
        if (previousInput !== '') calculate();
        operation = e.key === '*' ? '×' : e.key;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        if (previousInput !== '' && currentInput !== '' && operation !== null) {
            const expression = `${formatNumber(previousInput)} ${operation} ${formatNumber(currentInput)}`;
            calculate();
            if (currentInput !== '') {
                calculationHistory.unshift({
                    expression: expression,
                    result: formatNumber(currentInput)
                });
                if (calculationHistory.length > 5) {
                    calculationHistory.pop();
                }
                if (historyVisible) {
                    updateHistoryDisplay();
                }
            }
        }
        operation = null;
        shouldResetOnNextInput = true;
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (shouldResetOnNextInput) {
            clear();
            return;
        }
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    }
});

// Welcome message on first load
let firstLoad = true;
setTimeout(() => {
    if (firstLoad && currentInput === '' && previousInput === '') {
        const welcomeMessages = [
            'Hello, World! 👋',
            'Ready to calculate! 🧮',
            '42 is the answer! 🤖',
            'NaN != NaN (but true == true) 😄',
            'console.log("Hello, Calculator!") 💻',
            'const calculator = "awesome"; 🚀',
            'if (you.like(this)) { return "PR approved!"; } 💜',
            '// TODO: Add more easter eggs 🥚',
            'git commit -m "Added humor" 😂',
            'while(true) { calculate(); } ♾️',
        ];
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        expressionDisplay.textContent = randomWelcome;
        expressionDisplay.style.color = '#6a1b9a';
        expressionDisplay.style.fontWeight = '600';
        expressionDisplay.style.fontSize = '11px';
        setTimeout(() => {
            expressionDisplay.textContent = '';
            expressionDisplay.style.color = '#a57b82';
            expressionDisplay.style.fontWeight = 'normal';
            expressionDisplay.style.fontSize = '12px';
            firstLoad = false;
        }, 2500);
    }
}, 500);

// Initialize display
updateDisplay();