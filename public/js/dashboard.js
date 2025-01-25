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
          let totalReserveBeds = 0;
          let totalOccupiedBeds = 0;
          let totalAvailableBedsPerc = 0;
          let totalReserveBedsPerc = 0;
          let totalOccupiedBedsPerc = 0;
          let totalAvailableBedsCount = '';
          let wrapperDiv;
          
          totalICUEl.innerHTML= components.length;
          
          components.forEach((data, index) => {
            totalBeds += data.totalBeds;
            totalAvailableBeds += data.availableBeds;
            totalReserveBeds += data.reserveBeds;
            totalOccupiedBeds += data.occupiedBeds;
            totalAvailableBedsPerc = totalAvailableBeds/totalBeds * 100;
            totalReserveBedsPerc = totalReserveBeds/totalBeds * 100;
            totalOccupiedBedsPerc = totalOccupiedBeds/totalBeds * 100;
          
            if( data.availableBeds > 0 && index < 9 ) {
                    wrapperDiv = document.createElement('DIV');
              const newDiv2 = document.createElement('DIV');
              const newDiv3 = document.createElement('DIV');
              wrapperDiv.classList.add('table_row');
              newDiv2.classList.add('name');
              newDiv3.classList.add('bed-count');
              
              newDiv2.innerHTML += data.name;
              newDiv3.innerHTML += data.availableBeds;
              
              wrapperDiv.appendChild(newDiv2);
              wrapperDiv.appendChild(newDiv3);
              
              availableBedsTableWrap.appendChild(wrapperDiv);
              
            }
            
          });
          
            if(totalAvailableBeds < 1) {
              totalAvailableBedsCount = 'No';
            } else {
              totalAvailableBedsCount = totalAvailableBeds;
            }
          
          totalBedEl.innerHTML = totalBeds;
          availableBedsEl.innerHTML = totalAvailableBedsCount;
          
          //Bed Availability Chart
          let chartEl = document.getElementById("pieChart").getContext('2d');

          let myChart = new Chart(chartEl, {
              type: 'pie',
              data: {
                labels: ["Occupied Beds [" +parseFloat(totalOccupiedBedsPerc.toFixed(2))+"%]",	"Reserve Beds [" +parseFloat(totalReserveBedsPerc.toFixed(2))+"%]",	"Available Beds [" +parseFloat(totalAvailableBedsPerc.toFixed(2))+"%]"],
                datasets: [{    
                    data: [totalOccupiedBeds,	totalReserveBeds,	totalAvailableBeds],

                    borderColor: ['#2196f38c', '#f443368c', '#3f51b570'],
                    backgroundColor: ['#2196f38c', '#f443368c', '#99ffbb',],
                    borderWidth: 1
                }]},         
              options: {
                responsive: true,
                maintainAspectRatio: false, 
								legend: {
                  display: true,
                  position: "right",
                  labels: {
                    boxWidth: 10,
                    fontColor: "#000",
                    fontFamily: "Roboto",
                    fullWidth: true,
                  } 
								},
                title: {
                  display: true,
                  text: 'Bed Availability Chart',
                  fontColor: "#4d4d4d",
                  fontFamily: "Roboto",
                  fontSize: 16
                }
              }
          });
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  
  
   async function getHospitalData() {
        try {
          const response = await fetch("/hospitals");
          const hospitals = await response.json();
          const totalHospitalsEl = document.querySelector('.total-hospitals .count');
          const hospitalTableWrap = document.querySelector('.hospital_table .table_body');
          let HoswrapperDiv;
          let totalHospitals = hospitals.length;
 
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
  
  
  
  
  
   async function getBedRequestData() {
      try {
        const response = await fetch("/bedreq");
        const bedrequests = await response.json();
        
        const succeededRequests = bedrequests.filter((data) => data.bedRequestStatus === "Succeed");
        const failedRequests = bedrequests.filter((data) => data.bedRequestStatus === "Failed");
        const noResponseRequests = bedrequests.filter((data) => data.bedRequestStatus === "No Feedback");
        
        const totalReq = bedrequests.length;
        
        const succeedPercentage = succeededRequests.length/totalReq * 100;
        const faliedPercentage = failedRequests.length/totalReq * 100;
        const noResponsePercentage = noResponseRequests.length/totalReq * 100;

        bedrequests.forEach((data, index) => {
          const requestStatus = data.bedRequestStatus;
          console.log(data, 'datadatadatadatadata')

        });
        
        
        //Bed Request Chart
        const ctx = document.getElementById('donutChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Succeed [' + parseFloat(succeedPercentage.toFixed(2)) +'%]', 'Fail to Find a Bed [' + parseFloat(faliedPercentage.toFixed(2)) +'%]', 'No Feedback [' + parseFloat(noResponsePercentage.toFixed(2)) +'%]'],
            datasets: [{
              label: 'Dataset 1',
              data: [succeededRequests.length, failedRequests.length, noResponseRequests.length],
              backgroundColor: ['#8CCB8C', '#A52A2A', '#3A9AD9'],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, 
            legend: {
              display: true,
              position: "right",
              labels: {
                boxWidth: 10,
                fontColor: "#000",
                fontFamily: "Roboto",
                fullWidth: true,
              } 
            },
            title: {
              display: true,
              text: 'Bed Request - Outcome',
              fontColor: "#4d4d4d",
              fontFamily: "Roboto",
              fontSize: 16
            }
          }
        });

      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
   }
  
  
  
  getICUdata();
  getHospitalData();
  getBedRequestData();
  
  
  
});