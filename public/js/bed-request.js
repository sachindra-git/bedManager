$( document ).ready(function() {
  
async function getReqdata() {
  try {
    const response = await fetch("/bedreq");
    const bedreqs = await response.json();
    const reqTableWrap = document.querySelector('.req-table .table_body');
    const totalreqsEl = document.querySelector('.total-content .total-req');
    const paginationControls = document.querySelector('.pagination-controls'); // Add this container in your HTML
    
    let totalReqs = bedreqs.length;
    let currentPage = 1;
    const itemsPerPage = 2;

    function displayReq(reqPage) {
      reqTableWrap.innerHTML = "";

      if (reqPage.length === 0) {
        reqTableWrap.innerHTML = "<div class='no-result'>No results found</div>";
        return;
      }

      reqPage.forEach((data) => {
        console.log(data, 'datadatadatadatadatadata')
        const reqWrapperDiv = document.createElement('DIV');
        const newDiv2 = document.createElement('DIV');
        const newDiv3 = document.createElement('DIV');
        const newDiv4 = document.createElement('DIV');
        const newDiv5 = document.createElement('DIV');
        const newDiv6 = document.createElement('DIV');
        const newDiv7 = document.createElement('DIV');
        const newDiv8 = document.createElement('DIV');


        reqWrapperDiv.classList.add('table_row');
        newDiv2.classList.add('date');
        newDiv3.classList.add('p-name');
        newDiv4.classList.add('p-age');
        newDiv5.classList.add('hos-name');
        newDiv6.classList.add('ward-no');
        newDiv7.classList.add('p-status');
        newDiv8.classList.add('req-status');

        // Fill content
        newDiv2.innerHTML = data.reqDate;
        newDiv3.innerHTML = data.patientName;
        newDiv4.innerHTML = data.patientAge;
        newDiv5.innerHTML = data.hospitalName;
        newDiv6.innerHTML = data.wardNumber;
        newDiv7.innerHTML = data.patientStatus;
        newDiv8.innerHTML = data.bedRequestStatus;

        // Build row
        reqWrapperDiv.appendChild(newDiv2);
        reqWrapperDiv.appendChild(newDiv3);
        reqWrapperDiv.appendChild(newDiv4);
        reqWrapperDiv.appendChild(newDiv5);
        reqWrapperDiv.appendChild(newDiv6);
        reqWrapperDiv.appendChild(newDiv7);
        reqWrapperDiv.appendChild(newDiv8);

        // Append to table
        reqTableWrap.appendChild(reqWrapperDiv);
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

    function updatePagination(filteredreqs = bedreqs) {
      // Calculate the items to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const reqPage = filteredreqs.slice(startIndex, endIndex);

      // Display the current page data
      displayReq(reqPage);

      // Update pagination controls
      createPaginationControls(filteredreqs.length);
    }

    // Add search functionality
//     const searchBar = document.querySelector("#req-search");
//     searchBar.addEventListener("input", (e) => {
//       const searchTerm = e.target.value.toLowerCase();

//       // Filter reqs based on the search term
//       const filteredreqs = reqs.filter((req) =>
//         req.name.toLowerCase().includes(searchTerm)
//       );

//       currentPage = 1; // Reset to the first page when searching
//       updatePagination(filteredreqs);
//     });

    // Initial display
    updatePagination();

    // Update total reqs
    totalreqsEl.innerHTML = totalReqs;

  } catch (error) {
    console.error("Error fetching reqs:", error);
  }
}

  
  
  getReqdata();
 
  
});