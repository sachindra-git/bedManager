$( document ).ready(function() {
  
  function encodeBase64(text) {
      return btoa(text); // Encode to Base64
  }

  async function formSubmit() {
    
    const response = await fetch("/user");
    const users = await response.json();
    let userNames = [];
    let passwords = [];

    users.forEach((user) => {
      userNames.push(user.userName);
      passwords.push(user.password);
    });
    
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
    
      if (getItemWithExpiry('loggedInUser')) {
        window.location.href = "index.html";
        return;
      }
    
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formDataObject = {
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password').value.trim(),
      };

      try {

        if( formDataObject.userName == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please Enter Your Username</div>`;
        } else if( formDataObject.password == '' ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Please Enter Your Password</div>`;
        } else if( !userNames.includes(formDataObject.userName) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Invalid User Name</div>`;
        } else if( !passwords.includes(formDataObject.password) ) {
          document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Invalid Password</div>`;
        } else {
          document.getElementById('error-message-wrap').innerHTML = "";
          const secretKey = encodeBase64(formDataObject.userName);
          const loginPage = document.querySelector(".login-page");
          //localStorage.setItem("loggedInUser", secretKey);
          
          function setItemWithExpiry(key, value) {
            const now = new Date();
            const item = {
                value: value,
                expiry: now.getTime() + 2 * 60 * 60 * 1000 // 2 hours in milliseconds
            };
            localStorage.setItem("loggedInUser", JSON.stringify(item));
          }
          
          setItemWithExpiry("loggedInUser", secretKey, 2 * 60 * 60 * 1000);
          
          loginPage.classList.add('loading');
          
          setTimeout(() => {
            window.location.href = "index.html";
          }, 4000);
          
        }

      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message); // Display error message to the user
      }

  });
 }

  formSubmit();
  
});

