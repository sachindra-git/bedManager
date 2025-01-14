$( document ).ready(function() {
   async function getICUdata() {
        try {
          const response = await fetch("/components");
          const components = await response.json();
          const totalICUEl = document.querySelector('.total-icus .count');
          const totalBedEl = document.querySelector('.total-beds .count');
          const availableBedsEl = document.querySelector('.available_count .count');
          const availableBedsTableWrap = document.querySelector('.available_icu_table .table_body');
          let totalBeds = 0;
          let totalAvailableBeds = 0;
          let totalAvailableBedsCount = '';
          let wrapperDiv;
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach(data => {
            totalBeds += data.totalBeds;
            totalAvailableBeds += data.availableBeds;
          
            if( data.availableBeds > 0 ) {
                    wrapperDiv = document.createElement('DIV');
              const newDiv2 = document.createElement('DIV');
              const newDiv3 = document.createElement('DIV');
              wrapperDiv.classList.add('table_row');
              newDiv2.classList.add('name');
              newDiv3.classList.add('bed-count');
              
              newDiv2.innerHTML= data.name;
              newDiv3.innerHTML= data.availableBeds;
              
              wrapperDiv.appendChild(newDiv2);
              wrapperDiv.appendChild(newDiv3);
              
             // wrapperDiv.innerHTML= newDiv2;
              

              console.log(wrapperDiv, 'wrapperDivwrapperDiv');
              
              
            }
            
          });
          
          availableBedsTableWrap.appendChild(wrapperDiv);
            
          
            if(totalAvailableBeds < 1) {
              totalAvailableBedsCount = 'No';
            } else {
              totalAvailableBedsCount = totalAvailableBeds;
            }
          
          totalBedEl.innerHTML= totalBeds;
          availableBedsEl.innerHTML= totalAvailableBedsCount;
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getICUdata();
});