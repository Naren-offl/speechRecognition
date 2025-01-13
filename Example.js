let element = document.getElementById("text");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-GB";
recognition.continuous = true;
recognition.interimResults = true;

// Start recognition on button click
startBtn.onclick = () => {
    recognition.start();
    element.innerText = "Listening...";
    startBtn.disabled = true; // Disable start button while listening
    stopBtn.disabled = false;
};

// Stop recognition on button click
stopBtn.onclick = () => {
    recognition.stop();
    element.innerText = "Recognition stopped.";
    startBtn.disabled = false; // Enable start button
    stopBtn.disabled = true;
};

// Handle recognition results
recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
    }
    element.innerText = transcript.trim();
};

// Handle recognition errors
recognition.onerror = (event) => {
    element.innerText = `Error occurred in recognition: ${event.error}`;
};

// Initialize buttons
startBtn.disabled = false;
stopBtn.disabled = true;
