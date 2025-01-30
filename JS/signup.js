$(document).ready(function () {
  // Handle patient signup form submission
  $("#patientSignupForm").submit(function (event) {
    event.preventDefault();

    // Check if password and confirm password match
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Here you could send an AJAX request to your backend if needed.
    // For demonstration, we'll just show a success message.
    alert("Patient registered successfully!");

    // Optional: redirect to login page or elsewhere
    // window.location.href = "login.html";
  });
});
