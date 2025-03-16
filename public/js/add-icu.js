$( document ).ready(function() {
  
  const icuNameList = [];
  
  async function getICUNames() {
    try {
      const response = await fetch("/icus");
      const icus = await response.json();

      icus.forEach((icuData) => {
        icuNameList.push(icuData.name);
      });
     

    } catch (error) {
      console.error("Error fetching icus:", error);
    }
  }
  
  getICUNames();
  
  
  
  
  function formSubmit() {
    document.getElementById('icuForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        name: document.getElementById('icu_name').value,
        totalBeds: document.getElementById('totalBeds').value,
        occupiedBeds: document.getElementById('occupiedBeds').value,
        reserveBeds: document.getElementById('reserveBeds').value,
        availableBeds: document.getElementById('availableBeds').value,
        contact: document.getElementById('contactNumber').value,
      };
      
      
      if( parseInt(formDataObject.occupiedBeds) + parseInt(formDataObject.availableBeds) + parseInt(formDataObject.reserveBeds) != parseInt(formDataObject.totalBeds) ) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please check the entered bed Counts. Total Bed Count did not match</div>`;
      } else if (icuNameList.includes(formDataObject.name)) {
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">The ICU already exists.</div>`;
      } else {
        
//         fetch('/add', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formDataObject)
//         })
//         .then(response => response.text())
//         .then(data => {
//           document.getElementById('error-message-wrap').innerHTML = '';
//           document.body.classList.add('data-saving');
//           setTimeout(() => {
//             document.getElementById('icuForm').reset();
//             document.getElementById('message').style.display = 'block';
//             document.getElementById('message').innerHTML = `<div class="success-message">ICU added Successfully</div>`;
//             document.body.classList.remove('data-saving');
//           }, 3000);

//           setTimeout(() => {
//             document.getElementById('message').style.display = 'none';
//           }, 6000);
//         })
//         .catch(error => {
//           // Handle errors
//           console.error('Error:', error);
//           document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error updating ICU. Please try again later.</div>`;
//         }); 
      }
    });
  }

  formSubmit();
  
});

