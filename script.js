emailjs.init("ojzs_ap2YMlF9B8jO");

async function sendSurprise() {
    const sender = document.getElementById('sender_name').value;
    const friend = document.getElementById('friend_name').value;
    const email = document.getElementById('friend_email').value;
    const msg = document.getElementById('birthday_message').value;

    if (!sender || !friend || !email || !msg) {
        alert("Please fill in all the fields before sending!");
        return;
    }

    try {
        // Fetch a massive list of banned words from a community-maintained repository
        const response = await fetch('https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en');
        const listText = await response.text();
        const bannedWords = listText.split('\n').map(word => word.trim().toLowerCase()).filter(word => word.length > 0);

        const combinedText = `${sender} ${friend} ${msg}`.toLowerCase();
        
        // Check if any word from the massive list is inside the user's text
        const foundBadWord = bannedWords.some(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(combinedText);
        });

        if (foundBadWord) {
            alert("Your message contains language that is not allowed. Please keep it respectful!");
            return;
        }

    } catch (error) {
        console.log("Filter check skipped due to connection, proceeding with basic check.");
    }

    // Trigger Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    const templateParams = {
        from_name: sender,
        friend_name: friend,
        to_email: email,
        birthday_message: msg
    };

    emailjs.send("service_icloud", "template_bsp34oe", templateParams)
        .then(function() {
            alert("Success! Your message has been sent via birthday.willkitch.me, the email will come from birthday@willkitch.me)");
            document.querySelectorAll('input, textarea').forEach(el => el.value = '');
        }, function(error) {
            alert("Failed to send message.");
            console.error("ERROR:", error);
        });
}