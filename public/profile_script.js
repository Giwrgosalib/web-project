"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editButton");
  const profileForm = document.getElementById("profileForm");
  const saveButton = document.getElementById("saveButton");

  
  editButton.addEventListener("click", () => {
    // Toggle the visibility of the form
    profileForm.style.display =
      profileForm.style.display === "none" ? "block" : "none";
  });

//handle the submit event
  saveButton.addEventListener("click", (event) => {
    event.preventDefault()
    // Validate the form
    if (!validateForm()){
      return;
    } else {
      // Submit the form
      profileForm.submit();
    }
  });
});

//handle the delete event of upcoming reservations
function confirmDelete(id) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    window.location.href = "profile/delete/" + id;
  } else {
    return;
  }
}

//email validation
function isEmail(email) {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}
//phone validation
function isPhone(phone) {
    let regex = /^[0-9]{10}$/;
    return regex.test(phone);
}
//match passwords
function matchPassword(password, passwordConfirm) {
    return password === passwordConfirm;}

//password validation
function validatePassword(password){
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
}

//validate the form
function validateForm() {
    let email = document.getElementById("emailInput").value;
    let phone = document.getElementById("phoneInput").value;
    let mobile= document.getElementById("mobileInput").value;
    let password = document.getElementById("passwordInput").value;
    let passwordConfirm = document.getElementById("passwordConfirmInput").value;
    let error = document.getElementById("error");
    let text;

    error.style.padding = "10px";

    if (!isEmail(email)) {
        text = "Please enter valid email";
        error.innerHTML = text;
        return false;
    }
    if (!isPhone(mobile)) {
        text = "Please enter valid mobile number";
        error.innerHTML = text;
        return false;
    }

    if (!isPhone(phone)) {
        text = "Please enter valid phone number";
        error.innerHTML = text;
        return false;
    }

    if (!validatePassword(password)) {
        text = "Please enter valid password";
        error.innerHTML = text;
        return false;
    }

    if (!matchPassword(password, passwordConfirm)) {
        text = "Passwords do not match";
        error.innerHTML = text;
        return false;
    }
    return true;
}

