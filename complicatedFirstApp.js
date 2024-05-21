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
const radios = [...document.querySelectorAll(".query-inputs input")];
const queryError = document.querySelector(".query-container .error-text");
const consentError = document.querySelector(".consent-error-text");
const consentCheckbox = document.querySelector("#checkbox");
const successMessage = document.querySelector(".success-msg");
const submitBtn = document.getElementById("submit-btn");

let atLeastOneChecked = false;

//FUNCTIONS

const checkInputs = (input, error) => {
  if (input.value.trim() === "") {
    error.classList.add("active");
    input.style.borderColor = "red";
    return false;
  } else {
    error.classList.remove("active");
    input.style.borderColor = "hsl(186, 15%, 59%)";
    return true;
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
    emailError.classList.add("active");
    emailInput.style.borderColor = "red";
    return false;
  } else {
    emailError.classList.remove("active");
    emailInput.style.borderColor = "hsl(186, 15%, 59%)";
    return true;
  }
};

//this is the one giving me trouble!!

const checkQuery = () => {
  radios.forEach((radio) => {
    if (!atLeastOneChecked) {
      queryError.classList.add("active");
      return false;
    }
    //if (radio.type === "radio" && radio.checked) {
    //if (radio.checked) {
    // if (atLeastOneChecked) {
    //console.log(radio.value);
    //queryError.classList.remove("active");
    //radio.style.backgroundColor = "hsl(148, 38%, 91%)"; //this
    //only flashes for a second ??
    //return true;
    //}

    radio.addEventListener("click", () => {
      console.log("clicked");
      queryError.classList.remove("active");
      radio.style.backgroundColor = "hsl(148, 38%, 91%)"; //this
      //only flashes for a second ??
      return true;
    });
  });
  //return atLeastOneChecked;
};

const checkCheckBox = () => {
  if (!consentCheckbox.checked) {
    consentError.classList.add("active");
    return false;
  }
  consentCheckbox.addEventListener("click", () => {
    consentError.classList.remove("active");
    return true;
  });
};

//EVENT LISTENERS

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //but only if all the fields are correctly filled

  const fNameValid = checkInputs(fNameInput, fNameError);
  const lNameValid = checkInputs(lNameInput, lNameError);
  const emailValid = checkEmail();
  const radioValid = checkQuery();
  const textAreaValid = checkInputs(messageInput, messageError);
  const checkboxValid = checkCheckBox();

  if (
    fNameValid &&
    lNameValid &&
    emailValid &&
    textAreaValid &&
    checkboxValid &&
    radioValid
  ) {
    successMessage.classList.add("active");
    //and scroll to the top to see the message
    document
      .querySelector(".success-msg")
      .scrollIntoView({ behavior: "smooth" });
    //return true;
  }
});
//
