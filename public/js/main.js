$( document ).ready(function() {
    function showTime(){
      var date = new Date();
      var h = date.getHours(); // 0 - 23
      var m = date.getMinutes(); // 0 - 59
      var s = date.getSeconds(); // 0 - 59
      var session = "AM";
      
      if(h == 0){
          h = 12;
      }
      
      if(h > 12){
          h = h - 12;
          session = "PM";
      }
      
      h = (h < 10) ? "0" + h : h;
      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;
      
      let time = h + ":" + m + ":" + s + " " + session;
      const clock = document.querySelector("#clock");
      
      if(clock) {
        clock.innerText = time;
        clock.textContent = time;
      }
      
      setTimeout(showTime, 1000);
      
  }
  
  function showDate(){
    const currentDate = new Date();
    const currentDateEl = document.querySelector('.current-date');
    
    if(!currentDateEl) return false;
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;
    
    currentDateEl.innerHTML += formattedDate;
  }
  
  function menuToggle(){
    const menuToggle = document.querySelector('.js-menu-toggle');
    const menuClose = document.querySelector('.js-menu-close');
    const menu = document.querySelector('.more-menu-wrap');

    menuToggle?.addEventListener('click', () => {
      menu.classList.add('active');
      menuToggle.classList.add('active');
    });
    
    menuClose?.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
    
  }
  
  function menuActive(){
    const meuItems = document.querySelectorAll('.menu-link');
    if(meuItems.length < 1) return false;
    let currentPathname = window.location.pathname;
    meuItems.forEach(menuItem => {
      const menuLink = menuItem.href;
      const menuUrl = new URL(menuLink);
      
      if( currentPathname ===  menuUrl.pathname ) {
        menuItem.classList.add('active');
      }
    })
  }

  showTime();
  showDate();
  menuToggle();
  menuActive();
});