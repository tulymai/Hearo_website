// ========================================
// LESSON VIEWER - Hearo Course Player
// ========================================

let currentLesson = 1;
const totalLessons = 21;

// 🎥 VIDEO MAPPING - Real YouTube videos về quản lý lo âu & mindfulness
const lessonVideos = {
  // Tuần 1: Hiểu về lo âu
  1: "u_Yy2dFCvrc", // Lo âu là gì? - Rối loạn lo âu vì đâu nên nỗi
  2: "C4OVuen7v4E", // Nhận diện triệu chứng - Bệnh rối loạn lo âu từ đâu ra
  3: "Q6ZHk3ij1P8", // Chu trình lo âu - 3 cách đơn giản vượt qua lo lắng
  4: "3-72jcwNi80", // Kỹ thuật thở 4-7-8 - Breathing Exercises for Anxiety
  5: "3-72jcwNi80", // Grounding 5-4-3-2-1 - Breathing Exercises (phần 2)
  6: "kpRdrJBVkt4", // Journaling - Cách chữa rối loạn lo âu hiệu quả
  7: "9T5kI0FnFE4", // Ôn tập tuần 1 - Cách vượt qua lo âu, căng thẳng

  // Tuần 2: Công cụ quản lý
  8: "Epzzn5_O7xM", // Progressive Muscle Relaxation - Quản lý lo âu trong thi cử
  9: "f7_8x2thRfY", // Body scan meditation - 15-Min Meditation Vietnamese
  10: "3-72jcwNi80", // Box breathing - Breathing Exercises (phần Box breathing)
  11: "Q6ZHk3ij1P8", // Tư duy xoay chuyển - Vượt qua lo lắng bất an
  12: "kpRdrJBVkt4", // Exposure therapy cơ bản - Thiền Chánh niệm
  13: "u_Yy2dFCvrc", // Self-compassion - Rối loạn lo âu và tự thương
  14: "9T5kI0FnFE4", // Ôn tập tuần 2 - Tổng hợp kỹ thuật

  // Tuần 3: Xây dựng thói quen
  15: "f7_8x2thRfY", // Morning routine - Thiền buổi sáng
  16: "3-72jcwNi80", // Evening wind-down - Thở để thư giãn
  17: "Epzzn5_O7xM", // Dealing with triggers - Quản lý stress
  18: "Q6ZHk3ij1P8", // Building resilience - Xây dựng khả năng phục hồi
  19: "kpRdrJBVkt4", // Support system - Hệ thống hỗ trợ
  20: "C4OVuen7v4E", // Preventing relapse - Phòng ngừa tái phát
  21: "u_Yy2dFCvrc", // Graduation & Next steps - Tổng kết khóa học
};

// 📝 Lesson titles để hiển thị
const lessonTitles = {
  1: "Lo âu là gì?",
  2: "Nhận diện triệu chứng",
  3: "Chu trình lo âu",
  4: "Kỹ thuật thở 4-7-8",
  5: "Grounding 5-4-3-2-1",
  6: "Journaling",
  7: "Ôn tập tuần 1 & Kế hoạch hành động",
  8: "Progressive Muscle Relaxation",
  9: "Body scan meditation",
  10: "Box breathing",
  11: "Tư duy xoay chuyển",
  12: "Exposure therapy cơ bản",
  13: "Self-compassion",
  14: "Ôn tập tuần 2",
  15: "Morning routine",
  16: "Evening wind-down",
  17: "Dealing with triggers",
  18: "Building resilience",
  19: "Support system",
  20: "Preventing relapse",
  21: "Graduation & Next steps",
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Lesson Viewer initialized");

  // Get lesson number from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lessonParam = urlParams.get("lesson");

  if (lessonParam) {
    currentLesson = parseInt(lessonParam);
    if (currentLesson < 1) currentLesson = 1;
    if (currentLesson > totalLessons) currentLesson = totalLessons;
  }

  // Load lesson data
  loadLesson(currentLesson);

  // Save progress
  saveProgress();

  // Load saved notes
  loadSavedNotes();

  // Check if lesson is completed
  checkCompletionStatus();
});

