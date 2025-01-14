$( document ).ready(function() {
   async function getICUdata() {
        try {
          const response = await fetch("/components");
          const components = await response.json();
          const totalICUEl = document.querySelector('.total-icus .count');
          const totalBedEl = document.querySelector('.total-beds .count');
          const availableBedsEl = document.querySelector('.available_count .count');
          let totalBeds = 0;
          let totalAvailableBeds = 0;
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach(data => {
            totalBeds += data.totalBeds;
            //totalAvailableBeds += data.availableBeds;
            
            if(totalAvailableBeds < 1) {
              totalAvailableBeds = 'No';
            } else {
              totalAvailableBeds += data.availableBeds;
            }
            
          });
          
          totalBedEl.innerHTML= totalBeds;
          availableBedsEl.innerHTML= totalAvailableBeds;
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getICUdata();
});