// Payment Page Handler
document.addEventListener("DOMContentLoaded", () => {
  // Get enrollment data from localStorage
  const enrollmentData = JSON.parse(
    localStorage.getItem("enrollmentData") || "{}"
  );
  const urlParams = new URLSearchParams(window.location.search);
  const courseName =
    urlParams.get("course") ||
    enrollmentData.courseName ||
    "21 ngày quản lý lo âu";
  const coursePrice =
    urlParams.get("price") || enrollmentData.coursePrice || "299.000₫";

  // Update order summary
  if (document.getElementById("order-course-title")) {
    document.getElementById("order-course-title").textContent = courseName;
  }
  if (document.getElementById("order-price")) {
    document.getElementById("order-price").textContent = coursePrice;
  }
  if (document.getElementById("total-price")) {
    document.getElementById("total-price").textContent = coursePrice;
  }
  if (document.getElementById("payment-amount")) {
    document.getElementById("payment-amount").textContent = coursePrice;
  }

  // Update user info
  if (enrollmentData.fullname && document.getElementById("user-name")) {
    document.getElementById("user-name").textContent = enrollmentData.fullname;
  }
  if (enrollmentData.email && document.getElementById("user-email")) {
    document.getElementById("user-email").textContent = enrollmentData.email;
  }
  if (enrollmentData.phone && document.getElementById("user-phone")) {
    document.getElementById("user-phone").textContent = enrollmentData.phone;
  }

  // Handle payment form submission
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const selectedMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;

      // Save order data
      const orderData = {
        ...enrollmentData,
        courseName: courseName,
        price: coursePrice,
        paymentMethod: selectedMethod,
        orderDate: new Date().toISOString(),
      };

      localStorage.setItem("orderData", JSON.stringify(orderData));

      // Simulate payment processing
      const btn = e.target.querySelector(".btn-payment");
      btn.textContent = "Đang xử lý...";
      btn.disabled = true;

      setTimeout(() => {
        // Redirect to confirmation page
        window.location.href = "order-confirmation.html";
      }, 1500);
    });
  }
});
