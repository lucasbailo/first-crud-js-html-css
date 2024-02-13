function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Logout error")
    })
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user)
    }
})

function newTransaction() {
    window.location.href = "../transaction/transaction.html"
}


function findTransactions(user) {
    showLoading();
    transactionService.findByUser(user)
        .then(transactions => {
            hideLoading();
            addTransactionsToScreen(transactions)
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert("Error when recovering transactions")
        })
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions')

    transactions.forEach(transaction => {
        const li = createTransactionListItem(transaction)
        
        li.appendChild(createDeleteButton(transaction))

        li.appendChild(createParagraph(transaction.date));
        li.appendChild(createParagraph(transaction.money));
        li.appendChild(createParagraph(transaction.type))

        if (transaction.description) {
            li.appendChild(createParagraph(transaction.description));
        }

        orderedList.appendChild(li)
    });

}

function createParagraph(value) {
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
}

function createDeleteButton(transaction) {
    const delButton = document.createElement('button')
    delButton.innerHTML = 'Remove'
    delButton.classList.add('clear', 'danger')
    delButton.addEventListener('click', event => {
        event.stopPropagation();
        askRemoveTransaction(transaction)
    })
    return delButton;
}

function createTransactionListItem(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid
    li.addEventListener('click', () => {
        window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
    })
    return li;
}

function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Do you want to remove this transaction?')

    if (shouldRemove) {
        removeTransaction(transaction)
    }
}

function removeTransaction(transaction) {
    showLoading();

    transactionService.remove(transaction)
        .then(() => {
            hideLoading();
            document.getElementById(transaction.uid).remove();

        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Error removing transaction')
        })

}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
}

function formatMoney(money) {
    return `${money.currency} ${money.amount.toFixed(2)}`
}
