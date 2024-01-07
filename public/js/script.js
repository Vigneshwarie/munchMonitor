const loginbutton = document.querySelector('#loginbutton');
const signupbutton = document.querySelector('#signupbutton');
const saveProfileBtn = document.querySelector('#saveProfileBtn');


// Sign-in functionality
const checkLoginUser = async (event) => {
    event.preventDefault();
    const signinemail = document.querySelector('#emailsignin').value.trim();
    const signinpass = document.querySelector('#passsignin').value.trim();

    if (signinemail && signinpass) {
        const response = await fetch('/login', {
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

// Sign-up functionality
const registerSignUpUser = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#firstfield').value.trim();
    const lastName = document.querySelector('#lastfield').value.trim();
    const username = document.querySelector('#signupemail').value.trim();
    const password = document.querySelector('#signuppass').value.trim();
    const confpassword = document.querySelector('#signuppassconf').value.trim();

    if (firstName && lastName && username && comparePassword(password, confpassword)) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to log in.');
        }
    }
};


function comparePassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    } else {
        alert('Entered Password and Confirm Password does not match!');
        return false;
    }
}

const saveProfileHandler = async (event) => {
    event.preventDefault();

    const petName = document.querySelector('#petName').value.trim();
    const petType = document.querySelector('#petType').value;
    const petSex = document.querySelector('#petSex').value;
    const petNotes = document.querySelector('#petNotes').value.trim();
    const petOwner = 1;

    if (petName && petType && petSex && petNotes) {
        const response = await fetch('/profile', {
            method: 'POST',
            body: JSON.stringify({ petName, petType, petSex, petNotes, petOwner }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('homepage');
        } else {
            alert('Failed to Create the Profile info!');
        }
    }
};




if (loginbutton) {
    loginbutton.addEventListener('click', checkLoginUser);
}

if (signupbutton) {
    signupbutton.addEventListener('click', registerSignUpUser);
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', saveProfileHandler);
}
