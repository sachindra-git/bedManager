$( document ).ready(function() {
   async function getICUdata() {
        try {
          const response = await fetch("/components");
          const components = await response.json();
          const totalICUEl = document.querySelector('.total-icus .count');
          const totalBedEl = document.querySelector('.total-beds .count');
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach(data => {
            console.log(data.totalBeds,'totalBedstotalBedstotalBedstotalBeds');
          });
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getICUdata();
});