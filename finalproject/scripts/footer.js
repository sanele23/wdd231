// Set current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date (in a readable format)
const lastMod = new Date(document.lastModified);
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
document.getElementById("lastModified").textContent =
  "Last Modified: " + lastMod.toLocaleDateString("en-US", options);
