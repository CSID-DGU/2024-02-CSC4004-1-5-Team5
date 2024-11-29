
document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality for categories
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            const items = button.parentElement.nextElementSibling;
            if (items.classList.contains('hidden')) {
                items.classList.remove('hidden');
                button.textContent = '▲'; // Change icon
            } else {
                items.classList.add('hidden');
                button.textContent = '▼'; // Change icon
            }
        });
    });

    // Add new items to the checklist
    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.previousElementSibling;

            // Create input field and confirm button
            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-wrapper';

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = '새 항목을 입력하세요';
            inputField.className = 'new-item-input';

            const confirmButton = document.createElement('button');
            confirmButton.textContent = '확인';
            confirmButton.className = 'confirm-button';

            // Append input and button to the wrapper
            inputWrapper.appendChild(inputField);
            inputWrapper.appendChild(confirmButton);

            // Add the wrapper before the add button
            button.parentElement.insertBefore(inputWrapper, button);

            // Handle confirm button click
            confirmButton.addEventListener('click', () => {
                const newItem = inputField.value.trim();
                if (newItem) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<input type="checkbox"> ${newItem}`;
                    category.appendChild(listItem);
                }
                // Remove the input wrapper after adding the item
                inputWrapper.remove();
            });
        });
    });
});
