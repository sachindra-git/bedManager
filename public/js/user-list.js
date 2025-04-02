$( document ).ready(function() {
  
async function getUserList() {
  try {
    const response = await fetch("/user");
    const users = await response.json();
    const userTableWrap = document.querySelector('.user-table .table_body');
    const totalUsersEl = document.querySelector('.total-content .total-users');
    const paginationControls = document.querySelector('.pagination-controls'); // Add this container in your HTML
    
    let totalUsers = users.length;
    let currentPage = 1;
    const itemsPerPage = 15;
    
    users.sort((a, b) => a.userName.localeCompare(b.userName));

    function displayUsers(userPage) {
      userTableWrap.innerHTML = "";

      if (userPage.length === 0) {
        userTableWrap.innerHTML = "<div class='no-result'>No results found</div>";
        return;
      }

      userPage.forEach((data) => {
        const userwrapperDiv = document.createElement('DIV');
        const newDiv2 = document.createElement('DIV');
        const newDiv3 = document.createElement('DIV');
        const newDiv4 = document.createElement('DIV');

        userwrapperDiv.classList.add('table_row');
        newDiv2.classList.add('user-name');
        newDiv3.classList.add('user-type');
        newDiv4.classList.add('remove-user');

        // Fill content
        newDiv2.innerHTML = data.userName;
        newDiv3.innerHTML = data.userType;
        newDiv4.innerHTML = '<button data-id="'+ data._id  +'" class="remove-btn">Remove User</button>';

        // Build row
        userwrapperDiv.appendChild(newDiv2);
        userwrapperDiv.appendChild(newDiv3);
        userwrapperDiv.appendChild(newDiv4);

        // Append to table
        userTableWrap.appendChild(userwrapperDiv);
      });
    }

    function createPaginationControls(totalItems) {
      paginationControls.innerHTML = ""; // Clear existing controls
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Previous button
      const prevButton = document.createElement("button");
      prevButton.textContent = "<< Previous";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          updatePagination();
        }
      });
      paginationControls.appendChild(prevButton);

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener("click", () => {
          currentPage = i;
          updatePagination();
        });
        paginationControls.appendChild(pageButton);
      }

      // Next button
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next >>";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          updatePagination();
        }
      });
      paginationControls.appendChild(nextButton);
    }

    function updatePagination(filteredUsers = users) {
      // Calculate the items to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const userPage = filteredUsers.slice(startIndex, endIndex);

      // Display the current page data
      displayUsers(userPage);

      // Update pagination controls
      createPaginationControls(filteredUsers.length);
    }

    // Add search functionality
    const searchBar = document.querySelector("#user-search");
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      // Filter users based on the search term
      const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm)
      );

      currentPage = 1; // Reset to the first page when searching
      updatePagination(filteredUsers);
    });

    // Initial display
    updatePagination();

    // Update total users
    totalUsersEl.innerHTML = totalUsers;

  } catch (error) {
    console.error("Error fetching Users:", error);
  }
}
  
function deletUser(userObject) {
  fetch('/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  })
  .then(response => response.text())
  .then(data => {
    const form = document.querySelector('#changePassword');

    document.getElementById('error-message-wrap').innerHTML = '';
    document.body.classList.add('data-saving');
    form.querySelector('.submit-wrapper button').classList.add('button-disabled');
    setTimeout(() => {
      document.getElementById('changePassword').reset();
      document.getElementById('message').style.display = 'block';
      document.getElementById('message').innerHTML = `<div class="success-message">Password updated Successfully</div>`;
      document.body.classList.remove('data-saving');
      form.querySelector('.submit-wrapper button').classList.remove('button-disabled');
    }, 3000);

    setTimeout(() => {
      document.getElementById('message').style.display = 'none';
      if(localStorage.getItem("loggedInUser")) {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      }
    }, 6000);

  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
    document.getElementById('error-message-wrap').innerHTML = `<div class="error-message">Error deleting User. Please try again later.</div>`;
  });
}

getUserList();
  
});