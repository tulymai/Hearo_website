/* ========================================
   MAIN SCRIPTS
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Form handling
  initializeForms();

  // Filter episodes (nếu có)
  initializeFilters();
});

/* ========================================
   FORM HANDLING
   ======================================== */

function initializeForms() {
  // Contact form
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(contactForm, "contact");
    });
  }

  // Story form
  const storyForm = document.querySelector(".story-form");
  if (storyForm) {
    storyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(storyForm, "story");
    });
  }

  // Newsletter form
  const newsletterForms = document.querySelectorAll(
    ".newsletter-form-inline, .newsletter-form"
  );
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(form, "newsletter");
    });
  });
}

function handleFormSubmit(form, type) {
  const formData = new FormData(form);

  // Hiển thị thông báo thành công (demo)
  const successMsg = document.createElement("div");
  successMsg.className = "form-message success";
  successMsg.textContent =
    type === "contact"
      ? "Cảm ơn! Chúng mình sẽ phản hồi sớm."
      : type === "story"
      ? "Câu chuyện của bạn đã được gửi! Cảm ơn bạn chia sẻ."
      : "Đã đăng ký! Kiểm tra email của bạn.";

  form.appendChild(successMsg);
  form.reset();

  // Ẩn thông báo sau 5 giây
  setTimeout(() => {
    successMsg.style.opacity = "0";
    setTimeout(() => successMsg.remove(), 300);
  }, 5000);
}

/* ========================================
   FILTER EPISODES
   ======================================== */

function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const episodes = document.querySelectorAll(".episode-card-full");

  if (filterBtns.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter episodes
      episodes.forEach((episode) => {
        const category = episode.dataset.category;

        if (filter === "all" || category === filter) {
          episode.style.display = "block";
          setTimeout(() => {
            episode.style.opacity = "1";
          }, 10);
        } else {
          episode.style.opacity = "0";
          episode.style.display = "none";
        }
      });
    });
  });
}

/* ========================================
   SMOOTH SCROLL ANCHOR LINKS
   ======================================== */

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

/* ========================================
   PAGE LOAD ANIMATIONS
   ======================================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Log để debug
console.log("✅ Script.js loaded successfully");
console.log("📱 Device width:", window.innerWidth);
