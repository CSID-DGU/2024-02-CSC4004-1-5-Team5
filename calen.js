document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#date-picker", {
        mode: "range", // Enables range selection mode
        inline: true,  // Keeps the calendar visible at all times
        dateFormat: "Y.m.d", // Specifies the date format
        onChange: function(selectedDates, dateStr, instance) {
            const buttonContainer = document.getElementById("button-container");

            // Check if both departure and arrival dates are selected
            if (selectedDates.length === 2) {
                // Create the "Create Checklist" button if it doesn't exist
                if (!document.getElementById("create-checklist-btn")) {
                    const button = document.createElement("button");
                    button.id = "create-checklist-btn";
                    button.textContent = "체크리스트 생성";
                    button.className = "create-checklist-button";
                    
                    // Optional: Add an event listener for the button
                    button.addEventListener("click", function () {
                        alert("Checklist created for: " + selectedDates[0].toLocaleDateString() + " to " + selectedDates[1].toLocaleDateString());
                        // Add any additional logic for the checklist creation here
                    });

                    // Append the button to the button container
                    buttonContainer.appendChild(button);
                }
            } else {
                // Remove the button if the range is incomplete
                const existingButton = document.getElementById("create-checklist-btn");
                if (existingButton) {
                    existingButton.remove();
                }
            }
        }
    });
});
