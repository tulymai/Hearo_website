// Authentication JavaScript

// Toggle password visibility
function togglePassword() {
  const input = document.getElementById("password");
  const button = event.currentTarget;
  const icon = button.querySelector("svg");

  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML =
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = "password";
    icon.innerHTML =
      '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

function togglePasswordConfirm() {
  const input = document.getElementById("confirm-password");
  const button = event.currentTarget;
  const icon = button.querySelector("svg");

  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML =
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = "password";
    icon.innerHTML =
      '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}
// Handle Login
// Handle Login - UPDATED
function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector(".btn-submit");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  const existingMsg = form.querySelector(".auth-message");
  if (existingMsg) existingMsg.remove();

  setTimeout(() => {
    const savedUser = localStorage.getItem("registeredUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (user.email === email && user.password === password) {
        const userData = {
          fullname: user.fullname,
          email: user.email,
          loginDate: new Date().toISOString(),
        };

        // Save to localStorage FIRST
        localStorage.setItem("userData", JSON.stringify(userData));

        if (remember) {
          localStorage.setItem("rememberMe", "true");
        }

        console.log("✅ Login successful, userData saved:", userData);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent("userLoggedIn"));

        showMessage(
          form,
          "success",
          "✅ Đăng nhập thành công! Đang chuyển hướng..."
        );

        setTimeout(() => {
          window.location.href = "student-profile.html";
        }, 1500);
      } else {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        showMessage(form, "error", "❌ Email hoặc mật khẩu không đúng!");
      }
    } else {
      // Demo mode
      const demoUser = {
        fullname: "Học viên Demo",
        email: email,
        loginDate: new Date().toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(demoUser));

      console.log("✅ Demo login successful, userData saved:", demoUser);

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent("userLoggedIn"));

      showMessage(
        form,
        "success",
        "✅ Đăng nhập thành công! Đang chuyển hướng..."
      );

      setTimeout(() => {
        window.location.href = "student-profile.html";
      }, 1500);
    }
  }, 1500);
}

// Handle Register - UPDATED
function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector(".btn-submit");
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const terms = document.getElementById("terms").checked;

  const existingMsg = form.querySelector(".auth-message");
  if (existingMsg) existingMsg.remove();

  if (password !== confirmPassword) {
    showMessage(form, "error", "❌ Mật khẩu xác nhận không khớp!");
    return;
  }

  if (!terms) {
    showMessage(form, "error", "❌ Vui lòng đồng ý với điều khoản dịch vụ!");
    return;
  }

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  setTimeout(() => {
    const userData = {
      fullname: fullname,
      email: email,
      password: password,
      registeredDate: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        fullname: fullname,
        email: email,
        loginDate: new Date().toISOString(),
      })
    );

    console.log("✅ Registration successful, userData saved");

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent("userLoggedIn"));

    showMessage(form, "success", "✅ Đăng ký thành công! Đang chuyển hướng...");

    setTimeout(() => {
      window.location.href = "student-profile.html";
    }, 1500);
  }, 2000);
}

// Show message
function showMessage(form, type, message) {
  const existingMsg = form.querySelector(".auth-message");
  if (existingMsg) existingMsg.remove();

  const messageDiv = document.createElement("div");
  messageDiv.className = `auth-message ${type}`;
  messageDiv.textContent = message;

  form.insertBefore(messageDiv, form.firstChild);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Social Login
function loginWithGoogle() {
  // Simulate Google login
  const demoUser = {
    fullname: "Học viên Google",
    email: "google.user@gmail.com",
    loginDate: new Date().toISOString(),
    provider: "google",
  };

  localStorage.setItem("userData", JSON.stringify(demoUser));

  alert("✅ Đăng nhập Google thành công!");

  setTimeout(() => {
    window.location.href = "student-profile.html";
  }, 500);
}

function loginWithFacebook() {
  // Simulate Facebook login
  const demoUser = {
    fullname: "Học viên Facebook",
    email: "facebook.user@fb.com",
    loginDate: new Date().toISOString(),
    provider: "facebook",
  };

  localStorage.setItem("userData", JSON.stringify(demoUser));

  alert("✅ Đăng nhập Facebook thành công!");

  setTimeout(() => {
    window.location.href = "student-profile.html";
  }, 500);
}

function registerWithGoogle() {
  // Simulate Google register
  const userData = {
    fullname: "Học viên Google",
    email: "google.user@gmail.com",
    registeredDate: new Date().toISOString(),
    provider: "google",
  };

  localStorage.setItem("registeredUser", JSON.stringify(userData));
  localStorage.setItem(
    "userData",
    JSON.stringify({
      fullname: userData.fullname,
      email: userData.email,
      loginDate: new Date().toISOString(),
    })
  );

  alert("✅ Đăng ký Google thành công!");

  setTimeout(() => {
    window.location.href = "student-profile.html";
  }, 500);
}

function registerWithFacebook() {
  // Simulate Facebook register
  const userData = {
    fullname: "Học viên Facebook",
    email: "facebook.user@fb.com",
    registeredDate: new Date().toISOString(),
    provider: "facebook",
  };

  localStorage.setItem("registeredUser", JSON.stringify(userData));
  localStorage.setItem(
    "userData",
    JSON.stringify({
      fullname: userData.fullname,
      email: userData.email,
      loginDate: new Date().toISOString(),
    })
  );

  alert("✅ Đăng ký Facebook thành công!");

  setTimeout(() => {
    window.location.href = "student-profile.html";
  }, 500);
}

// Check if already logged in
document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("userData");

  if (
    userData &&
    (window.location.pathname.includes("login.html") ||
      window.location.pathname.includes("register.html"))
  ) {
    // Already logged in, redirect to profile
    const confirm = window.confirm(
      "Bạn đã đăng nhập rồi. Chuyển đến Trang cá nhân?"
    );
    if (confirm) {
      window.location.href = "student-profile.html";
    }
  }

  // Auto-fill email if remembered
  const rememberMe = localStorage.getItem("rememberMe");
  const savedUser = localStorage.getItem("registeredUser");

  if (
    rememberMe &&
    savedUser &&
    window.location.pathname.includes("login.html")
  ) {
    const user = JSON.parse(savedUser);
    const emailInput = document.getElementById("email");
    const rememberCheckbox = document.getElementById("remember");

    if (emailInput) emailInput.value = user.email;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }
});
