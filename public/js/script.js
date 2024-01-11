const loginbutton = document.querySelector('#loginbutton');
const signupbutton = document.querySelector('#signupbutton');
const saveProfileBtn = document.querySelector('#saveProfileBtn');
const tablebodysection = document.querySelector('.tablebody');
const deletepetbutton = document.querySelectorAll('.deletepetbutton');
const feedschedulebutton = document.querySelectorAll('.feedschedulebutton');
const cancelprofilebutton = document.querySelector('#cancelProfileBtn');
const breakfastbtn = document.querySelector('.breakfastbtn');
const lunchbtn = document.querySelector('.lunchbtn');
const dinnerbtn = document.querySelector('.dinnerbtn');

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

// Function to compare password
function comparePassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    } else {
        alert('Entered Password and Confirm Password does not match!');
        return false;
    }
}

// Function to save the Pet Profile
const saveProfileHandler = async (event) => {
    event.preventDefault();

    const petName = document.querySelector('#petName').value.trim();
    const petType = document.querySelector('#petType').value;
    const petSex = document.querySelector('#petSex').value;
    const petNotes = document.querySelector('#petNotes').value.trim();
    
    if (petName && petType && petSex && petNotes) {
        const response = await fetch('/profile', {
            method: 'POST',
            body: JSON.stringify({ petName, petType, petSex, petNotes }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('homepage');
        } else {
            alert('Failed to Create the Profile info!');
        }
    }
};

// Loop to add delete event listener for all listed profile and delete functionality
for (let i = 0; i < deletepetbutton.length; i++) { 
    deletepetbutton[i].addEventListener("click", async function (event) { 
        event.preventDefault();
        var rowElement = event.currentTarget.parentElement.parentElement.parentElement;
        const petId = rowElement.getAttribute("id");

        const response = await fetch('/deletepet', {
            method: 'DELETE',
            body: JSON.stringify({ petId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Pet Id# ' + petId + ' is deleted');
            window.location.replace('homepage');
        }
    });
}; 

// Loop to add get the Pet id from all listed pet profile and navigate to the scheduler form
for (let i = 0; i < feedschedulebutton.length; i++) { 
    feedschedulebutton[i].addEventListener("click", async function (event) { 
        event.preventDefault();
        var rowElement = event.currentTarget.parentElement.parentElement.parentElement;
        const petId = rowElement.getAttribute("id");
         location.replace(`/scheduler${petId}`);
    });
}; 

// Function for Cancel button
function cancelbuttonfunction(event) {
    window.location.replace("homepage")
}

const savebreakfastfunction = async (event) => {
    event.preventDefault();
    const breakfastType = document.querySelector('input[name="breakfastfoodtype"]:checked').value;
    const userTitleElement = document.querySelector('.schedulerUserId');
    const userId = userTitleElement.getAttribute("id");
    const petTitleElement = document.querySelector('.schedulerPetId');
    const petId = petTitleElement.getAttribute("id");
    console.log("food type==", breakfastType);
    console.log("User==", userId);
    console.log("Pet===", petId);

    if (breakfastType && userId && petId) {
        const response = await fetch('/scheduler', {
            method: 'POST',
            body: JSON.stringify({ petId, breakfastType }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.replace(`/scheduler${petId}`);
        }
    } 
   
}

if (loginbutton) {
    loginbutton.addEventListener('click', checkLoginUser);
}

if (signupbutton) {
    signupbutton.addEventListener('click', registerSignUpUser);
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', saveProfileHandler);
}

if(cancelprofilebutton){
    cancelprofilebutton.addEventListener('click', cancelbuttonfunction)
};

if (breakfastbtn) {
    breakfastbtn.addEventListener('click', savebreakfastfunction);
}