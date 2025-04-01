$( document ).ready(function() {

  $('#userType').select2();
  
  let selectedValue;
  
  $('#userType').on('select2:select', function (e) {
    selectedValue = $(this).val();
    
  });
  
  
  
  async function formSubmit() {
    
    const response = await fetch("/user");
    const users = await response.json();
    let userNames = [];

    users.forEach((user) => {
      userNames.push(user.userName);
    });
    
    
    document.getElementById('addUser').addEventListener('submit', function(event) {
      
      event.preventDefault();
      

      console.log(document.getElementById('userType').value, 'selectedValueselectedValue');
      
      
      const formDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password').value.trim(),
        RenewPassword: document.getElementById('RenewPassword').value.trim(),
        userType: document.getElementById('userType').value
      };
      
      const sendingFormDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('RenewPassword').value.trim(),
        userType: document.getElementById('userType').value
      };
      
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(formDataObject.password);
      const hasLowerCase = /[a-z]/.test(formDataObject.password);
      const hasNumber = /[0-9]/.test(formDataObject.password);
      const hasSpecialChar = /[@$!%*?&#]/.test(formDataObject.password);
      
      if (formDataObject.userName == '') {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter User Name.</div>`;
      } else if (userNames.includes(formDataObject.userName)) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">User Already Exists.</div>`;
      } else if (formDataObject.password == '') {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please enter Password.</div>`;
      } else if (formDataObject.password.length < minLength) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must be at least 8 characters long.</div>`;
      } else if (!hasUpperCase) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one uppercase letter.</div>`;
      } else if (!hasLowerCase) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one lowercase letter.</div>`;
      } else if (!hasNumber) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one number.</div>`;
      } else if (!hasSpecialChar) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Password must contain at least one special character (@, $, !, %, etc.).</div>`;
      } else if( formDataObject.RenewPassword == '' ) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please retype Password</div>`;
      } else if( formDataObject.password != formDataObject.RenewPassword ) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Paswords did not match</div>`;
      } else if( selectedValue == '' ) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please select User Type</div>`;
      } else {
        
        fetch('/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendingFormDataObject)
        })
        .then(response => response.text())
        .then(data => {
          const form = document.querySelector('#addUser');
          document.getElementById('error-message-wrap').innerHTML = '';
          document.body.classList.add('data-saving');
          form.querySelector('.submit-wrapper button').classList.add('button-disabled');
          setTimeout(() => {
            document.getElementById('addUser').reset();
            document.getElementById('userType').selectedIndex = 0;
            $('#userType').select2();
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').innerHTML = `<div class="success-message">User added Successfully</div>`;
            document.body.classList.remove('data-saving');
            form.querySelector('.submit-wrapper button').classList.remove('button-disabled');
          }, 3000);

          setTimeout(() => {
            document.getElementById('message').style.display = 'none';
            location.reload();
          }, 6000);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error adding User. Please try again later.</div>`;
        }); 
      }
    });
  }
  
  formSubmit();
  
});