// ========================================
// LOAD LESSON
// ========================================
function loadLesson(lessonNum) {
  console.log(`📚 Loading lesson ${lessonNum}...`);

  // Update page title
  const lessonTitle = lessonTitles[lessonNum] || `Bài ${lessonNum}`;
  document.title = `Ngày ${lessonNum}: ${lessonTitle} - Hearo`;

  // Update lesson title in header (if element exists)
  const titleElement = document.querySelector(".lesson-header h1");
  if (titleElement) {
    titleElement.textContent = `Ngày ${lessonNum}: ${lessonTitle}`;
  }

  // Update progress indicator
  const percent = Math.round((lessonNum / totalLessons) * 100);
  document.querySelectorAll(".mini-fill").forEach((el) => {
    el.style.width = percent + "%";
  });

  // Update progress text
  document.querySelectorAll(".mini-progress-text").forEach((el) => {
    el.textContent = `${lessonNum}/${totalLessons} bài`;
  });

  // 🎥 Load video
  loadVideo(lessonNum);

  // Enable/disable navigation buttons
  updateNavButtons();
}

// ========================================
// LOAD VIDEO
// ========================================
function loadVideo(lessonNum) {
  const videoId = lessonVideos[lessonNum];

  if (!videoId) {
    console.error(`❌ No video found for lesson ${lessonNum}`);
    showVideoError();
    return;
  }

  // Find video iframe
  const iframe = document.getElementById("lessonVideo");

  if (!iframe) {
    console.error("❌ Video iframe #lessonVideo not found in HTML");
    return;
  }

  // Create YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;

  // Load video
  iframe.src = embedUrl;

  console.log(`✅ Loaded video: ${videoId} for lesson ${lessonNum}`);
}

