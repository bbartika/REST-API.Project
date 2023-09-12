document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inventory-form");
    const itemList = document.querySelector("#inventory-table tbody");

    // Create an empty inventory array to store items.
    const inventory = [];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const itemName = document.getElementById("item-name").value;
        const itemQuantity = parseInt(document.getElementById("item-quantity").value);

        if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
            addItemToInventory(itemName, itemQuantity);
            form.reset();
        }
    });

    function addItemToInventory(name, quantity) {
        // Check if the item already exists in the inventory.
        const existingItem = inventory.find(item => item.name === name);

        if (existingItem) {
            // If it exists, update the quantity by adding the new quantity.
            existingItem.quantity += quantity;
        } else {
            // If it doesn't exist, add it to the inventory.
            inventory.push({ name, quantity });
        }

        // Update the display with the current inventory items and quantities.
        updateInventoryDisplay();
    }

    function updateInventoryDisplay() {
        // Clear the current list of items.
        itemList.innerHTML = "";

        // Loop through the inventory and display each item and its quantity.
        inventory.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>
                    <button onclick="buyItem('${item.name}')">Buy</button>
                </td>
            `;
            itemList.appendChild(row);
        });
    }

    // Function to buy an item and update its quantity.
    window.buyItem = function (itemName) {
        const itemToBuy = inventory.find(item => item.name === itemName);

        if (itemToBuy && itemToBuy.quantity > 0) {
            itemToBuy.quantity--;
            updateInventoryDisplay();
        } else {
            alert("Item not available.");
        }
    };
});
