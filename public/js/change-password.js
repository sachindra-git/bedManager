$( document ).ready(function() {
  
  function formSubmit() {
    document.getElementById('changePassword').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        currentPassword: document.getElementById('currrentPassword').value.trim(),
        newPassword: document.getElementById('newPassword').value.trim(),
        RenewPassword: document.getElementById('RenewPassword').value.trim(),
      };
      
      
      fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      })
      .then(response => response.text())
      .then(data => {
        const form = document.querySelector('#bedReqForm');
        document.getElementById('error-message-wrap').innerHTML = '';
        document.body.classList.add('data-saving');
        form.querySelector('.submit-wrapper button').classList.add('button-disabled');
        setTimeout(() => {
          document.getElementById('bedReqForm').reset();
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
      
    });
  }

  formSubmit();
  
});

