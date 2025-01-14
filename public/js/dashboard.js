$( document ).ready(function() {
   async function getData() {
        try {
          const response = await fetch("/components");
          const components = await response.json();
          
          console.log(components.length, 'ssssssssssss')
          
          
          components.forEach(data => {
            console.log(data.name,'datadatadatadatadatadata');
          });
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getData();
});