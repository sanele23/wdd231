document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeModal");
  const modalText = document.getElementById("modalText");

  // Error spans
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Email regex for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function
  function validateForm(data) {
    let valid = true;

    // Name
    if (!data.name.trim()) {
      nameError.textContent = "Name is required.";
      valid = false;
    } else if (data.name.length > 50) {
      nameError.textContent = "Name must be 50 characters or less.";
      valid = false;
    } else {
      nameError.textContent = "";
    }

    // Email
    if (!data.email.trim()) {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!emailPattern.test(data.email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else if (data.email.length > 100) {
      emailError.textContent = "Email must be 100 characters or less.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Subject
    if (!data.subject.trim()) {
      subjectError.textContent = "Subject is required.";
      valid = false;
    } else if (data.subject.length > 100) {
      subjectError.textContent = "Subject must be 100 characters or less.";
      valid = false;
    } else {
      subjectError.textContent = "";
    }

    // Message
    if (!data.message.trim()) {
      messageError.textContent = "Message is required.";
      valid = false;
    } else if (data.message.length > 1000) {
      messageError.textContent = "Message must be 1000 characters or less.";
      valid = false;
    } else {
      messageError.textContent = "";
    }

    return valid;
  }

  // Show modal function
  function showModal(
    msg = "Your message has been sent. We appreciate your feedback and will respond as soon as possible."
  ) {
    modalText.textContent = msg;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  }

  // Hide modal function
  function hideModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  // Form submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    // Validate form
    if (!validateForm(data)) return;

    // Reset form fields
    form.reset();

    // Show the modal
    showModal();
  });

  // Close modal events
  closeBtn.addEventListener("click", hideModal);
  closeBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      hideModal();
    }
  });

  // Close modal clicking outside modal-content
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Accessibility: trap focus inside modal when open
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      const focusable = modal.querySelectorAll(
        "button, [tabindex]:not([tabindex='-1'])"
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
    if (e.key === "Escape") {
      hideModal();
    }
  });
});
