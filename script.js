const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const bookButtons = document.querySelectorAll('.book-button');

const bookingPhone = '9963392814';

function addMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openChat() {
    chatWidget.classList.add('open');
    chatWidget.setAttribute('aria-hidden', 'false');
    chatInput.focus();
}

function closeChat() {
    chatWidget.classList.remove('open');
    chatWidget.setAttribute('aria-hidden', 'true');
}

function respondToInquiry(message) {
    const normalized = message.trim().toLowerCase();
    if (!normalized) {
        addMessage('Please enter the item you want to book or ask a question.');
        return;
    }

    if (normalized.includes('signature ring')) {
        addMessage('Great choice! I can help book the Signature Ring. Please call 9963392814 to confirm it now.');
        return;
    }

    if (normalized.includes('pearl pendant')) {
        addMessage('The Pearl Pendant is available. To complete your booking, call 9963392814 and mention the Pearl Pendant.');
        return;
    }

    if (normalized.includes('diamond bracelet')) {
        addMessage('The Diamond Bracelet looks stunning. Please contact 9963392814 to book it straight away.');
        return;
    }

    if (normalized.includes('book') || normalized.includes('enquire') || normalized.includes('reserve')) {
        addMessage('Thanks for your enquiry. Please tell me which item you would like to book, and I will share the booking number.');
        return;
    }

    addMessage(`I can connect you to our booking line at ${bookingPhone}. Which item would you like to book?`);
}

chatToggle.addEventListener('click', () => {
    openChat();
    if (chatMessages.children.length === 0) {
        addMessage('Hi! Send the item name you want to book, and I will give you the enquiry details.');
    }
});

chatClose.addEventListener('click', closeChat);

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    chatInput.value = '';
    setTimeout(() => respondToInquiry(message), 450);
});

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.dataset.item;
        openChat();
        if (chatMessages.children.length === 0) {
            addMessage('Hi! Send the item name you want to book, and I will give you the enquiry details.');
        }
        chatInput.value = item;
        chatInput.focus();
    });
});
