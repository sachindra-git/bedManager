$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/icus");
    const icus = await response.json();
    $('#icuName').select2();
    

    function displayICUdataOnForm(selectedValue) {
      icus.forEach((icuData) => {
        let selectedValue = document.getElementById("icuName").value;
        if( icuData._id == selectedValue ) {
          const totalInput = document.querySelector('#totalBeds');
          const contact = document.querySelector('#contactNumber');
          const occupiedInput = document.querySelector('#occupiedBeds');
          const reserveInput = document.querySelector('#reserveBeds');
          const availableInput = document.querySelector('#availableBeds');
          const totalBeds = icuData.totalBeds;
          const occupiedBeds = icuData.occupiedBeds;
          const reserveBeds = icuData.reserveBeds;
          const availableBeds = icuData.availableBeds;
          const contactNumber = icuData.contact;
          
          totalInput.value = totalBeds
          occupiedInput.value = occupiedBeds
          reserveInput.value = reserveBeds
          availableInput.value = availableBeds
          contact.value = contactNumber;
        }
      });
    }
    
    $('#icuName').on('select2:select', function (e) {
      let selectedValue = $(this).val();
      displayICUdataOnForm(selectedValue);   
    });
    
    
    function displayIcuDropdown(icuData) {
      const select = document.querySelector('#icuName');
      const option = document.createElement('OPTION');
      option.innerHTML = icuData.name;
      option.value = icuData._id;
      
      select.appendChild(option);
      
    }
    
    icus.forEach((icuData) => {
      displayIcuDropdown(icuData);
    });
    
    

  } catch (error) {
    console.error("Error fetching icus:", error);
  }
}
  
  
  function formSubmit() {
    document.getElementById('icuForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        id: document.getElementById('icuName').value,
        totalBeds: document.getElementById('totalBeds').value,
        occupiedBeds: document.getElementById('occupiedBeds').value,
        reserveBeds: document.getElementById('reserveBeds').value,
        availableBeds: document.getElementById('availableBeds').value
      };

      fetch('/update', {
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
            document.getElementById('icuName').selectedIndex = 0;
            $('#icuName').select2();
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

  getICUdata();
  formSubmit();
  
});

document.addEventListener("DOMContentLoaded", function () {
  function updateSelectWithUrlParam() {
    // Get the ICU parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const icuValue = urlParams.get("icu");

    console.log(icuValue, 'icuValueicuValueicuValue')
    // If ICU value exists in the URL, set the selected value in the dropdown
    if (icuValue) {
      
      
//     if (icuValue) {
//         // Set the selected option in Select2
//         let newOption = new Option(icuValue, icuValue, true, true);
//         $('#icuName').append(newOption).trigger('change');
//     }
      
      
      
      
      //const icuSelect = document.querySelectorAll("#icuName option");
      
      //const icuSelect = document.querySelectorAll("select option");
      
      
      
      //console.log(icuSelect, 'ggggggggggg44444444444444');

      // Check if the value exists in the dropdown options
      //let optionExists = Array.from(icuSelect.options).some(option => console.log(option, 'bbbbbbbbbbbbbbbbbbb'));
      
// let optionExists = Array.from(icuSelect.options).some(option => {
//   console.log(optionExists, 'vvvvvvvvvvvvvvvvvvvvvvvvv');
//   //return option.value === icuValue; // This condition should return true if a match is found
// });
      
      //console.log(optionExists, 'vvvvvvvvvvvvvvvvvvvvvvvvv'); // Optional, for debugging
      
      //const options = Array.from(icuSelect.options).map(opt => opt.value);
      
      //console.log(icuSelect.options, 'icuSelecticuSelecticuSelecticuSelecticuSelect');
      
      
      // icuSelect.forEach((option) => {
      //   console.log(option.value, 'valuevaluevaluevalue')
      // });
      
      

      // if (optionExists) {
      //   icuSelect.value = icuValue;
      // }

      // If using Select2, trigger update
      // if ($(icuSelect).hasClass("select2-hidden-accessible")) {
      //   $(icuSelect).val(icuValue).trigger("change");
      // }
    }
  }
  
  updateSelectWithUrlParam();
});