// Show error if video not available
function showVideoError() {
  const videoContainer = document.querySelector(".video-container");
  if (videoContainer) {
    videoContainer.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;background:rgba(239,68,68,0.1);border-radius:12px;color:#ef4444;">
        <div style="text-align:center;padding:40px;">
          <svg width="48" height="48" fill="currentColor" style="margin-bottom:16px;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <p style="font-size:1.1rem;font-weight:600;">Video không khả dụng</p>
          <p style="font-size:0.9rem;opacity:0.7;margin-top:8px;">Vui lòng thử lại sau</p>
        </div>
      </div>
    `;
  }
}

// ========================================
// NAVIGATION
// ========================================
function toggleSidebar() {
  const sidebar = document.querySelector(".lesson-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("collapsed");
  }
}

function prevLesson() {
  if (currentLesson > 1) {
    window.location.href = `lesson-viewer.html?lesson=${currentLesson - 1}`;
  }
}

function nextLesson() {
  if (currentLesson < totalLessons) {
    window.location.href = `lesson-viewer.html?lesson=${currentLesson + 1}`;
  }
}

function updateNavButtons() {
  const prevBtn = document.querySelector(".btn-prev-lesson");
  const nextBtn = document.querySelector(".btn-next-lesson");

  if (prevBtn) {
    prevBtn.disabled = currentLesson <= 1;
    prevBtn.style.opacity = currentLesson <= 1 ? "0.5" : "1";
    prevBtn.style.cursor = currentLesson <= 1 ? "not-allowed" : "pointer";
  }

  if (nextBtn) {
    nextBtn.disabled = currentLesson >= totalLessons;
    nextBtn.style.opacity = currentLesson >= totalLessons ? "0.5" : "1";
    nextBtn.style.cursor =
      currentLesson >= totalLessons ? "not-allowed" : "pointer";
  }
}

// ========================================
// TABS
// ========================================
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  const selectedTab = document.getElementById(`tab-${tabName}`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Add active class to clicked button
  if (event && event.target) {
    event.target.classList.add("active");
  }
}

// ========================================
// MARK COMPLETE
// ========================================
function markComplete() {
  const btn = document.querySelector(".btn-mark-complete");

  if (!btn) return;

  // Update button UI
  btn.innerHTML = `
    <svg width="20" height="20" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    Đã hoàn thành!
  `;
  btn.style.background = "rgba(34, 197, 94, 0.2)";
  btn.style.color = "var(--primary)";
  btn.disabled = true;

  // Save to localStorage
  const completedLessons = JSON.parse(
    localStorage.getItem("completedLessons") || "[]"
  );

  if (!completedLessons.includes(currentLesson)) {
    completedLessons.push(currentLesson);
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    console.log(`✅ Marked lesson ${currentLesson} as complete`);
  }

  // Update course progress
  updateCourseProgress();

  // Show notification
  showNotification("🎉 Chúc mừng! Bạn đã hoàn thành bài học này.");

  // Auto-advance to next lesson after 2 seconds
  setTimeout(() => {
    if (currentLesson < totalLessons) {
      const goNext = confirm("Chuyển sang bài tiếp theo?");
      if (goNext) {
        nextLesson();
      }
    } else {
      showNotification("🎓 Bạn đã hoàn thành toàn bộ khóa học! Xuất sắc!");
    }
  }, 2000);
}

// Check if current lesson is already completed
function checkCompletionStatus() {
  const completedLessons = JSON.parse(
    localStorage.getItem("completedLessons") || "[]"
  );

  if (completedLessons.includes(currentLesson)) {
    const btn = document.querySelector(".btn-mark-complete");
    if (btn) {
      btn.innerHTML = `
        <svg width="20" height="20" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        Đã hoàn thành
      `;
      btn.style.background = "rgba(34, 197, 94, 0.2)";
      btn.style.color = "var(--primary)";
      btn.disabled = true;
    }
  }
}

// ========================================
// SAVE PROGRESS
// ========================================
function saveProgress() {
  const progress = {
    currentLesson: currentLesson,
    lastAccessed: new Date().toISOString(),
    totalCompleted: getCompletedCount(),
    percentComplete: Math.round((getCompletedCount() / totalLessons) * 100),
  };

  localStorage.setItem("courseProgress", JSON.stringify(progress));
  console.log("💾 Progress saved:", progress);
}

function updateCourseProgress() {
  const progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
  progress.totalCompleted = getCompletedCount();
  progress.percentComplete = Math.round(
    (getCompletedCount() / totalLessons) * 100
  );
  localStorage.setItem("courseProgress", JSON.stringify(progress));
}

function getCompletedCount() {
  const completedLessons = JSON.parse(
    localStorage.getItem("completedLessons") || "[]"
  );
  return completedLessons.length;
}

// ========================================
// NOTES
// ========================================
// Save notes
document.querySelector(".btn-save-notes")?.addEventListener("click", () => {
  const notes = document.querySelector(".notes-textarea")?.value;
  if (notes !== undefined) {
    localStorage.setItem(`lesson_${currentLesson}_notes`, notes);
    showNotification("✅ Ghi chú đã được lưu!");
  }
});

// Load saved notes
function loadSavedNotes() {
  const savedNotes = localStorage.getItem(`lesson_${currentLesson}_notes`);
  const notesTextarea = document.querySelector(".notes-textarea");

  if (savedNotes && notesTextarea) {
    notesTextarea.value = savedNotes;
  }
}

// ========================================
// ASK QUESTION
// ========================================
document.querySelector(".btn-ask")?.addEventListener("click", () => {
  const question = document.querySelector(".ask-question textarea")?.value;

  if (question && question.trim()) {
    showNotification(
      "✅ Câu hỏi đã được gửi! Giảng viên sẽ trả lời trong 24-48 giờ."
    );

    // Clear textarea
    const textarea = document.querySelector(".ask-question textarea");
    if (textarea) textarea.value = "";

    // Save question to localStorage (optional)
    const questions = JSON.parse(localStorage.getItem("userQuestions") || "[]");
    questions.push({
      lesson: currentLesson,
      question: question,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("userQuestions", JSON.stringify(questions));
  } else {
    showNotification("⚠️ Vui lòng nhập câu hỏi của bạn");
  }
});

// ========================================
// NOTIFICATION
// ========================================
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector(".lesson-notification");
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement("div");
  notification.className = "lesson-notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 32px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: #022c22;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
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
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// MAKE FUNCTIONS GLOBAL
// ========================================
window.toggleSidebar = toggleSidebar;
window.showTab = showTab;
window.prevLesson = prevLesson;
window.nextLesson = nextLesson;
window.markComplete = markComplete;

console.log("✅ Lesson Viewer ready!");
