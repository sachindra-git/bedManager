$( document ).ready(function() {
  
// async function getICUdata() {
//   try {
//     const response = await fetch("/icus");
//     const icus = await response.json();
//     $('#icuName').select2();
    

//     function displayICUdataOnForm(selectedValue) {
//       icus.forEach((icuData) => {
//         let selectedValue = document.getElementById("icuName").value;
//         if( icuData._id == selectedValue ) {
//           const totalInput = document.querySelector('#totalBeds');
//           const contact = document.querySelector('#contactNumber');
//           const occupiedInput = document.querySelector('#occupiedBeds');
//           const reserveInput = document.querySelector('#reserveBeds');
//           const availableInput = document.querySelector('#availableBeds');
//           const totalBeds = icuData.totalBeds;
//           const occupiedBeds = icuData.occupiedBeds;
//           const reserveBeds = icuData.reserveBeds;
//           const availableBeds = icuData.availableBeds;
//           const contactNumber = icuData.contact;
          
//           totalInput.value = totalBeds
//           occupiedInput.value = occupiedBeds
//           reserveInput.value = reserveBeds
//           availableInput.value = availableBeds
//           contact.value = contactNumber;
//         }
//       });
//     }
    
//     $('#icuName').on('select2:select', function (e) {
//       let selectedValue = $(this).val();
//       displayICUdataOnForm(selectedValue);   
//     });
    
    
//     function displayIcuDropdown(icuData) {
//       const select = document.querySelector('#icuName');
//       const option = document.createElement('OPTION');
//       option.innerHTML = icuData.name;
//       option.value = icuData._id;
      
//       select.appendChild(option);
      
//     }
    
//     icus.forEach((icuData) => {
//       displayIcuDropdown(icuData);
//     });
    
    

//   } catch (error) {
//     console.error("Error fetching icus:", error);
//   }
// }
  
  
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

      fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      })
      .then(response => response.text())
      .then(data => {
        if( parseInt(formDataObject.occupiedBeds) + parseInt(formDataObject.availableBeds) + parseInt(formDataObject.reserveBeds) != parseInt(formDataObject.totalBeds) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please check the entered bed Counts. Total Bed Count did not match</div>`;
          return false;
        } else {
          document.getElementById('error-message-wrap').innerHTML = '';
          document.body.classList.add('data-saving');
          setTimeout(() => {
            document.getElementById('icuForm').reset();
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').innerHTML = `<div class="success-message">${data}</div>`;
            document.body.classList.remove('data-saving');
          }, 3000);

          setTimeout(() => {
            document.getElementById('message').style.display = 'none';
          }, 6000);
        }
        
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error updating ICU. Please try again later.</div>`;
      });
    });
  }

  formSubmit();
  
});

