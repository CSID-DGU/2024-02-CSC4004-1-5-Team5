// Sample data for checklist entries
const checklistData = [
    { location: "러시아 - 모스크바", dates: "2022.10.16 ~ 2022.10.24"},
    { location: "체코 - 프라하", dates: "2023.10.16 ~ 2023.10.21", image: "images/czech.jpg" },
    { location: "스위스 - 취리히", dates: "2023.10.21 ~ 2023.10.25", image: "images/switzerland.jpg" },
    { location: "미국 - 뉴욕", dates: "2024.07.02 ~ 2024.07.14", image: "images/usa.jpg" }
  ];
  
  // Function to render checklist items
  function renderChecklist() {
    const container = document.getElementById("checklistContainer");
  
    checklistData.forEach(item => {
      const card = document.createElement("div");
      card.className = "checklist-card";
      card.style.backgroundImage = `url('${item.image}')`;
  
      const location = document.createElement("p");
      location.textContent = item.location;
  
      const dates = document.createElement("span");
      dates.textContent = item.dates;
  
      card.appendChild(location);
      card.appendChild(dates);
      container.insertBefore(card, container.lastElementChild); // Insert before the "add" button
    });
  }
  
  // Load checklist items when the page loads
  document.addEventListener("DOMContentLoaded", renderChecklist);
  
