

document.addEventListener('DOMContentLoaded', () => {
    const landing = document.getElementById('landing');
    const compiler = document.getElementById('compiler');
    const glitchText = document.querySelector('.glitch-text');
    const enterCounter = document.querySelector('.enter-counter');
    
    // Initialize ACE editor
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/python");
    editor.setValue(`# Write your Python code here
print("Hello, World!")
`);
    
    // Typewriter animation function
    function typeWriter(element, initialText, finalText, startDelay = 1000) {
        setTimeout(() => {
            let currentText = initialText;
            const targetText = finalText;
            let currentIndex = currentText.length;
            
            // First, handle backspacing
            const backspaceInterval = setInterval(() => {
                if (currentIndex > 1) { // Keep '<' intact
                    currentText = currentText.slice(0, -1);
                    element.textContent = currentText;
                    currentIndex--;
                } else {
                    clearInterval(backspaceInterval);
                    // Start typing new text
                    let typingIndex = 1; // Start after '<'
                    const typingInterval = setInterval(() => {
                        if (typingIndex < targetText.length) {
                            currentText = '<' + targetText.slice(1, typingIndex + 1);
                            element.textContent = currentText;
                            typingIndex++;
                        } else {
                            clearInterval(typingInterval);
                            // Show enter counter after typing is complete
                            enterCounter.classList.add('visible');
                        }
                    }, 100);
                }
            }, 100);
        }, startDelay);
    }

    // Start the animation sequence
    glitchText.textContent = '</>';
    typeWriter(glitchText, '</>', '</compiler>', 2000);

    // Handle Enter key presses
    let enterCount = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && enterCount < 4 && !landing.classList.contains('hidden')) {
            enterCount++;
            
            // Update counter text
            enterCounter.textContent = `Press Enter`;
            
            // Add janky glitch effect
            glitchText.classList.add('janky');
            
            // Random position offset
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            glitchText.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Remove effects after animation
            setTimeout(() => {
                glitchText.classList.remove('janky');
                glitchText.style.transform = 'translate(0, 0)';
            }, 200);
            
            // If we've reached 4 enters, transition to compiler
            if (enterCount === 4) {
                console.log("going main")
                window.location.href = "main.html";
                setTimeout(() => {
                    landing.style.opacity = '0';
                    setTimeout(() => {
                        landing.classList.add('hidden');
                        compiler.classList.remove('hidden');
                    }, 500);
                }, 500);
            }
        }
    });

    // Button functionality
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const output = document.getElementById('output');

    runBtn.addEventListener('click', () => {
        const code = editor.getValue();
        output.textContent = "Python code execution is simulated in this demo.\n\n";
        output.textContent += `Output would be shown here.\nYour code:\n${code}`;
    });

    clearBtn.addEventListener('click', () => {
        editor.setValue('');
        output.textContent = '';
    });
});