if (!isNewTransaction()) {
    const uid = getTransactionUid();
    findTransactionByUid(uid)
}

getTransactionUid();

function findTransactionByUid(uid) {
    showLoading();

    transactionService.findByUid(uid)
        .then(transaction => {
            hideLoading()
            if(transaction) {
                fillTransactionScreen(transaction)
                toggleSaveButtonDisable();
            } else {
                alert("Transaction not found")
                window.location.href = "../home/home.html"
            }
        })
        .catch(()=> {
            hideLoading();
            alert("Error recovering transaction");
            window.location.href = "../home/home.html";
        })
}

function fillTransactionScreen(transaction) {
    if (transaction.type == "expense") {
        form.typeExpense().checked = "true"
    } else {
        form.typeIncome().checked = "true"
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.amount().value = transaction.money.amount;
    form.transactionType().value = transaction.transactionType;

    if (transaction.description) {
        form.description().value = transaction.description;
    }

}

function getTransactionUid() {

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid')
}

function isNewTransaction(){
    return getTransactionUid() ? false : true;
}

function saveTransaction() {
    showLoading();

    const transaction = createTransaction()

    if(isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction)
    }

   
}

function update(transaction) {
    showLoading();

    transactionService.update(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "../home/home.html"
        })
        .catch(() => {
            hideLoading();
            alert('Transaction update error')
        })

}

function save(transaction) {
    transactionService.save(transaction)
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
    typeIncome: () => document.getElementById('income'),
    transactionType: () => document.getElementById('transaction-type'),
    description: () => document.getElementById('description'),
    transactionTypeRequiredError: () => document.getElementById('transaction-required-error'),
    saveButton: () => document.getElementById('save-button')
}