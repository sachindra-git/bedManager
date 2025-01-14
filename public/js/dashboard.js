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
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach(data => {
            totalBeds += data.totalBeds;
            totalAvailableBeds += data.availableBeds;
          
            if( data.availableBeds > 0 ) {
              const newDiv = document.createElement('div');
              newDiv.classList.add('table_row');
            }
            
            
          });
          
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