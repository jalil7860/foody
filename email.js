emailjs.init("xCznA1W2dUJX24J4o"); // Replace with your EmailJS public key

// Newsletter form handler
document
  .getElementById("newsletter-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("subscriber-email").value;
    const button = document.getElementById("subscribe-btn");
    const btnText = document.getElementById("btn-text");
    const spinner = document.getElementById("loading-spinner");

    // Show loading state
    button.classList.add("loading");

    try {
      // Send newsletter subscription email
      await emailjs.send("service_zk61qst", "template_uu39qf6", {
        subscriber_email: email,
        from_name: "Foody Newsletter",
      });

      // Show success popup
      showSuccessPopup(email);

      // Reset form
      document.getElementById("newsletter-form").reset();
    } catch (error) {
      console.error("Error sending email:", error);
      showErrorPopup();
    } finally {
      // Hide loading state
      button.classList.remove("loading");
    }
  });

// Success popup function
function showSuccessPopup(email) {
  const overlay = document.createElement("div");
  overlay.className = "newsletter-overlay show";

  const popup = document.createElement("div");
  popup.className = "newsletter-popup show";
  popup.innerHTML = `
    <div class="popup-icon">
      <i class="fas fa-check-circle"></i>
    </div>
    <h3 class="popup-title">Successfully Subscribed!</h3>
    <p class="popup-message">
      Thank you for subscribing to our newsletter! 📧<br>
      A confirmation email has been sent to <strong>${email}</strong>.<br>
      Stay tuned for fresh updates about our organic products!
    </p>
    <button class="popup-close" onclick="closePopup()">Got it!</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // Auto close after 5 seconds
  setTimeout(closePopup, 10000);
}

// Error popup function
function showErrorPopup() {
  const overlay = document.createElement("div");
  overlay.className = "newsletter-overlay show";

  const popup = document.createElement("div");
  popup.className = "newsletter-popup show";
  popup.innerHTML = `
    <div class="popup-icon" style="color: #dc3545;">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <h3 class="popup-title">Oops! Something went wrong</h3>
    <p class="popup-message">
      We couldn't process your subscription right now.<br>
      Please try again later or contact us directly.
    </p>
    <button class="popup-close" onclick="closePopup()">Try Again</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);
}

// Close popup function
function closePopup() {
  const overlay = document.querySelector(".newsletter-overlay");
  const popup = document.querySelector(".newsletter-popup");

  if (overlay) overlay.remove();
  if (popup) popup.remove();
}

// Close popup when clicking overlay
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("newsletter-overlay")) {
    closePopup();
  }
});
