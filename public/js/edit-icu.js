$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/components");
    const icus = await response.json();
    

    function displayFormData() {
      
    }
    
    
    function displayIcuDropdown(icuData) {
      const select = document.querySelector('#icuName');
      const option = document.createElement('OPTION');
      option.innerHTML = icuData.name;
      option.value = icuData.id;
      
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