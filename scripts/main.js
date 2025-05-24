document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navMenu = document.querySelector("nav");
    hamButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `${document.lastModified}`;
});