
// ===================================
// 1. EMAILJS INITIALIZATION
// ===================================

if (window.emailjs) {
    emailjs.init({
        publicKey: "DT8mLK_SIMF2IN87"
    });
}


// ===================================
// 2. CONTACT FORM
// ===================================

const contactForm = document.getElementById("contactForm");

const contactStatus = document.getElementById("contactStatus");
const recipientEmail = "priyalbca2024@gmail.com";

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);
        const messageData = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
            to_email: recipientEmail,
            reply_to: formData.get("email")
        };

        function showEmailFallback(errorMessage) {
            contactStatus.replaceChildren();

            const explanation = document.createElement("span");
            explanation.textContent = errorMessage
                ? `Automatic email failed: ${errorMessage}. Send it manually:`
                : "Automatic email is unavailable. Send it manually:";

            const emailLink = document.createElement("a");
            const subject = "Portfolio contact message";
            const body = [
                `Name: ${messageData.name}`,
                `Email: ${messageData.email}`,
                `Phone: ${messageData.phone || "Not provided"}`,
                "",
                `Message: ${messageData.message}`
            ].join("\n");

            emailLink.href =
                `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            emailLink.className = "send-via-gmail";
            emailLink.textContent = "Open your email app";
            contactStatus.append(explanation, emailLink);
        }

        if (!window.emailjs) {
            console.error("EMAIL ERROR: EmailJS library did not load.");
            showEmailFallback();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        contactStatus.textContent = "Sending your message...";

        emailjs.send(
            "service_dijvu3o",
            "template_3yuweyv",
            messageData
        )

        .then(function(response) {

            console.log("SUCCESS!", response.status, response.text);

            contactStatus.textContent =
                "Your message has been sent successfully!";

            contactForm.reset();

        })

        .catch(function(error) {

            console.error("EMAIL ERROR:", error);
            showEmailFallback(error && (error.text || error.message));

        })

        .finally(function() {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        });

    });

}


// ===================================
// 3. SMOOTH SCROLLING
// ===================================

const navigationLinks = document.querySelectorAll(
    '.navbar a[href^="#"]'
);

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId = link.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ===================================
// 4. ACTIVE NAVIGATION
// ===================================

const menuLinks = document.querySelectorAll(".navbar ul a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    document.querySelectorAll("section[id]").forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    menuLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ===================================
// 5. SCROLL REVEAL ANIMATION
// ===================================

const revealSections = document.querySelectorAll(
    "#about, #skills, #projects, #contact"
);

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

revealSections.forEach(function(section) {

    observer.observe(section);

});


// ===================================
// 6. CONSOLE MESSAGE
// ===================================

console.log("Priyal Portfolio Website Loaded Successfully!");
