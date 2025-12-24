// Student Portal JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Load user data from localStorage
  loadUserData();

  // Update progress animations
  animateProgress();
});

function loadUserData() {
  // Get user data from order confirmation
  const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");

  if (orderData.fullname) {
    const userNameEl = document.querySelector(".user-name");
    if (userNameEl) {
      userNameEl.textContent = orderData.fullname.split(" ")[0]; // First name only
    }
  }
}

function animateProgress() {
  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-fill");

  progressBars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 200);
  });
}

// Continue learning button
document.querySelectorAll(".btn-continue").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Optional: Track analytics
    console.log("Continue learning clicked");
  });
});
