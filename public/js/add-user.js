$( document ).ready(function() {

  $('#userType').select2();
  
  function formSubmit() {
    document.getElementById('addUser').addEventListener('submit', function(event) {
      event.preventDefault();
      
    $('#userType').on('select2:select', function (e) {
      let selectedValue = $(this).val();
      displayICUdataOnForm(selectedValue);   
    });

      const formDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password').value.trim(),
        RenewPassword: document.getElementById('RenewPassword').value.trim(),
      };
      
      const sendingFormDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('newPassword').value.trim(),
      };
      
      
      if (hospitalNameList.includes(formDataObject.name)) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">The Hospital already exists.</div>`;
      } else {
        
        fetch('/addHospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataObject)
        })
        .then(response => response.text())
        .then(data => {
          const form = document.querySelector('#addUser');
          document.getElementById('error-message-wrap').innerHTML = '';
          document.body.classList.add('data-saving');
          form.querySelector('.submit-wrapper button').classList.add('button-disabled');
          setTimeout(() => {
            document.getElementById('addUser').reset();
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').innerHTML = `<div class="success-message">Hospital added Successfully</div>`;
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
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error updating Hospital. Please try again later.</div>`;
        }); 
      }
    });
  }

  //formSubmit();
  
});

