$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/icus");
    const icus = await response.json();
    const icuTableWrap = document.querySelector('.icu-table .table_body');
    const totalicusEl = document.querySelector('.total-content .total-icus');
    const paginationControls = document.querySelector('.pagination-controls'); // Add this container in your HTML
    
    let totalIcus = icus.length;
    let currentPage = 1;
    const itemsPerPage = 15;
    
    icus.sort((a, b) => a.name.localeCompare(b.name));
  

    function displayICUs(icuPage) {
      icuTableWrap.innerHTML = "";

      if (icuPage.length === 0) {
        icuTableWrap.innerHTML = "<div class='no-result'>No results found</div>";
        return;
      }

      icuPage.forEach((data) => {
        const icuWrapperDiv = document.createElement('DIV');
        const newDiv2 = document.createElement('DIV');
        const newDiv3 = document.createElement('DIV');
        const newDiv4 = document.createElement('DIV');
        const newDiv5 = document.createElement('DIV');
        const newDiv6 = document.createElement('DIV');
        const newDiv7 = document.createElement('DIV');
        const anchor = document.createElement('a');
        const editAnchor = document.createElement('a');
        const span = document.createElement('SPAN');

        icuWrapperDiv.classList.add('table_row');
        newDiv2.classList.add('name');
        newDiv3.classList.add('total-beds');
        newDiv4.classList.add('occupied-beds');
        newDiv5.classList.add('reserve-beds');
        newDiv6.classList.add('available-beds');
        newDiv7.classList.add('contact');
        anchor.classList.add('contact-link');
        span.classList.add('updated-detail');
        anchor.href = 'tel:' + data.contact;
        
        editAnchor.classList.add('edit-link');
        editAnchor.href = '/edit-icu.html?icu=' + data._id;

        // Fill content
        newDiv2.innerHTML = data.name;
        newDiv3.innerHTML = data.totalBeds;
        newDiv4.innerHTML = data.occupiedBeds;
        newDiv5.innerHTML = data.reserveBeds;
        newDiv6.innerHTML = data.availableBeds;
        anchor.innerHTML = data.contact;
        if( data.updatedUser && data.updatedDate && data.updatedTime ) {
          span.innerHTML = "Last update: " + data.updatedUser + ", " + data.updatedDate + ", " + data.updatedTime;
        } else {
          span.innerHTML = "Last update: Initial";
        }
        
        
        icuWrapperDiv.appendChild(newDiv2);
        newDiv7.appendChild(anchor);
        editAnchor.innerHTML = '<svg width="13px" height="13px" viewBox="-2.56 0 89.725 89.725" xmlns="http://www.w3.org/2000/svg"><g id="Group_11" data-name="Group 11" transform="translate(-1020.3 -668.175)"><path id="Path_53" data-name="Path 53" d="M1066.1,682.8l-34.8,34.8a3.858,3.858,0,0,0-1.1,2.2l-.8,10.1a2.488,2.488,0,0,0,2.8,2.8l9.8-.8a3.857,3.857,0,0,0,2.2-1.1l35-35a3.041,3.041,0,0,0,.3-4.3l-9.1-9.1A3.052,3.052,0,0,0,1066.1,682.8Z" fill="none" stroke="#2b4ea2" stroke-miterlimit="10" stroke-width="4"/><path id="Path_54" data-name="Path 54" d="M1079.6,690.2l-7.8-7.8a3.684,3.684,0,0,1,0-5.3l5.8-5.8a3.684,3.684,0,0,1,5.3,0l7.8,7.8a3.684,3.684,0,0,1,0,5.3l-5.8,5.8A3.869,3.869,0,0,1,1079.6,690.2Z" fill="none" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/><path id="Path_55" data-name="Path 55" d="M1098.6,755.9h-72a4.268,4.268,0,0,1-4.3-4.3v-3.3a4.268,4.268,0,0,1,4.3-4.3h72a4.268,4.268,0,0,1,4.3,4.3v3.3A4.268,4.268,0,0,1,1098.6,755.9Z" fill="none" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/><path id="Path_56" data-name="Path 56" d="M1103.5,739.8" fill="none" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/></g></svg>';
        
        
        newDiv2.appendChild(span);
        

        // Build row
        icuWrapperDiv.appendChild(newDiv2);
        icuWrapperDiv.appendChild(newDiv3);
        icuWrapperDiv.appendChild(newDiv4);
        icuWrapperDiv.appendChild(newDiv5);
        icuWrapperDiv.appendChild(newDiv6);
        icuWrapperDiv.appendChild(newDiv7);

        // Append to table
        icuTableWrap.appendChild(icuWrapperDiv);
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

    function updatePagination(filteredicus = icus) {
      // Calculate the items to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const icuPage = filteredicus.slice(startIndex, endIndex);

      // Display the current page data
      displayICUs(icuPage);

      // Update pagination controls
      createPaginationControls(filteredicus.length);
    }

    // Add search functionality
    const searchBar = document.querySelector("#icu-search");
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      // Filter icus based on the search term
      const filteredicus = icus.filter((icu) =>
        icu.name.toLowerCase().includes(searchTerm)
      );

      currentPage = 1; // Reset to the first page when searching
      updatePagination(filteredicus);
    });

    // Initial display
    updatePagination();

    // Update total icus
    totalicusEl.innerHTML = totalIcus;

  } catch (error) {
    console.error("Error fetching icus:", error);
  }
}

  
  
  getICUdata();
 
  
});