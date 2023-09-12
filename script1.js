const apiUrl = 'https://crudcrud.com/api/690e2dd1477543338ae748c89b7b9cd1/inventapp'; // Replace with your API endpoint




function fetchInventory() {
    axios.get(apiUrl)
        .then(response => {
            const inventoryList = document.getElementById('inventory-list');
            inventoryList.innerHTML = '';

            response.data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span id="item-name-${item._id}">${item.itemName}: <span id="item-quantity-${item._id}">${item.itemQuantity}</span></span>
                                      <button class="buy-button" onclick="buyItem('${item._id}',  ${item.itemQuantity})">Buy</button>
                                      <button class="delete-button" onclick="deleteItem('${item._id}')">Delete</button>`;
                inventoryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching inventory:', error);
        });
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && !isNaN(itemQuantity)) {
        const newItem = {
            itemName,
            itemQuantity
        };

        axios.post(apiUrl, newItem)
            .then(() => {
                document.getElementById('itemName').value = '';
                document.getElementById('itemQuantity').value = '';
                fetchInventory();
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    }
}

function buyItem(itemId, currentQuantity) {
    const newQuantity = currentQuantity - 1;

    if (newQuantity >= 0) {
        axios.put(`${apiUrl}/${itemId}`,  { itemQuantity: newQuantity })
            .then(() => {
                fetchInventory();
            })
            .catch(error => {
                console.error('Error updating item quantity:', error);
            });
    }
}

function deleteItem(itemId) {
    axios.delete(`${apiUrl}/${itemId}`)
        .then(() => {
            fetchInventory();
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
}

// Fetch inventory when the page loads
fetchInventory();
