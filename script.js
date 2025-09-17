const chat = document.getElementById('chatBox');   // updated
const promptBox = document.getElementById('userInput');  // updated

function addMessage(text, sender){
    const div = document.createElement('div');
    div.className = 'msg ' + sender;

    if(sender === 'bot'){
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-box';
        answerDiv.textContent = text;
        div.appendChild(answerDiv);
    } else {
        div.textContent = text;
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Send message
async function sendMessage(){
    const text = promptBox.value.trim();
    if(!text) return;

    addMessage(text, 'user');
    promptBox.value = '';

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({prompt: text})
        });

        const data = await res.json();
        addMessage(data.response, 'bot');  // show DeepSeek response
    } catch (err) {
        addMessage("⚠️ Error connecting to backend.", 'bot');
        console.error(err);
    }
}

// Optional: allow Enter to send
promptBox.addEventListener('keypress', e => {
    if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
