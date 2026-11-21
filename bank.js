
let balance = 50000;

let currentAction = "";

let transactions = [
    {
        description: "Opening Balance",
        amount: 50000,
        type: "credit",
        date: new Date().toLocaleDateString()
    }
];

// UPDATE BALANCE
function updateBalance() {
    document.getElementById("balance").textContent =
        "KSh " + balance.toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}

// SHOW TRANSACTION FORM
function showForm(action) {

    currentAction = action;

    const section =
        document.getElementById("transactionSection");

    const title = document.getElementById("formTitle");

    const recipient =
        document.getElementById("recipientField");

    section.style.display = "block";

    document.getElementById("message").textContent = "";

    if (action === "deposit") {
        title.textContent = "Deposit Money";
        recipient.hidden = true;
    }

    else if (action === "withdraw") {
        title.textContent = "Withdraw Money";
        recipient.hidden = true;
    }

    else if (action === "transfer") {
        title.textContent = "Transfer Money";
        recipient.hidden = false;
    }

    section.scrollIntoView({ behavior: "smooth" });
}

// PROCESS TRANSACTION
document.getElementById("transactionForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const amount = Number(
        document.getElementById("amount").value
    );

    const message = document.getElementById("message");

    if (!Number.isFinite(amount) || amount <= 0) {
        message.style.color = "red";
        message.textContent = "Enter a valid amount.";
        return;
    }

    if (currentAction === "deposit") {

        balance += amount;

        addTransaction(
            "Money Deposit",
            amount,
            "credit"
        );

        showMessage("Deposit completed successfully!", "green");
    }

    else if (currentAction === "withdraw") {

        if (amount > balance) {
            showMessage("Insufficient balance!", "red");
            return;
        }

        balance -= amount;

        addTransaction(
            "Money Withdrawal",
            amount,
            "debit"
        );

        showMessage("Withdrawal completed successfully!", "green");
    }

    else if (currentAction === "transfer") {

        const recipient = document
            .getElementById("recipient").value.trim();

        if (!/^\d{10}$/.test(recipient)) {
            showMessage(
                "Enter a valid 10-digit demo account number.",
                "red"
            );
            return;
        }

        if (amount > balance) {
            showMessage("Insufficient balance!", "red");
            return;
        }

        balance -= amount;

        addTransaction(
            "Transfer to " + recipient,
            amount,
            "debit"
        );

        showMessage("Demo transfer completed!", "green");
    }

    updateBalance();
    displayTransactions();

    this.reset();
});

// ADD TRANSACTION
function addTransaction(description, amount, type) {

    transactions.unshift({
        description: description,
        amount: amount,
        type: type,
        date: new Date().toLocaleDateString()
    });
}

// DISPLAY TRANSACTIONS
function displayTransactions() {

    const history =
        document.getElementById("transactionHistory");

    history.innerHTML = "";

    transactions.forEach(transaction => {

        const row = document.createElement("tr");

        const description = document.createElement("td");
        description.textContent = transaction.description;

        const date = document.createElement("td");
        date.textContent = transaction.date;

        const amount = document.createElement("td");
        amount.textContent =
            (transaction.type === "credit" ? "+" : "-") +
            " KSh " +
            transaction.amount.toLocaleString("en-KE");

        amount.className = transaction.type;

        const status = document.createElement("td");
        status.textContent = "Demo Recorded";

        row.append(description, date, amount, status);

        history.appendChild(row);
    });
}

// DISPLAY MESSAGE
function showMessage(text, color) {

    const message = document.getElementById("message");

    message.style.color = color;
    message.textContent = text;
}

// LOGOUT
function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to leave the banking demo?"
    );

    if (confirmLogout) {
        alert("You have exited the banking demonstration.");
    }
}

// INITIAL DISPLAY
updateBalance();
displayTransactions();
