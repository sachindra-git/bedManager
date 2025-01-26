$( document ).ready(function() {
  
   async function getHospitalData() {
        try {
          const response = await fetch("/hospitals");
          const hospitals = await response.json();
          const hospitalTableWrap = document.querySelector('.hospital-table .table_body');
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
          
            
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        }
   }
  
  
  getHospitalData();
 
  
});