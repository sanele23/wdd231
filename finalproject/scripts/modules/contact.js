// Handles contact form submission and localStorage draft save/load with visible validation

document.addEventListener("DOMContentLoaded", () => {
  // Restore draft if available
  const draft = JSON.parse(localStorage.getItem("contactDraft") || "{}");
  if (draft.name) document.getElementById("name").value = draft.name;
  if (draft.email) document.getElementById("email").value = draft.email;
  if (draft.subject) document.getElementById("subject").value = draft.subject;
  if (draft.message) document.getElementById("message").value = draft.message;

  // Save draft on input
  ["name", "email", "subject", "message"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      localStorage.setItem(
        "contactDraft",
        JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
        })
      );
    });
  });

  // Create or select a place for error messages
  let formError = document.getElementById("formError");
  if (!formError) {
    formError = document.createElement("div");
    formError.id = "formError";
    formError.style.color = "red";
    formError.style.marginBottom = "1em";
    const form = document.getElementById("contactForm");
    form.prepend(formError);
  }

  // Add per-field error spans if missing
  ["name", "email", "subject", "message"].forEach((id) => {
    let errId = id + "Error";
    if (!document.getElementById(errId)) {
      const el = document.getElementById(id);
      const err = document.createElement("span");
      err.id = errId;
      err.style.color = "red";
      err.style.display = "block";
      err.style.fontSize = "0.9em";
      err.style.marginTop = "0.25em";
      el.parentNode.appendChild(err);
    }
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear previous errors
      formError.textContent = "";
      ["nameError", "emailError", "subjectError", "messageError"].forEach(
        (id) => (document.getElementById(id).textContent = "")
      );

      // Validate fields
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      let hasError = false;
      if (!name) {
        document.getElementById("nameError").textContent =
          "Please enter your name.";
        hasError = true;
      }
      if (!email) {
        document.getElementById("emailError").textContent =
          "Please enter your email.";
        hasError = true;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").textContent =
          "Please enter a valid email.";
        hasError = true;
      }
      if (!subject) {
        document.getElementById("subjectError").textContent =
          "Please enter a subject.";
        hasError = true;
      }
      if (!message) {
        document.getElementById("messageError").textContent =
          "Please enter your message.";
        hasError = true;
      }

      if (hasError) {
        formError.textContent = "Please fix the errors below and try again.";
        // Optionally focus first error field
        const firstError = ["name", "email", "subject", "message"].find(
          (id) => document.getElementById(id + "Error").textContent
        );
        if (firstError) document.getElementById(firstError).focus();
        return;
      }

      // Save to localStorage as "last submitted"
      localStorage.setItem(
        "contactLastSubmitted",
        JSON.stringify({ name, email, subject, message })
      );
      // Clear the draft
      localStorage.removeItem("contactDraft");

      // Redirect to the form-action page with values as URL params
      const params = new URLSearchParams({ name, email, subject, message });
      window.location.href = `form-action.html?${params}`;
    });
});
