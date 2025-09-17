const chat = document.getElementById('chat');
const history = document.getElementById('history');
const promptBox = document.getElementById('prompt');
const sendBtn = document.getElementById('sendBtn');

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

    const li = document.createElement('li');
    li.textContent = text.slice(0,40);
    history.appendChild(li);

    promptBox.value = '';

    // Call backend
    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({prompt: text})
        });

        const data = await res.json();
        addMessage(data.response, 'bot');
    } catch (err) {
        addMessage("⚠️ Error connecting to backend.", 'bot');
        console.error(err);
    }
}

sendBtn.addEventListener('click', sendMessage);
promptBox.addEventListener('keypress', e=>{
    if(e.key==='Enter' && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
