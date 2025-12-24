/* ========================================
   COMPONENTS LOADER
   ======================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  setTimeout(() => {
    setActiveNavLink();
    initializeHeader();
    updateHeaderLoginState(); // THÊM: Cập nhật trạng thái đăng nhập
    initializeFooterForms();
  }, 100);
});

// Load components từ file HTML
async function loadComponents() {
  try {
    // Load header
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
      const headerResponse = await fetch("components/header.html");
      if (!headerResponse.ok) {
        throw new Error(`HTTP error! status: ${headerResponse.status}`);
      }
      const headerHTML = await headerResponse.text();
      headerPlaceholder.innerHTML = headerHTML;
      console.log("✅ Header loaded");
    }

    // Load footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      const footerResponse = await fetch("components/footer.html");
      if (!footerResponse.ok) {
        throw new Error(`HTTP error! status: ${footerResponse.status}`);
      }
      const footerHTML = await footerResponse.text();
      footerPlaceholder.innerHTML = footerHTML;
      console.log("✅ Footer loaded");
    }
  } catch (error) {
    console.error("❌ Error loading components:", error);
    showComponentError();
  }
}

// Show error if components fail to load
function showComponentError() {
  const body = document.body;
  const errorMsg = document.createElement("div");
  errorMsg.style.cssText =
    "position:fixed;top:0;left:0;right:0;background:#ef4444;color:#fff;padding:12px;text-align:center;z-index:9999;";
  errorMsg.textContent =
    "⚠️ Không thể load header/footer. Vui lòng refresh trang.";
  body.insertBefore(errorMsg, body.firstChild);
}

// Set active nav link dựa trên trang hiện tại
function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav a[data-page]");

  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
// Lấy tên trang hiện tại từ URL
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "").replace("/", "");
  return page || "index";
}

// Check & update header login state
function updateHeaderLoginState() {
  const userData = localStorage.getItem("userData");
  const orderData = localStorage.getItem("orderData");

  const avatarImg = document.getElementById("headerAvatarImg");
  const avatarLink = document.getElementById("headerAvatarLink");
  const authText = document.getElementById("headerAuthText");

  console.log("🔍 Checking login state...");
  console.log("userData:", userData);
  console.log("orderData:", orderData);

  const isLoggedIn = !!(userData || orderData);
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  if (isLoggedIn) {
    // ĐÃ ĐĂNG NHẬP
    const data = JSON.parse(userData || orderData || "{}");
    const savedAvatar = "https://i.pravatar.cc/80?img=5";
    const avatarSrc = savedAvatar || defaultAvatar;

    if (avatarImg) avatarImg.src = avatarSrc;
    if (avatarLink) avatarLink.href = "student-profile.html";
    if (authText) authText.style.display = "none";
  } else {
    // CHƯA ĐĂNG NHẬP
    if (avatarImg) avatarImg.src = defaultAvatar;
    if (avatarLink) avatarLink.href = "login.html";
    if (authText) authText.style.display = "flex";
  }
}

// Make function globally accessible (chỉ để 1 lần)
window.updateHeaderLoginState = updateHeaderLoginState;

// THÊM: Listen for storage changes
window.addEventListener("storage", (e) => {
  if (e.key === "userData" || e.key === "orderData") {
    console.log("🔄 Storage changed, updating header...");
    updateHeaderLoginState();
  }
});

// THÊM: Listen for custom login event
window.addEventListener("userLoggedIn", () => {
  console.log("🎉 User logged in event received");
  setTimeout(() => {
    updateHeaderLoginState();
  }, 100);
});

// Initialize header features sau khi load xong
function initializeHeader() {
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    // Mobile menu toggle
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Đóng menu khi click vào link
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Đóng menu khi click outside
    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
        mainNav.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  // THÊM: Initialize dropdown toggle
  const userAvatar = document.querySelector(".header-user-avatar");
  const userDropdown = document.getElementById("headerUserDropdown");

  if (userAvatar && userDropdown) {
    // Toggle dropdown
    userAvatar.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove("active");
      }
    });
  }

  initializeStickyHeader();
}

// Sticky header với scroll effects
function initializeStickyHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          header.classList.remove("scroll-up");
          header.classList.remove("scroll-down");
          ticking = false;
          return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scroll down - hide header
          header.classList.remove("scroll-up");
          header.classList.add("scroll-down");
        } else if (currentScroll < lastScroll) {
          // Scroll up - show header
          header.classList.remove("scroll-down");
          header.classList.add("scroll-up");
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });
}

// Initialize footer forms (newsletter)
function initializeFooterForms() {
  const footerNewsletterForm = document.querySelector(".footer-newsletter");

  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = footerNewsletterForm.querySelector(
        'input[type="email"]'
      );

      if (emailInput && emailInput.value) {
        // Show success message
        const successMsg = document.createElement("p");
        successMsg.className = "footer-note";
        successMsg.style.color = "#22c55e";
        successMsg.textContent = "✓ Đã đăng ký thành công!";

        footerNewsletterForm.appendChild(successMsg);
        emailInput.value = "";

        // Remove message after 3s
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  }
}

// THÊM: Handle logout from header
window.handleHeaderLogout = function (event) {
  event.preventDefault();

  const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất?");

  if (confirmed) {
    console.log("🚪 Logging out...");

    // Clear all user data
    localStorage.removeItem("userData");
    localStorage.removeItem("orderData");
    localStorage.removeItem("courseProgress");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("registeredUser");
    localStorage.removeItem("rememberMe");

    // Update UI
    updateHeaderLoginState();

    alert("✅ Đã đăng xuất thành công!");

    // Redirect to home
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  }
};

// THÊM: Toggle dropdown (make it globally accessible)
window.toggleHeaderUserDropdown = function (event) {
  event.stopPropagation();
  const dropdown = document.getElementById("headerUserDropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
  }
};

// Keyboard accessibility
document.addEventListener("keydown", (e) => {
  const mainNav = document.getElementById("mainNav");
  const hamburger = document.getElementById("hamburger");

  if (e.key === "Escape" && mainNav && mainNav.classList.contains("active")) {
    mainNav.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  // THÊM: Close dropdown on Escape
  const userDropdown = document.getElementById("headerUserDropdown");
  if (
    e.key === "Escape" &&
    userDropdown &&
    userDropdown.classList.contains("active")
  ) {
    userDropdown.classList.remove("active");
  }
});

// Console log for debugging
console.log("✅ Components.js loaded successfully");
