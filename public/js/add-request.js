$( document ).ready(function() {
  
  //const bedReqNameList = [];
  
//   async function getbedReqNames() {
//     try {
//       const response = await fetch("/bedreq");
//       const bedReqs = await response.json();

//       bedReqs.forEach((bedReqData) => {
//         bedReqNameList.push(bedReqData.name);
//       });
     

//     } catch (error) {
//       console.error("Error fetching Bed Requests:", error);
//     }
//   }
  
//   getbedReqNames();
  
  const pickerReqDate = new Pikaday({
    field: document.getElementById("date"),
    format: "DD/MM/YYYY", // Display format
    firstDay: 1,
    toString(date) {
      return formatDate(date);
    },
  });

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Display format
  }
  
  
  function formSubmit() {
    document.getElementById('bedReqForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        date: document.getElementById('date').value,
        patientName: document.getElementById('patientName').value,
        patientAge: document.getElementById('patientAge').value,
        hospitalName: document.getElementById('hospitalName').value,
        wardNumber: document.getElementById('wardNumber').value,
        patientStatus: document.getElementById('patientStatus').value,
        bedRequestStatus: document.getElementById('bedRequestStatus').value
      };
      
      
      fetch('/addBedReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      })
      .then(response => response.text())
      .then(data => {
        document.getElementById('error-message-wrap').innerHTML = '';
        document.body.classList.add('data-saving');
        setTimeout(() => {
          document.getElementById('bedReqForm').reset();
          document.getElementById('message').style.display = 'block';
          document.getElementById('message').innerHTML = `<div class="success-message">Bed Request added Successfully</div>`;
          document.body.classList.remove('data-saving');
        }, 3000);

        setTimeout(() => {
          document.getElementById('message').style.display = 'none';
        }, 6000);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error adding Bed Request. Please try again later.</div>`;
      }); 
      
    });
  }

  formSubmit();
  
});

