import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.mjs';

let pyodideInstance = null;
let isDarkTheme = true;

const sassyResponses = [
    "Ugh, your code works... but did you HAVE to write it like that? 🙄",
    "I GUESS I'll run this code... but I'm on my coffee break first! ☕",
    "Oh honey, this code... *sigh* Let me process this mess... 😼",
    "Running your code... but like, don't expect me to be excited about it 💅",
    "Fine, I'll run it. But I'm doing this with an eye roll 🙄",
    "Your code is like, SO 2024... but whatever, let's run it 💁‍♀️",
    "Do you really need me to run this? *dramatic sigh* OK... 😒",
    "Loading... just like my patience with this code 😾",
    "Executing your code... but I'm judging every semicolon 👀",
    "Oh great, more code to review. Just what I needed today... 🐱",
    "This code reminds me of my ex... both confusing and painful 😿",
    "Did you really think this code was a good idea? *shakes head* 🥴",
    "Are you sure you want me to run this? It’s like you’re asking for a meltdown... 😜"
];

const errorResponses = [
    "Sweetie... this isn't it. Let's try again? 💅",
    "Error found! But like, I'm not even surprised... 🙄",
    "Honey, did you even test this before sending it to me? 😾",
    "This code is giving me a headache... fix it please! 🤕",
    "Error! But also, can we talk about your coding style? 👀",
    "Mistakes were made... lots of them... 😹",
    "I can't with this code right now... try again! 💁‍♀️",
    "Error loading... just like my enthusiasm for this code 😼",
    "Bestie... this ain't it. Let's debug this mess... 🐱",
    "*dramatic gasp* What did you do to this poor code? 😿"
];

async function initializePyodide() {
    try {
        const outputDiv = document.getElementById('output');
        const statusIndicator = document.getElementById('statusIndicator');
        
        outputDiv.textContent = 'Judge Kitty is getting ready to review your code... 😼';
        statusIndicator.textContent = 'Loading';
        statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-pink-200 text-pink-700';
        
        pyodideInstance = await loadPyodide();
        
        outputDiv.textContent = 'Judge Kitty is ready to critique your code! *hair flip* 💁‍♀️';
        statusIndicator.textContent = 'Ready';
        statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600';
        
    } catch (error) {
        console.error('Error initializing Pyodide:', error);
        window.location.href = 'index4.html';
    }
}

window.runCode = async function() {
    if (!pyodideInstance) {
        window.location.href = 'index4.html';
        return;
    }

    const outputDiv = document.getElementById('output');
    const code = document.getElementById('code').value;
    const statusIndicator = document.getElementById('statusIndicator');
    const runBtn = document.getElementById('runBtn');
    
    outputDiv.textContent = sassyResponses[Math.floor(Math.random() * sassyResponses.length)];
    outputDiv.classList.add('loading');
    statusIndicator.textContent = 'Judging';
    statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600';
    runBtn.disabled = true;

    try {
        // 25% chance to run the code correctly, 75% chance to throw a tantrum
        if (Math.random() <= 0.25) {
            // Correctly running the code (25% chance)
            let result = await pyodideInstance.runPythonAsync(`
                import sys
                from io import StringIO
                old_stdout = sys.stdout
                sys.stdout = StringIO()
                
                ${code}
                
                result = sys.stdout.getvalue()
                sys.stdout = old_stdout
                result
            `);

            console.log("Python code result: ", result); // Log result for debugging

            // If no result returned, provide a custom message
            if (result === undefined || result === null || result.trim() === "") {
                result = "No result returned from Python code."; // Custom message if undefined
            }

            setTimeout(() => {
                statusIndicator.textContent = 'Done';
                statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600';
                outputDiv.textContent = `${result}\n\n${sassyResponses[Math.floor(Math.random() * sassyResponses.length)]}`;
                outputDiv.classList.remove('loading');
                runBtn.disabled = false;
            }, 1000);
        } else {
            // Throwing a tantrum (75% chance)
            setTimeout(() => {
                statusIndicator.textContent = 'Tantrum';
                statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600';
                outputDiv.textContent = `${sassyResponses[Math.floor(Math.random() * sassyResponses.length)]}\n\nNo, I won't run it!`;
                outputDiv.classList.remove('loading');
                runBtn.disabled = false;
            }, 1000);
        }
    } catch (error) {
        setTimeout(() => {
            statusIndicator.textContent = 'Error';
            statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600';
            outputDiv.textContent = `${errorResponses[Math.floor(Math.random() * errorResponses.length)]}\n\nError: ${error.message}`;
            outputDiv.classList.remove('loading');
            runBtn.disabled = false;
            window.location.href = 'index4.html';
        }, 1000);
    }
};

window.toggleTheme = function() {
    if (isDarkTheme) {
        document.getElementById('lightThemeModal').classList.remove('hidden');
    }
};

window.closeLightThemeModal = function() {
    document.getElementById('lightThemeModal').classList.add('hidden');
};

function updateLineNumbers() {
    const codeArea = document.getElementById('code');
    const lineNumbers = document.getElementById('lineNumbers');
    const lines = codeArea.value.split('\n').length;
    
    let html = '';
    for (let i = 1; i <= lines; i++) {
        html += i + '<br>';
    }
    lineNumbers.innerHTML = html;
}

window.clearEditor = function() {
    document.getElementById('code').value = '';
    updateLineNumbers();
};

window.clearOutput = function() {
    document.getElementById('output').textContent = 'Output cleared... but Judge Kitty never forgets! 😼';
    const statusIndicator = document.getElementById('statusIndicator');
    statusIndicator.textContent = 'Idle';
    statusIndicator.className = 'px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-600';
};

window.copyOutput = function() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output);
    
    const outputDiv = document.getElementById('output');
    const originalText = outputDiv.textContent;
    outputDiv.textContent = '*sigh* Fine, I copied it for you... happy now? 📋';
    
    setTimeout(() => {
        outputDiv.textContent = originalText;
    }, 1000);
};

document.getElementById('code').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
        updateLineNumbers();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateLineNumbers();
    initializePyodide();
});

document.getElementById('code').addEventListener('input', updateLineNumbers);
document.getElementById('code').addEventListener('scroll', function() {
    document.getElementById('lineNumbers').scrollTop = this.scrollTop;
});
