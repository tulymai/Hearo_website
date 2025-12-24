// Course Detail Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Auto-expand first week
  const firstWeek = document.querySelector(".curriculum-week");
  if (firstWeek) {
    firstWeek.classList.add("active");
  }
});

// Toggle curriculum week
function toggleWeek(header) {
  const week = header.parentElement;
  week.classList.toggle("active");
}

// Toggle FAQ
function toggleFaq(question) {
  const faqItem = question.parentElement;
  faqItem.classList.toggle("active");
}

// Open preview modal
function openPreview() {
  const modal = document.getElementById("preview-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close preview modal
function closePreview() {
  const modal = document.getElementById("preview-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal on outside click
document.getElementById("preview-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "preview-modal") {
    closePreview();
  }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Share buttons
document.querySelectorAll(".share-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = window.location.href;
    const title = document.querySelector(".course-title").textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert("✅ Link đã được copy!");
    });
  });
});
