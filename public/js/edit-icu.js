$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/icus");
    const icus = await response.json();
    $('#icuName').select2();
    

    function displayICUdataOnForm(selectedValue) {
      console.log('sssssssssss');
      icus.forEach((icuData) => {
        let selectedValue = document.getElementById("icuName").value;
        if( icuData._id == selectedValue ) {
          const totalInput = document.querySelector('#totalBeds');
          const occupiedInput = document.querySelector('#occupiedBeds');
          const reserveInput = document.querySelector('#reserveBeds');
          const availableInput = document.querySelector('#availableBeds');
          const totalBeds = icuData.totalBeds;
          const occupiedBeds = icuData.occupiedBeds;
          const reserveBeds = icuData.reserveBeds;
          const availableBeds = icuData.availableBeds;
          
          totalInput.value = totalBeds
          occupiedInput.value = occupiedBeds
          reserveInput.value = reserveBeds
          availableInput.value = availableBeds
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

  
  
  getICUdata();
 
  
});