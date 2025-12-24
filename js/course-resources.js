// Course Resources JavaScript

// Download simulation with progress
function downloadFile(fileName) {
  const fileNames = {
    workbook: "Workbook-21-ngay-quan-ly-lo-au.pdf",
    checklist: "Checklist-hang-ngay.pdf",
    script: "Script-can-thiet-con-lo-au-cap.pdf",
    playlist: "Playlist-21-audio-thien.zip",
  };

  const fileSizes = {
    workbook: "8.5 MB",
    checklist: "1.2 MB",
    script: "0.8 MB",
    playlist: "156 MB",
  };

  const file = fileNames[fileName];
  const size = fileSizes[fileName];

  // Show download notification
  showNotification(`📥 Đang tải: ${file} (${size})`, "info");

  // Simulate download
  setTimeout(() => {
    showNotification(`✅ Đã tải xuống: ${file}`, "success");

    // Track download analytics
    trackDownload(fileName);
  }, 1500);
}

// Download week resources
function downloadWeek(weekNumber) {
  showNotification(`📥 Đang tải: Tài liệu Tuần ${weekNumber}...`, "info");

  setTimeout(() => {
    showNotification(`✅ Đã tải xuống: Tài liệu Tuần ${weekNumber}`, "success");
    trackDownload(`week-${weekNumber}`);
  }, 2000);
}

// Download week specific resource
function downloadWeekResource(week, resourceType) {
  const resourceNames = {
    workbook: `Workbook Tuần ${week}`,
    audio: `7 Audio thiền Tuần ${week}`,
    checklist: `Checklist Tuần ${week}`,
    breathing: "Hướng dẫn kỹ thuật thở 4-7-8",
    "journal-template": `Template Journaling Tuần ${week}`,
    mindfulness: "Hướng dẫn thiền Mindfulness",
    cbt: "Worksheet CBT",
    sleep: "Sleep Hygiene Checklist",
    routine: "Routine Builder Template",
  };

  const name = resourceNames[resourceType] || "Tài liệu";

  showNotification(`📥 Đang tải: ${name}...`, "info");

  setTimeout(() => {
    showNotification(`✅ Đã tải xuống: ${name}`, "success");
    trackDownload(`week${week}-${resourceType}`);
  }, 1000);
}

// Download additional resource
function downloadAdditional(resourceId) {
  const resources = {
    "emotion-tracker": "Bảng theo dõi cảm xúc",
    affirmations: "Danh sách affirmations",
    gratitude: "Gratitude Journal Template",
    triggers: "Trigger Identification Worksheet",
    progress: "Progress Report Template",
    reading: "Recommended Reading List",
  };

  const name = resources[resourceId];

  showNotification(`📥 Đang tải: ${name}...`, "info");

  setTimeout(() => {
    showNotification(`✅ Đã tải xuống: ${name}`, "success");
    trackDownload(`additional-${resourceId}`);
  }, 800);
}

// Download all resources
function downloadAllResources() {
  showNotification("📦 Đang chuẩn bị tải toàn bộ tài liệu (168 MB)...", "info");

  setTimeout(() => {
    showNotification("📥 Bắt đầu tải xuống...", "info");
  }, 1000);

  setTimeout(() => {
    showNotification("✅ Đã tải xuống toàn bộ tài liệu!", "success");
    trackDownload("all-resources");
  }, 4000);
}

// Preview file
function previewFile(fileName) {
  const previewUrls = {
    workbook: "https://mozilla.github.io/pdf.js/web/viewer.html",
    checklist: "https://mozilla.github.io/pdf.js/web/viewer.html",
    script: "https://mozilla.github.io/pdf.js/web/viewer.html",
  };

  const modal = document.getElementById("preview-modal");
  const iframe = document.getElementById("preview-iframe");

  iframe.src = previewUrls[fileName];
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close preview
function closePreview() {
  const modal = document.getElementById("preview-modal");
  const iframe = document.getElementById("preview-iframe");

  modal.classList.remove("active");
  iframe.src = "";
  document.body.style.overflow = "auto";
}

// Show playlist
function showPlaylist() {
  const modal = document.getElementById("playlist-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close playlist
function closePlaylist() {
  const modal = document.getElementById("playlist-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Download single audio
function downloadAudio(day) {
  showNotification(`📥 Đang tải: Audio Ngày ${day}...`, "info");

  setTimeout(() => {
    showNotification(`✅ Đã tải xuống: Audio Ngày ${day}`, "success");
    trackDownload(`audio-day-${day}`);
  }, 1000);
}

// Download all audio
function downloadAllAudio() {
  showNotification("📦 Đang chuẩn bị tải 21 audio files (156 MB)...", "info");

  setTimeout(() => {
    showNotification("📥 Bắt đầu tải xuống...", "info");
  }, 1000);

  setTimeout(() => {
    showNotification("✅ Đã tải xuống toàn bộ audio!", "success");
    trackDownload("all-audio");
  }, 3500);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  // Create notification
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

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
    .notification {
      position: fixed;
      top: 80px;
      right: 24px;
      padding: 16px 24px;
      background: rgba(34, 197, 94, 0.95);
      border: 1px solid var(--primary);
      border-radius: 12px;
      color: #022c22;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
    }

    .notification.info {
      background: rgba(59, 130, 246, 0.95);
      border-color: #3b82f6;
      color: #fff;
    }

    .notification.success {
      background: rgba(34, 197, 94, 0.95);
      border-color: var(--primary);
      color: #022c22;
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .notification button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
      transition: opacity 0.3s;
    }

    .notification button:hover {
      opacity: 1;
    }

    .notification button svg {
      color: currentColor;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  if (!document.querySelector("style[data-notification]")) {
    style.setAttribute("data-notification", "true");
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Track download analytics
function trackDownload(resourceId) {
  // Save to localStorage
  const downloads = JSON.parse(localStorage.getItem("downloads") || "{}");
  downloads[resourceId] = (downloads[resourceId] || 0) + 1;
  downloads[`${resourceId}_last`] = new Date().toISOString();
  localStorage.setItem("downloads", JSON.stringify(downloads));

  console.log("Downloaded:", resourceId);
}

// Play audio preview (optional enhancement)
document.querySelectorAll(".audio-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    // Don't trigger if clicking download button
    if (e.target.closest(".btn-download-audio")) return;

    const audioId = item.dataset.audio;
    const playButton = item.querySelector(".audio-play");

    // Visual feedback
    playButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      playButton.style.transform = "scale(1)";
    }, 200);

    // In real implementation, would play actual audio
    showNotification(`▶️ Đang phát: Audio Ngày ${audioId}`, "info");
  });
});

// Close modals on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePreview();
    closePlaylist();
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Course Resources page loaded");

  // Load download history
  const downloads = JSON.parse(localStorage.getItem("downloads") || "{}");
  console.log("Download history:", downloads);
});
