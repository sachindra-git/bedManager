$( document ).ready(function() {
  
   async function getHospitalData() {
        try {
          const response = await fetch("/hospitals");
          const hospitals = await response.json();
 
          hospitals.forEach((data, index) => {
            if( index < 9 ) {
              HoswrapperDiv = document.createElement('DIV');
              const newDiv2 = document.createElement('DIV');
              const newDiv3 = document.createElement('DIV');
              HoswrapperDiv.classList.add('table_row');
              newDiv2.classList.add('name');
              newDiv3.classList.add('hospital-count');
              
              newDiv2.innerHTML += data.name;
              newDiv3.innerHTML += data.totalIcus;
              
              HoswrapperDiv.appendChild(newDiv2);
              HoswrapperDiv.appendChild(newDiv3);
              
              hospitalTableWrap.appendChild(HoswrapperDiv);
              
            }
            
          });
          
          totalHospitalsEl.innerHTML = totalHospitals;
            
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        }
   }
  
  
  getHospitalData();
 
  
});