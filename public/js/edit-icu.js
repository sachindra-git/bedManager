$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/components");
    const icus = await response.json();
    


  } catch (error) {
    console.error("Error fetching icus:", error);
  }
}

  
  
  getICUdata();
 
  
});