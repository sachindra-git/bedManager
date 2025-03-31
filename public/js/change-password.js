$( document ).ready(function() {
  
  async function formSubmit() {
    
    const response = await fetch("/user");
    const users = await response.json();
    let currentPassword;
    let userID;
    
    function decodeBase64(encodedText) {
        return atob(encodedText); // Decode from Base64
    }
    
    const currentUser = decodeBase64(sessionStorage.getItem("loggedInUser"));

    users.forEach((user) => {
      if( currentUser == user.userName ) {
        currentPassword = user.password;
        userID = user._id;
      }
      console.log(user._id, 'useruseruser')
    });
    
    
 
    document.getElementById('changePassword').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        currentPassword: document.getElementById('currrentPassword').value.trim(),
        newPassword: document.getElementById('newPassword').value.trim(),
        RenewPassword: document.getElementById('RenewPassword').value.trim(),
      };
      
      const sendingFormDataObject = {
        id: userID,
        password: document.getElementById('newPassword').value.trim(),
      };
      
        if( formDataObject.currentPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter Current Password</div>`;
        } else if( formDataObject.newPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter new Password</div>`;
        } else if( formDataObject.RenewPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please retype new Password</div>`;
        } else if( formDataObject.currentPassword != currentPassword ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter correct Password</div>`;
        } else if( formDataObject.newPassword != '' ) {
          const minLength = 8;
          const hasUpperCase = /[A-Z]/.test(formDataObject.newPassword);
          const hasLowerCase = /[a-z]/.test(formDataObject.newPassword);
          const hasNumber = /[0-9]/.test(formDataObject.newPassword);
          const hasSpecialChar = /[@$!%*?&#]/.test(formDataObject.newPassword);

          if (formDataObject.newPassword.length < minLength) {
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must be at least 8 characters long.</div>`;
          } else if (!hasUpperCase) {
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one uppercase letter.</div>`;
          } else if (!hasLowerCase) {
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one lowercase letter.</div>`;
          } else if (!hasNumber) {
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one number.</div>`;
          } else if (!hasSpecialChar) {
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one special character (@, $, !, %, etc.).</div>`;
          } else {
            document.getElementById('error-message-wrap').innerHTML = "";
          }
        } else if( formDataObject.newPassword != formDataObject.RenewPassword ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">New Pasword did not match</div>`;
        } else {
          
          alert('success');
          
          fetch('/changePassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendingFormDataObject)
          })
          .then(response => response.text())
          .then(data => {
            const form = document.querySelector('#changePassword');




            document.getElementById('error-message-wrap').innerHTML = '';
            document.body.classList.add('data-saving');
            form.querySelector('.submit-wrapper button').classList.add('button-disabled');
            setTimeout(() => {
              document.getElementById('changePassword').reset();
              document.getElementById('message').style.display = 'block';
              document.getElementById('message').innerHTML = `<div class="success-message">Bed Request added Successfully</div>`;
              document.body.classList.remove('data-saving');
              form.querySelector('.submit-wrapper button').classList.remove('button-disabled');
            }, 3000);

            setTimeout(() => {
              document.getElementById('message').style.display = 'none';
            }, 6000);



          })
          .catch(error => {
            // Handle errors
            console.error('Error:', error);
            document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error Change Password. Please try again later.</div>`;
          }); 
          
          
          
          
          
        }
      
      
      
      
    });
  }

  formSubmit();
  
});

