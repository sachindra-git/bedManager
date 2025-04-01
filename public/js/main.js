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
  
  function getItemWithExpiry(key) {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = new Date().getTime();

      // Check if expired
      if (now > item.expiry) {
          localStorage.removeItem(key); // Remove expired item
          return null;
      }
      return item.value;
  }
  
  if (!getItemWithExpiry('loggedInUser') && !window.location.pathname.includes("login.html") ) {
    window.location.href = "login.html";
  }
  
  if (getItemWithExpiry('loggedInUser') && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }
  

  
  
  function decodeBase64(encodedText) {
      return atob(encodedText); // Decode from Base64
  }
  
  function setUserName() {
    const userName = decodeBase64(getItemWithExpiry('loggedInUser'));
    const userElement = document.querySelector('.user_detail');
    if (!userElement) return
    if( userName ) {
      userElement.style.display = 'flex'
      userElement.querySelector('.user_name').textContent = userName;
    } else {
      userElement.style.display = 'none'
    }
  }
  
  function userToggle() {
    const userDropdown = document.querySelector('.user-dropdown');
    const userDetail = document.querySelector('.user_detail');
    document.querySelectorAll(".loggedin-user").forEach(element => {
      element.addEventListener("click", function() {
          userDropdown?.classList.toggle("active");
      });
    });
    document.addEventListener("click", function(event) {
      if (!event.target.closest(".user_detail") && userDropdown?.classList.contains('active')) {
        userDropdown?.classList.remove("active");
      }
    });
  }
  
  function signOut() {
    const signOut = document.querySelector('.sign-out a');
    signOut?.addEventListener("click", function(event) {
      event.preventDefault();
      if(getItemWithExpiry('loggedInUser')) {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      }
    });
  }
  
  async function adminOnly() {
    const response = await fetch("/user");
    const users = await response.json();
    const adminOnly = document.querySelectorAll('.admin-only');
    const userName = decodeBase64(getItemWithExpiry('loggedInUser'));
      users.forEach((user) => {
        if( userName == user.userName ) {
          if(user.userType != 'admin') {
            if( window.location.pathname.includes("add-user.html") ) {
              window.location.href = "index.html";
            }
            if(adminOnly.length < 1) return
            adminOnly.forEach((el) => {
              el.remove();
            });
          }
        }
    });
  }


  showTime();
  showDate();
  menuToggle();
  menuActive();
  setUserName();
  userToggle();
  signOut();
  adminOnly();
});