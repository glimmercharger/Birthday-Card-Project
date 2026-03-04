emailjs.init("ojzs_ap2YMlF9B8jO");

function sendSurprise() {
    const sender = document.getElementById('sender_name').value; // New line
    const nameInput = document.getElementById('friend_name').value;
    const emailInput = document.getElementById('friend_email').value;
    const msgInput = document.getElementById('birthday_message').value;

    if (!sender || !nameInput || !emailInput) {
        alert("Please fill in your name, the recipient's name, and their email!");
        return;
    }

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    const templateParams = {
        from_name: sender,           // This is now dynamic!
        friend_name: nameInput,      
        to_email: emailInput,        
        birthday_message: msgInput
    };

    emailjs.send("service_icloud", "template_bsp34oe", templateParams)
        .then(function() {
            alert("Success! The birthday magic has been sent from " + sender);
            // Clear all fields
            document.getElementById('sender_name').value = '';
            document.getElementById('friend_name').value = '';
            document.getElementById('friend_email').value = '';
            document.getElementById('birthday_message').value = '';
        }, function(error) {
            alert("Email failed to send.");
            console.error("ERROR:", error);
        });
}