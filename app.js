/*
Complete the form and see a success toast message upon successful submission
- Receive form validation messages if:
  - A required field has been missed
  - The email address is not formatted correctly
- Complete the form only using their keyboard
- Have inputs, error messages, and the success message announced on their screen reader
*/

//GLOBAL VARIABLES
const form = document.querySelector("form");
const fNameInput = document.querySelector(".f-name input");
const fNameError = document.querySelector(".f-name .error-text");
const lNameInput = document.querySelector(".l-name input");
const lNameError = document.querySelector(".l-name .error-text");
const emailInput = document.querySelector(".email input");
const emailError = document.querySelector(".email .error-text");
const messageInput = document.querySelector(".message textarea");
const messageError = document.querySelector(".message-container .error-text");
const queryType = document.querySelector(
  'form .query-container .query-inputs input[name="query"]:checked'
);
//remember to use different quote marks here
console.log(queryType); //this gives me null  !!! WHY?
const queryError = document.querySelector(".query-container .error-text");
const consentError = document.querySelector(".consent-error-text");
const consentCheckbox = document.querySelector("#checkbox");
const successMessage = document.querySelector(".success-msg");
const submitBtn = document.getElementById("submit-btn");

let isValid = true;

//FUNCTIONS

const checkInputs = (input, error) => {
  if (input.value.trim() === "") {
    isValid = false;
    error.classList.add("active");
    input.style.borderColor = "red";
  } else {
    error.classList.remove("active");
    input.style.borderColor = "hsl(186, 15%, 59%)";
  }
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

const checkEmail = () => {
  const email = emailInput.value.trim();
  if (email === "" || !isValidEmail(email)) {
    isValid = false;
    emailError.classList.add("active");
    emailInput.style.borderColor = "red";
  } else {
    emailError.classList.remove("active");
    emailInput.style.borderColor = "hsl(186, 15%, 59%)";
  }
};

//this is the one giving me trouble!! OR IS IT?
//b/c if I remove it from everywhere the success msg still
//does not appear

const checkQuery = () => {
  if (!queryType) {
    isValid = false;
    queryError.classList.add("active"); //this is working
  } else {
    queryError.classList.remove("active"); //this is not working!
  }
};

const checkCheckBox = () => {
  if (!consentCheckbox.checked) {
    // I get false if I do console.log(consentCheckbox.checked)
    isValid = false;
    consentError.classList.add("active");
  } else {
    //consentCheckbox.addEventListener("click", () => {
    consentError.classList.remove("active");
  }
};

//EVENT LISTENERS

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //but only if all the fields are correctly filled
  checkInputs(fNameInput, fNameError);
  checkInputs(lNameInput, lNameError);
  checkEmail();
  checkQuery();
  checkInputs(messageInput, messageError);
  checkCheckBox();

  //this sort of works b/c if I put !isValid - so is not valid I get the
  //success message BUT the form doesn't reset ??
  if (isValid) {
    successMessage.classList.add("active");
    //and scroll to the top to see the message
    successMessage.scrollIntoView({ behavior: "smooth" });
    form.reset(); //this is not working ??
  }
});

//EVEN with help from this video I still can't make it work :(
//https://www.youtube.com/watch?v=B8OOjAcOVFg
