function logout() {
    firebase.auth().signOut().then(()=> {
        window.location.href = "../../index.html"
    }).catch(()=> {
        alert("Logout error")
    })
}