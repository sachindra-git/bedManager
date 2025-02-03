$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/icus");
    const icus = await response.json();
    $('#icuName').select2();
    

    function displayICUdataOnForm(selectedValue) {
      icus.forEach((icuData) => {
        let selectedValue = document.getElementById("icuName").value;
        if( icuData.name == selectedValue ) {
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
      option.value = icuData.name;
      
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
        name: document.getElementById('icuName').value,
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
        //const occupiedBedsVal = document.getElementById('occupiedBeds').value;
        // const occupiedBedsVal = document.getElementById('occupiedBeds').value;
        // const reserveBedsVal = document.getElementById('reserveBeds').value;
        // const availableBedsVal = document.getElementById('availableBeds').value;

        console.log(parseInt(formDataObject.occupiedBeds) + parseInt(formDataObject.availableBeds) + parseInt(formDataObject.reserveBeds) , 'totalBedstotalBedstotalBedstotalBeds');
        
        if( parseInt(formDataObject.occupiedBeds) + parseInt(formDataObject.availableBeds) + parseInt(formDataObject.reserveBeds) != parseInt(formDataObject.totalBeds) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please check the entered bed Counts. Total Bed Count did not match</div>`;
        } else {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please check the entered bed Counts. Total Bed Count did not match</div>`;
          document.body.classList.add('data-saving');
          setTimeout(() => {
            document.getElementById('icuForm').reset();
            document.getElementById('icuName').selectedIndex = 0;
            $('#icuName').select2();
            document.getElementById('message').style.opacity = '1';
            document.getElementById('message').innerHTML = `<div class="success-message">${data}</div>`;
            document.body.classList.remove('data-saving');
          }, 3000);

          setTimeout(() => {
            document.getElementById('message').style.opacity = '0';
          }, 6000);
        }
        
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        document.getElementById('message').innerHTML = `<div class="error-message">Error updating ICU. Please try again later.</div>`;
      });
    });
  }

  
  
  getICUdata();
  formSubmit();
 
  
});