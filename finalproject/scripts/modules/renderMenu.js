import { menuItems } from "./menuData.js";

export function renderMenu(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  menuItems.forEach((item) => {
    const box = document.createElement("div");
    box.className = "box";

    const imgBox = document.createElement("div");
    imgBox.className = "imgBox";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.alt;
    imgBox.appendChild(img);

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    const desc = document.createElement("p");
    desc.textContent = item.description;
    textDiv.appendChild(h3);
    textDiv.appendChild(desc);

    box.appendChild(imgBox);
    box.appendChild(textDiv);
    container.appendChild(box);
  });
}
