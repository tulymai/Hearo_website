// ========================================
// EPISODES PAGE FUNCTIONALITY
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const episodeCards = document.querySelectorAll(".episode-card");
  const resultsCount = document.getElementById("results-count");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter episodes
      let visibleCount = 0;
      episodeCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      // Update results count
      if (resultsCount) {
        resultsCount.textContent = `Hiển thị ${visibleCount} tập`;
      }
    });
  });

  // View Toggle (List/Grid)
  const viewButtons = document.querySelectorAll(".view-btn");
  const episodeList = document.querySelector(".episode-list");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const view = this.dataset.view;

      viewButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      if (view === "grid") {
        episodeList.classList.add("grid-view");
      } else {
        episodeList.classList.remove("grid-view");
      }
    });
  });

  // Audio Player Functionality
  const playerControls = document.querySelectorAll(".episode-player");

  playerControls.forEach((playerControl) => {
    const audio = playerControl.querySelector(".audio-element");
    const playBtn = playerControl.querySelector(".play-btn");
    const playIcon = playBtn.querySelector(".play-icon");
    const pauseIcon = playBtn.querySelector(".pause-icon");
    const progressBar = playerControl.querySelector(".progress-bar");
    const progressFill = playerControl.querySelector(".progress-fill");
    const timeDisplay = playerControl.querySelector(".time-display");

    // Play/Pause Toggle
    playBtn.addEventListener("click", function () {
      if (audio.paused) {
        // Pause all other audio
        document.querySelectorAll(".audio-element").forEach((a) => {
          if (a !== audio) a.pause();
        });
        document
          .querySelectorAll(".play-icon")
          .forEach((icon) => (icon.style.display = "block"));
        document
          .querySelectorAll(".pause-icon")
          .forEach((icon) => (icon.style.display = "none"));

        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      } else {
        audio.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });

    // Update Progress Bar
    audio.addEventListener("timeupdate", function () {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = progress + "%";

      // Update time display
      const currentMin = Math.floor(audio.currentTime / 60);
      const currentSec = Math.floor(audio.currentTime % 60);
      const durationMin = Math.floor(audio.duration / 60);
      const durationSec = Math.floor(audio.duration % 60);

      timeDisplay.textContent = `${currentMin}:${currentSec
        .toString()
        .padStart(2, "0")} / ${durationMin}:${durationSec
        .toString()
        .padStart(2, "0")}`;
    });

    // Click to Seek
    progressBar.addEventListener("click", function (e) {
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * audio.duration;
    });

    // Reset on End
    audio.addEventListener("ended", function () {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      progressFill.style.width = "0%";
    });
  });

  // Action Buttons
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.textContent.trim();
      const episodeTitle =
        this.closest(".episode-card").querySelector(
          ".episode-title"
        ).textContent;

      if (action.includes("Chia sẻ")) {
        alert(`📤 Chia sẻ: "${episodeTitle}"\n\nLink đã được copy!`);
      } else if (action.includes("Lưu")) {
        alert(
          `💾 Đã lưu: "${episodeTitle}"\n\nTập này đã được thêm vào danh sách của bạn!`
        );
      } else if (action.includes("Tải về")) {
        alert(`⬇️ Tải về: "${episodeTitle}"\n\nĐang chuẩn bị file...`);
      }
    });
  });

  // Subscribe Form
  window.handleSubscribe = function (e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(
      `✓ Đã đăng ký thành công!\n\nBạn sẽ nhận thông báo tập mới qua email: ${email}`
    );
    e.target.reset();
  };
});
