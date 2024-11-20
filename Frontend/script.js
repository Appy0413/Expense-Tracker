const apiUrl = "http://localhost:5000/expenses"; // Base URL for the API

// Function to fetch and display expenses
async function fetchExpenses() {
    const response = await fetch(apiUrl);
    const expenses = await response.json();
    const expenseList = document.getElementById("expenses");
    expenseList.innerHTML = ""; // Clear existing items

    expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.textContent = `${expense.name} - $${expense.amount} (${expense.category}) on ${expense.date}`;
        
        // Add a delete button for each expense
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => deleteExpense(expense.id);
        li.appendChild(deleteButton);

        expenseList.appendChild(li);
    });
}

// Function to add a new expense
document.getElementById("expense-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, category, date }),
    });

    if (response.ok) {
        fetchExpenses(); // Refresh the list
        this.reset(); // Clear the form
    } else {
        alert("Failed to add expense.");
    }
});

// Function to delete an expense
async function deleteExpense(id) {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
        fetchExpenses(); // Refresh the list
    } else {
        alert("Failed to delete expense.");
    }
}

// Initial fetch to display expenses
fetchExpenses();
