$( document ).ready(function() {
   async function getICUdata() {
        try {
          const response = await fetch("/components");
          const components = await response.json();
          const totalICUEl = document.querySelector('.total-icus .count');
          const totalBedEl = document.querySelector('.total-beds .count');
          let totalBeds = 0;
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach(data => {
            totalBeds += data.totalBeds;
            
            if(data.availableBeds > 0) {
              console.log(data.name, 'nameeeeeeeeeee');
            }
            
          });
          
          totalBedEl.innerHTML= totalBeds;
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getICUdata();
});