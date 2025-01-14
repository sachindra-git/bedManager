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
          
          console.log(components.length, 'ssssssssssss')
          totalICUEl.innerHTML= components.length;
          
          components.forEach((data, index) => {
            totalBeds += data.totalBeds;
            totalAvailableBeds += data.availableBeds;
            totalReserveBeds += data.reserveBeds;
            totalOccupiedBeds += data.occupiedBeds;
            totalAvailableBedsPerc = totalAvailableBeds/totalBeds * 100;
            totalReserveBedsPerc = totalAvailableBeds/totalBeds * 100;
            totalOccupiedBedsPerc = totalAvailableBeds/totalBeds * 100;
          
            if( data.availableBeds > 0 && index < 9 ) {
              console.log(index,'indexindexindexindexindexindex');
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
              

              console.log(wrapperDiv, 'wrapperDivwrapperDiv');
              availableBedsTableWrap.appendChild(wrapperDiv);
              
            }
            
          });
          console.log(totalAvailableBedsPerc, 'totalAvailableBedsPerctotalAvailableBedsPerctotalAvailableBedsPerc');
          
            if(totalAvailableBeds < 1) {
              totalAvailableBedsCount = 'No';
            } else {
              totalAvailableBedsCount = totalAvailableBeds;
            }
          
          totalBedEl.innerHTML = totalBeds;
          availableBedsEl.innerHTML = totalAvailableBedsCount;
          
          //Chart
          let chartEl = document.getElementById("pieChart").getContext('2d');

          let myChart = new Chart(chartEl, {
              type: 'pie',
              data: {
                labels: ["Total Occupied Beds [" +parseFloat(totalAvailableBedsPerc.toFixed(2))+"%]",	"Total Reserve Beds",	"Total Available Beds"],
                datasets: [{    
                    data: [totalOccupiedBeds,	totalReserveBeds,	totalAvailableBeds],

                    borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                    backgroundColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                    borderWidth: 1
                }]},         
              options: {
                responsive: true,
                maintainAspectRatio: false, 
								legend: {
													display: true,
													position: "right",
													labels: {
																			boxWidth: 30,
																			fontColor: "#999",
																			fontFamily: "Montserrat",
																			fullWidth: true
													} 
									},
              }
          });
      
        } catch (error) {
          console.error("Error fetching components:", error);
        }
   }
  getICUdata();
  
  
  
});