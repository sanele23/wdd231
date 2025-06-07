let currentDate = new Date();

function showCalendar(year, month) {
  let firstDayOfMonth = new Date(year, month - 1, 1);
  let lastDayOfMonth = new Date(year, month, 0);
  let firstWeekDay = firstDayOfMonth.getDay(); // Sunday is 0
  let daysInMonth = lastDayOfMonth.getDate();
  let day = 0;
  let result = "<tr>";
  let lastCell = firstWeekDay + daysInMonth;

  // Loop for up to 42 cells (6 rows of 7 days)
  for (let i = 1; i <= 42; i++) {
    if (i == firstWeekDay + 1) {
      day = 1;
    }
    if (i <= firstWeekDay || i >= lastCell) {
      // Empty cell
      result += "<td>&nbsp;</td>";
    } else {
      // Show the day
      if (
        day == currentDate.getDate() &&
        month == currentDate.getMonth() + 1 &&
        year == currentDate.getFullYear()
      )
        result += "<td class='today'>" + day + "</td>"; // Highlight today
      else
        result += "<td style='background-color: silver;'>" + day + "</td>"; // Regular day
      day++;
    }
    if (i % 7 == 0) {
      if (day > daysInMonth) break;
      result += "</tr><tr>\n";
    }
  }
  result += "</tr>";

  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate next month and year
  let nextMonth = month + 1;
  let nextYear = year;
  if (month + 1 > 12) {
    nextMonth = 1;
    nextYear = year + 1;
  }

  // Calculate previous month and year
  let prevMonth = month - 1;
  let prevYear = year;
  if (month - 1 < 1) {
    prevMonth = 12;
    prevYear = year - 1;
  }

  // Update caption and tbody content
  document
    .getElementById("calendar")
    .getElementsByTagName("caption")[0].innerHTML =
    "<div>" +
    months[month - 1] +
    " / " +
    year +
    "</div>" +
    "<div><a href='javascript:void(0)' onclick='showCalendar(" +
    prevYear +
    "," +
    prevMonth +
    ")'>&lt;</a> " +
    "<a href='javascript:void(0)' onclick='showCalendar(" +
    nextYear +
    "," +
    nextMonth +
    ")'>&gt;</a></div>";

  document
    .getElementById("calendar")
    .getElementsByTagName("tbody")[0].innerHTML = result;
}

// Initialize the calendar with the current month
showCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll(".lazy-image");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.classList.remove("lazy-image");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let currentImageIndex = 0;
  const article = document.querySelector("#article-02");

  // Ensure the article exists
  if (!article) {
    console.error("Article container not found in the DOM.");
    return;
  }

  // Dynamically create img and h3 elements and append them to the article
  const imageContainer = document.createElement("img");
  const descriptionContainer = document.createElement("h3");

  article.appendChild(imageContainer);
  article.appendChild(descriptionContainer);

  // Fetch images and descriptions from the JSON file
  fetch("data/discover.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((events) => {
      if (!events || events.length === 0) {
        console.error("No events found in the JSON file.");
        return;
      }

      // Function to update image and description
      function updateImage() {
        const event = events[currentImageIndex];
        imageContainer.src = `images/${event.image}`;
        imageContainer.alt = event.description; // Add alt attribute
        imageContainer.loading = "lazy"; // Add lazy loading
        descriptionContainer.textContent = event.description;

        // Move to the next image after 3 seconds
        currentImageIndex = (currentImageIndex + 1) % events.length;
      }

      // Initial load
      updateImage();

      // Update image every 10 seconds with animation
      setInterval(() => {
        imageContainer.classList.remove("fade-in");
        void imageContainer.offsetWidth; // Re-trigger CSS animation
        imageContainer.classList.add("fade-in");
        updateImage();
      }, 10000);
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll(".lazy-image");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.classList.remove("lazy-image");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
});