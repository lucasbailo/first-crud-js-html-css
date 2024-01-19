## Welcome again to my very first CRUD project! 👋

# Cost Control (Still in dev)

## Some code that I'm proud of
```js
function register(){
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html"
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    })
}
```

## Built with

- HTML;
- CSS custom properties;
- JavaScript;
- Sweat and tears 😫.

## Test the project yourself: [Teste the project here!!!](https://first-crud-js-html-css.vercel.app/)

### You can:

- Log in;
- Create your user;
- Change your password if you don't remember it;
- Check if all your information is correct!;
- There will be more features soon...

## Author

- Website - [My GitHub](https://github.com/lucasbailo)
- Frontend Mentor - [@lucasbailo](https://www.frontendmentor.io/profile/lucasbailo)
- Instagram - [@lucassbailo](https://www.instagram.com/lucassbailo/)
- LinkedIn - [Lucas Bailo](https://www.linkedin.com/in/lcsbailo)