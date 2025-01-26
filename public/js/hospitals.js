$( document ).ready(function() {
  
   async function getHospitalData() {
        try {
          const response = await fetch("/hospitals");
          const hospitals = await response.json();
          const hospitalTableWrap = document.querySelector('.hospital-table .table_body');
          const totalHospitalsEl = document.querySelector('.total-content .total-hospitals');
          const totalICUEl = document.querySelector('.total-content .total-icus');
          let totalHospitals = hospitals.length;
          let totalICU = 0;
          let HoswrapperDiv;
          
        
 
          hospitals.forEach((data, index) => {
            console.log(data, 'aaaaaaaaaaaaa');
              HoswrapperDiv = document.createElement('DIV');
              const newDiv2 = document.createElement('DIV');
              const newDiv3 = document.createElement('DIV');
              const newDiv4 = document.createElement('DIV');
              const newDiv5 = document.createElement('DIV');
              const newDiv6 = document.createElement('DIV');
              const anchor = document.createElement('a');
            
            
            
              totalICU += data.totalIcus;
            
              console.log(totalICU, 'gggggggggggggggggg');
            
              HoswrapperDiv.classList.add('table_row');
              newDiv2.classList.add('name');
              newDiv3.classList.add('district');
              newDiv4.classList.add('province');
              newDiv5.classList.add('count');
              newDiv6.classList.add('contact');
              anchor.classList.add('contact-link');
              anchor.href = 'tel:'+data.contact;
              newDiv6.appendChild(anchor);
              newDiv2.innerHTML += data.name;
              newDiv3.innerHTML += data.district;
              newDiv4.innerHTML += data.province;
              newDiv5.innerHTML += data.totalIcus;
              anchor.innerHTML += data.contact;
            
              
              
              HoswrapperDiv.appendChild(newDiv2);
              HoswrapperDiv.appendChild(newDiv3);
              HoswrapperDiv.appendChild(newDiv4);
              HoswrapperDiv.appendChild(newDiv5);
              HoswrapperDiv.appendChild(newDiv6);
              
              hospitalTableWrap.appendChild(HoswrapperDiv);    
          });
          
          totalHospitalsEl.innerHTML = totalHospitals;
          totalICUEl.innerHTML = totalICU;
          
            
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        }
   }
  
  
  getHospitalData();
 
  
});