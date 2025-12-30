# 🧮 Calculator App

A beautifully designed calculator with a retro-inspired UI featuring a custom window interface, smooth animations, and full keyboard support. Built as Day 1 of the 30 Days 30 Projects challenge.

<p align="center">
  <img src="images/calculator.png" alt="Calculator Preview" width="400">
</p>

## ✨ Features

### 🎨 Design
- **Retro-Inspired UI**: Custom window interface with pink and cream color scheme
- **Smooth Animations**: Hover effects and button press feedback
- **Responsive Layout**: Adapts to different screen sizes (mobile-friendly)
- **Custom Header**: Window controls (minimize/close buttons) and branding

### 🔢 Functionality
- **Basic Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (/)
- **Decimal Point Support**: Full decimal number calculations with validation
- **Clear & Backspace**: Clear button (C) and backspace (⌫) for easy editing
- **Number Formatting**: Large numbers displayed with comma separators for readability
- **Calculation History**: View last 5 calculations with toggle button (📜)
- **Real-time Display**: Shows current input and full expression
- **Continuous Calculations**: Chain multiple operations together
- **Enhanced Error Handling**: User-friendly error messages with visual feedback
- **Smart Input Reset**: Automatically clears after getting a result

### ⌨️ Keyboard Support
- **Number Keys** (0-9): Input numbers
- **Decimal Point** (.): Add decimal point
- **Operator Keys** (+, -, *, /): Perform operations
- **Enter/=**: Calculate result
- **Escape/C**: Clear calculator
- **Backspace/Delete**: Remove last digit

### 📱 Dual Implementation
- **Web Version**: Interactive browser-based calculator (HTML/CSS/JS)
- **Python Version**: Command-line calculator with additional power operator (**)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for Python version)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anjila-26/Pomodoro-Timer.git
   cd day1
   ```

2. **Run Web Version**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Then open http://localhost:8000
     ```

3. **Run Python Version**
   ```bash
   python calculator.py
   ```

## 📂 Project Structure

```
day1/
├── index.html              # Main HTML structure
├── style.css              # Styling and animations
├── script.js              # Calculator logic and event handlers
├── calculator.py          # Python CLI version
├── README.md              # Documentation
└── images/
    ├── icon.png           # Logo icon
    └── rocket.png         # Calculator header icon
```

## 🎯 How to Use

### Web Calculator

1. **Click Numbers**: Click on number buttons (0-9) to input values
2. **Decimal Numbers**: Click the "." button to add decimal points
3. **Select Operator**: Click +, -, ×, or / to choose operation
4. **Get Result**: Click "=" button or press Enter to calculate
5. **Clear**: Click "C" button or press Escape/C to clear everything
6. **Backspace**: Click "⌫" button or press Backspace/Delete to remove last digit
7. **View History**: Click "📜" button to toggle calculation history
8. **Continue Calculation**: After a result, click an operator to continue with that result
9. **Start Fresh**: After a result, click a number to start a new calculation
10. **Discover Easter Eggs**: Try entering special numbers like 42, 1337, 404, 69, 420, or divide by zero for some tech humor! 🥚

### Python Calculator

1. Enter the first number
2. Enter an operator (+, -, *, /, **)
3. Enter the second number
4. View the result
5. Choose to continue or exit

## 🥚 Easter Eggs & Humor

The calculator includes hidden easter eggs and programming humor:

- **Special Numbers**: Enter numbers like `42`, `1337`, `404`, `69`, `420`, `256`, `1024`, `2048`, `65536`, `2147483647`, and more to see fun messages!
- **Welcome Messages**: Random welcome messages appear when you first load the calculator
- **Error Humor**: When you divide by zero, you'll get a random programming joke along with the error
- **Result Easter Eggs**: Some calculation results trigger special messages too!

Try it out and discover all the hidden gems! 😄

## 💻 Code Highlights

### Smart Input Reset
```javascript
let shouldResetOnNextInput = false;

// After calculation, flag is set to clear on next number input
resultButton.addEventListener('click', () => {
    calculate();
    operation = null;
    shouldResetOnNextInput = true;
});
```

### Continuous Calculations
```javascript
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Calculate previous operation before starting new one
        if (previousInput !== '') {
            calculate();
        }
        // Store operation and continue
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    });
});
```

### Division by Zero Protection
```javascript
case '/':
    if (current === 0) {
        alert('Cannot divide by zero!');
        clear();
        return;
    }
    result = prev / current;
    break;
```

## 🎨 Styling Details

- **Color Palette**:
  - Primary Pink: `#FF7980`
  - Background: `#f7e9ea`
  - Button Background: `#fff6f6`
  - Border/Shadow: `#62405B`
  - Button Plate: `#FBC5C5`

- **Typography**: System fonts (Apple System, Segoe UI, Roboto)
- **Shadows**: Custom box shadows for depth and 3D effect
- **Animations**: Smooth transitions on hover and click

## 📱 Responsive Design

```css
@media (max-width: 420px) {
    .calculator { max-width: 320px; }
    .btn { width: 56px; height: 52px; font-size: 18px; }
    .result { font-size: 40px; }
}
```

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Flexbox, Grid, Custom styling, Animations
- **Vanilla JavaScript**: DOM manipulation, Event handling, Calculator logic
- **Python**: CLI alternative implementation

## ✨ Recent Improvements (PR by Bipin Thapa)

- ✅ **Decimal Point Support**: Full decimal number calculations
- ✅ **Clear & Backspace Buttons**: Easy editing with dedicated UI buttons
- ✅ **Number Formatting**: Comma-separated numbers for better readability
- ✅ **Calculation History**: View and toggle last 5 calculations
- ✅ **Enhanced Error Handling**: Visual feedback with shake animation
- ✅ **Improved Keyboard Support**: Backspace/Delete key support
- ✅ **Better UX**: Fixed initial display, improved button feedback
- ✅ **Easter Eggs & Tech Humor**: Hidden easter eggs for special numbers (42, 1337, 404, etc.) and programming jokes! 🥚😄

## 🔮 Future Enhancements

- [ ] Add memory functions (M+, M-, MR, MC)
- [ ] Include scientific calculator mode
- [ ] Implement themes (light/dark mode)
- [ ] Add parentheses support for complex expressions
- [ ] Store calculation history in localStorage
- [ ] Add percentage calculations
- [ ] Support for keyboard shortcuts (Ctrl+C, etc.)

## 🐛 Known Issues

- Expression display shows partial expressions during chained calculations
- History is session-based (not persisted in localStorage)

## 📝 Learning Outcomes

This project helped practice:
- Event-driven programming in JavaScript
- State management in vanilla JS
- CSS Grid and Flexbox layouts
- Responsive design principles
- Error handling and edge cases
- Keyboard event handling
- Creating custom UI components

## 👨‍💻 Author

**Anjila**
- GitHub: [@Anjila-26](https://github.com/Anjila-26)
- Project: [30 Days 30 Projects - Programiz](https://github.com/Anjila-26/Pomodoro-Timer)

## 📄 License

This project is part of the 30 Days 30 Projects challenge and is open source.

## 🙏 Acknowledgments

- Design inspired by retro calculator interfaces
- Part of the Programiz 30 Days 30 Projects challenge
- Icons and imagery created for this project

---

**Day 1 of 30** | *Built with 💖 and ☕ TM Bipin0x01 Much Love*
