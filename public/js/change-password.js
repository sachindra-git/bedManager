$( document ).ready(function() {
  
  async function formSubmit() {
    
    const response = await fetch("/user");
    const users = await response.json();
    let password;
    
    function decodeBase64(encodedText) {
        return atob(encodedText); // Decode from Base64
    }
    
    const currentUser = decodeBase64(sessionStorage.getItem("loggedInUser"));

    users.forEach((user) => {
      if( currentUser == user.userName ) {
        password == user.password;
        console.log(user, 'passwordpasswordpasswordpassword');
      }
    });
    
    document.getElementById('changePassword').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        currentPassword: document.getElementById('currrentPassword').value.trim(),
        newPassword: document.getElementById('newPassword').value.trim(),
        RenewPassword: document.getElementById('RenewPassword').value.trim(),
      };
      
      
      fetch('/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      })
      .then(response => response.text())
      .then(data => {
        const form = document.querySelector('#changePassword');
        
        if( formDataObject.currentPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter Current Password</div>`;
        } else if( formDataObject.newPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter new Password</div>`;
        } else if( formDataObject.RenewPassword == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please retype new Password</div>`;
        } 
        
        
//         document.getElementById('error-message-wrap').innerHTML = '';
//         document.body.classList.add('data-saving');
//         form.querySelector('.submit-wrapper button').classList.add('button-disabled');
//         setTimeout(() => {
//           document.getElementById('bedReqForm').reset();
//           document.getElementById('message').style.display = 'block';
//           document.getElementById('message').innerHTML = `<div class="success-message">Bed Request added Successfully</div>`;
//           document.body.classList.remove('data-saving');
//           form.querySelector('.submit-wrapper button').classList.remove('button-disabled');
//         }, 3000);

//         setTimeout(() => {
//           document.getElementById('message').style.display = 'none';
//         }, 6000);
        
        
        
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error Change Password. Please try again later.</div>`;
      }); 
      
    });
  }

  formSubmit();
  
});

