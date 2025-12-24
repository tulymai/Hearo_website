// Enrollment Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enrollment-form");

  if (form) {
    // Get course data from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const courseName = urlParams.get("course") || "21 ngày quản lý lo âu";
    const coursePrice = urlParams.get("price") || "299.000₫";

    // Update course info on page
    if (document.getElementById("course-title")) {
      document.getElementById("course-title").textContent = courseName;
    }
    if (document.getElementById("course-price")) {
      document.getElementById("course-price").textContent = coursePrice;
    }

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        reason: document.getElementById("reason").value,
        courseName: courseName,
        coursePrice: coursePrice,
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem("enrollmentData", JSON.stringify(formData));

      // Redirect to payment page
      window.location.href = `payment.html?course=${encodeURIComponent(
        courseName
      )}&price=${encodeURIComponent(coursePrice)}`;
    });
  }
});
