// script.js

let smtpConfig = {};
let sentEmails = [];

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password) {
        alert('Logged in successfully!');
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.smtp-config-form').style.display = 'block';
    } else {
        alert('Please enter email and password.');
    }
}

function saveConfig() {
    smtpConfig = {
        server: document.getElementById('smtpServer').value,
        port: document.getElementById('smtpPort').value,
        user: document.getElementById('smtpUser').value,
        password: document.getElementById('smtpPassword').value
    };
    if (smtpConfig.server && smtpConfig.port && smtpConfig.user && smtpConfig.password) {
        alert('SMTP configuration saved!');
        document.querySelector('.smtp-config-form').style.display = 'none';
        document.querySelector('.mail-form').style.display = 'block';
        document.querySelector('.sent-folder').style.display = 'block';
    } else {
        alert('Please fill all the fields.');
    }
}

function sendEmail() {
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;
    
    if (to && subject && body) {
        const email = {
            to,
            subject,
            body
        };
        alert('Email sent successfully!');
        sentEmails.push(email);
        updateSentEmails();
    } else {
        alert('Please fill all the fields.');
    }
}

function updateSentEmails() {
    const sentEmailsList = document.getElementById('sentEmailsList');
    sentEmailsList.innerHTML = '';
    sentEmails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = `To: ${email.to}, Subject: ${email.subject}`;
        sentEmailsList.appendChild(li);
    });
}
