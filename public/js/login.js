$( document ).ready(function() {
  
  async function formSubmit() {
    
    const response = await fetch("/user");
    const users = await response.json();
    let userNames = [];
    let passwords = [];

    users.forEach((user) => {
      userNames.push(user.userName);
      passwords.push(user.password);
    });
    
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password').value.trim(),
      };


      try {

        if( formDataObject.userName == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please Enter Your Username</div>`;
        } else if( formDataObject.password == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please Enter Your Password</div>`;
        } else if( !userNames.includes(formDataObject.userName) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Invalid User Name</div>`;
        } else if( !passwords.includes(formDataObject.password) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Invalid Password</div>`;
        } else {
          document.getElementById('error-message-wrap').innerHTML = "";
          window.location.href = "index.html";
        }






        console.log("Form submitted successfully:", formDataObject);
        // You can proceed with further actions like sending data to a server

      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message); // Display error message to the user
      }

  });
 }

  formSubmit();
  
});

