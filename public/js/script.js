const signinemail = document.querySelector('#emailsignin').value;
const signinpass = document.querySelector('#passsignin').value;

const loginbutton = document.querySelector('#loginbutton');
const checkLoginUser = async (event) => {
    event.preventDefault();

    if (signinemail && signinpass) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ signinemail, signinpass }),
            headers: { 'Content=Type': 'application/json' },
        });
    }
}




    loginbutton.addEventListener('click', checkLoginUser)