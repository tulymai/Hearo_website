// Student Profile JavaScript

let isEditing = false;

// Show tab
function showTab(event, tabName) {
  event.preventDefault();

  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active from all menu items
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Show selected tab
  const selectedTab = document.getElementById(`tab-${tabName}`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Add active to clicked menu item
  event.currentTarget.classList.add("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle edit mode
function toggleEdit() {
  isEditing = !isEditing;

  const inputs = document.querySelectorAll(
    ".profile-form input, .profile-form textarea"
  );
  const formActions = document.getElementById("formActions");
  const btnEdit = document.querySelector(".btn-edit");

  inputs.forEach((input) => {
    input.disabled = !isEditing;
  });

  if (isEditing) {
    formActions.style.display = "flex";
    btnEdit.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <span>Hủy</span>
    `;
  } else {
    formActions.style.display = "none";
    btnEdit.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      <span>Chỉnh sửa</span>
    `;
  }
}

// Cancel edit
function cancelEdit() {
  toggleEdit();
  // Reset form values from saved data
  loadUserData();
}

// Save profile
function saveProfile() {
  const userData = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    bio: document.getElementById("bio").value,
  };

  // Save to localStorage
  localStorage.setItem("userData", JSON.stringify(userData));

  // Show success notification
  showNotification("✅ Cập nhật thông tin thành công!", "success");

  // Exit edit mode
  toggleEdit();
}

// Load user data
function loadUserData() {
  const savedData = localStorage.getItem("userData");
  const orderData = localStorage.getItem("orderData");

  if (savedData) {
    const userData = JSON.parse(savedData);
    document.getElementById("fullname").value = userData.fullname || "";
    document.getElementById("email").value = userData.email || "";
    document.getElementById("phone").value = userData.phone || "";
    document.getElementById("dob").value = userData.dob || "";
    document.getElementById("address").value = userData.address || "";
    document.getElementById("bio").value = userData.bio || "";
  } else if (orderData) {
    // Load from order data
    const data = JSON.parse(orderData);
    document.getElementById("fullname").value = data.fullname || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("phone").value = data.phone || "";
  }
}

// Change avatar
function changeAvatar() {
  // Create file input
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("profileAvatar").src = event.target.result;
        localStorage.setItem("userAvatar", event.target.result);
        showNotification("✅ Đã cập nhật ảnh đại diện!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  input.click();
}

// Download certificate
function downloadCertificate(certId) {
  showNotification("📥 Đang tải chứng chỉ...", "info");

  setTimeout(() => {
    showNotification("✅ Đã tải chứng chỉ thành công!", "success");
  }, 1500);
}

// Share certificate
function shareCertificate(certId) {
  const url = `${window.location.origin}/certificate/${certId}`;

  if (navigator.share) {
    navigator.share({
      title: "Chứng chỉ của tôi",
      text: "Tôi vừa hoàn thành khóa học!",
      url: url,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showNotification("✅ Đã copy link chứng chỉ!", "success");
    });
  }
}

// Download invoice
function downloadInvoice(orderId) {
  showNotification(`📥 Đang tải hóa đơn ${orderId}...`, "info");

  setTimeout(() => {
    showNotification("✅ Đã tải hóa đơn thành công!", "success");
  }, 1000);
}

// Change password
function changePassword() {
  const currentPassword = document.querySelector(
    'input[placeholder="Nhập mật khẩu hiện tại"]'
  ).value;
  const newPassword = document.querySelector(
    'input[placeholder="Nhập mật khẩu mới"]'
  ).value;
  const confirmPassword = document.querySelector(
    'input[placeholder="Nhập lại mật khẩu mới"]'
  ).value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification("❌ Vui lòng điền đầy đủ thông tin", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification("❌ Mật khẩu xác nhận không khớp", "error");
    return;
  }

  if (newPassword.length < 8) {
    showNotification("❌ Mật khẩu phải có ít nhất 8 ký tự", "error");
    return;
  }

  // Simulate API call
  showNotification("🔄 Đang cập nhật mật khẩu...", "info");

  setTimeout(() => {
    showNotification("✅ Đã đổi mật khẩu thành công!", "success");
    // Clear inputs
    document
      .querySelectorAll('.settings-card input[type="password"]')
      .forEach((input) => {
        input.value = "";
      });
  }, 1500);
}

// Confirm delete account
function confirmDeleteAccount() {
  const confirmed = confirm(
    "Bạn có chắc chắn muốn xóa tài khoản?\n\n" +
      "Hành động này không thể hoàn tác và bạn sẽ mất:\n" +
      "- Tất cả khóa học đã mua\n" +
      "- Tiến độ học tập\n" +
      "- Chứng chỉ\n" +
      "- Lịch sử thanh toán"
  );

  if (confirmed) {
    const doubleConfirm = prompt('Nhập "DELETE" để xác nhận:');

    if (doubleConfirm === "DELETE") {
      showNotification("🔄 Đang xử lý...", "info");

      setTimeout(() => {
        showNotification("✅ Đã xóa tài khoản. Tạm biệt!", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }, 2000);
    }
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();

  // Load saved avatar
  const savedAvatar = localStorage.getItem("userAvatar");
  if (savedAvatar) {
    document.getElementById("profileAvatar").src = savedAvatar;
  }

  // Update progress from localStorage
  const progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
  console.log("Course progress:", progress);

  // 🔹 Gán sự kiện cho nút Đăng xuất
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (!confirmed) return;

      // Xoá dữ liệu đăng nhập
      localStorage.removeItem("userData");
      localStorage.removeItem("orderData");
      localStorage.removeItem("courseProgress");
      localStorage.removeItem("userAvatar");
      localStorage.removeItem("registeredUser");
      localStorage.removeItem("rememberMe");

      // Thông báo
      showNotification("✅ Đã đăng xuất. Hẹn gặp lại!", "success");

      // Chờ 1s rồi chuyển về trang chủ (hoặc login)
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }
});
