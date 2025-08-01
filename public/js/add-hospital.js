$( document ).ready(function() {
  
  const hospitalNameList = [];
  
  async function getHospitalNames() {
    try {
      const response = await fetch("/hospitals");
      const hospitals = await response.json();

      hospitals.forEach((hospitalData) => {
        hospitalNameList.push(hospitalData.name);
      });
     

    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  }
  
  getHospitalNames();
  
  
  
  
  function formSubmit() {
    document.getElementById('hospitalForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        name: document.getElementById('hospital_name').value,
        district: document.getElementById('district').value,
        province: document.getElementById('province').value,
        totalIcus: document.getElementById('totalIcus').value,
        contact: document.getElementById('contactNumber').value,
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
          const form = document.querySelector('#hospitalForm');
          document.getElementById('error-message-wrap').innerHTML = '';
          document.body.classList.add('data-saving');
          form.querySelector('.submit-wrapper button').classList.add('button-disabled');
          setTimeout(() => {
            document.getElementById('hospitalForm').reset();
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

  formSubmit();
  
});

