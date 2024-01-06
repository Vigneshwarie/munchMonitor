
const loginbutton = document.querySelector('#loginbutton');

const checkLoginUser = async (event) => {
    event.preventDefault();
    const signinemail = document.querySelector('#emailsignin').value.trim();
    const signinpass = document.querySelector('#passsignin').value.trim();

    if (signinemail && signinpass) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({ signinemail, signinpass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to log in.');
        }
    }
};



if (loginbutton) {
    loginbutton.addEventListener('click', checkLoginUser);
}
