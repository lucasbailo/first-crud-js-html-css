function saveTransaction() {
    showLoading();

    const transaction = createTransaction()

    firebase.firestore()
        .collection('transactions')
        .add(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "../home/home.html"
        })
        .catch(() => {
            hideLoading();
            alert("Transaction saving error")
        })
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            amount: parseFloat(form.amount().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }

}

function onchangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable()
}

function onChangeAmount() {
    const amount = form.amount().value
    form.amountRequiredError().style.display = !amount ? "block" : "none";

    form.amountNegativeOrZeroError().style.display = amount <= 0 ? "block" : "none";

    toggleSaveButtonDisable()
}

function onChangeTransactionType() {
    const transactionType = form.transactionType().value
    form.transactionTypeRequiredError().style.display = !transactionType ? "block" : "none"

    toggleSaveButtonDisable()

}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value
    if (!date) {
        return false;
    }

    const amount = form.amount().value
    if (!amount || amount <= 0) {
        return false;
    }

    const transactionType = form.transactionType().value
    if (!transactionType) {
        return false;
    }

    return true;
    
}

const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    amount: () => document.getElementById('amount'),
    currency: () => document.getElementById('currency'),
    amountRequiredError: () => document.getElementById('amount-required-error'),
    amountNegativeOrZeroError: () => document.getElementById('amount-negative-or-zero-error'),
    typeExpense: () => document.getElementById('expense'),
    transactionType: () => document.getElementById('transaction-type'),
    description: () => document.getElementById('description'),
    transactionTypeRequiredError: () => document.getElementById('transaction-required-error'),
    saveButton: () => document.getElementById('save-button')
}