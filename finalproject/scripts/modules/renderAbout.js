import { aboutContent } from "./aboutData.js";

export function renderAbout(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  aboutContent.forEach((section) => {
    const sectionDiv = document.createElement("section");
    sectionDiv.className = "about-section";

    if (section.heading) {
      const h2 = document.createElement("h2");
      h2.textContent = section.heading;
      sectionDiv.appendChild(h2);
    }

    if (section.paragraph) {
      const p = document.createElement("p");
      p.textContent = section.paragraph;
      sectionDiv.appendChild(p);
    }

    if (section.list && Array.isArray(section.list)) {
      const ul = document.createElement("ul");
      section.list.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      sectionDiv.appendChild(ul);
    }

    container.appendChild(sectionDiv);
  });
}
