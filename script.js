const chat = document.getElementById('chat');
const history = document.getElementById('history');
const promptBox = document.getElementById('prompt');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender){
    const div = document.createElement('div');
    div.className = 'msg ' + sender;

    if(sender === 'bot'){
        // wrap bot answer in separate box
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
function sendMessage(){
    const text = promptBox.value.trim();
    if(!text) return;

    addMessage(text, 'user');

    // Add to history
    const li = document.createElement('li');
    li.textContent = text.slice(0,40);
    history.appendChild(li);

    promptBox.value = '';

    // Mock bot response
    setTimeout(() => {
        addMessage("This is a sample bot answer in a separate box.", 'bot');
    }, 700);
}

sendBtn.addEventListener('click', sendMessage);
promptBox.addEventListener('keypress', e=>{
    if(e.key==='Enter' && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
