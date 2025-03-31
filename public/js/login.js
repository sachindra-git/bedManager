$( document ).ready(function() {
  
  async function formSubmit() {
    
  const response = await fetch("/user");
  const users = await response.json();
    
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password').value.trim(),
      };
      
      
      try {

      
        users.forEach((user) => {
          
        });

        

        console.log("Form submitted successfully:", formDataObject);
        // You can proceed with further actions like sending data to a server

      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message); // Display error message to the user
      }
      
      
//       fetch('/addBedReq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formDataObject)
//       })
//       .then(response => response.text())
//       .then(data => {
//         const form = document.querySelector('#bedReqForm');
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
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('Error:', error);
//         document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error adding Bed Request. Please try again later.</div>`;
//       }); 
      
    });
  }

  formSubmit();
  
});

