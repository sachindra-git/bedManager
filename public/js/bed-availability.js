$( document ).ready(function() {
  
async function getICUdata() {
  try {
    const response = await fetch("/icus");
    const icus = await response.json();
    const icuTableWrap = document.querySelector('.icu-table .table_body');
    const totalicusEl = document.querySelector('.total-content .total-icus');
    const totalBedsEl = document.querySelector('.total-content .total-beds');
    const paginationControls = document.querySelector('.pagination-controls'); // Add this container in your HTML
    
    let totalAvailableIcus = 0;
    let totalAvailableBeds = 0;
    let currentPage = 1;
    const itemsPerPage = 15;

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
        const anchor = document.createElement('a');

        icuWrapperDiv.classList.add('table_row');
        newDiv2.classList.add('name');
        newDiv3.classList.add('available-beds');
        newDiv4.classList.add('contact');
        anchor.classList.add('contact-link');
        anchor.href = 'tel:' + data.contact;
        

        // Fill content
        newDiv2.innerHTML = data.name;
        newDiv3.innerHTML = data.availableBeds;
        anchor.innerHTML = data.contact;
        newDiv4.appendChild(anchor);

        // Build row
        icuWrapperDiv.appendChild(newDiv2);
        icuWrapperDiv.appendChild(newDiv3);
        icuWrapperDiv.appendChild(newDiv4);

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
      
      const availableICUs = filteredicus.filter((icu) =>
        icu.availableBeds > 0
      );
      
      totalAvailableIcus = availableICUs.length; 
      availableICUs.forEach(icus => totalAvailableBeds += icus.availableBeds);
      
      const icuPage = availableICUs.slice(startIndex, endIndex);
      
      // Display the current page data
      displayICUs(icuPage);

      // Update pagination controls
      createPaginationControls(availableICUs.length);
    }

    // Add search functionality
    const searchBar = document.querySelector("#icu-search");
    let debounceTimeout;

    searchBar.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();

        // Filter icus based on the search term
        const filteredicus = icus.filter((icu) =>
          icu.name.toLowerCase().includes(searchTerm)
        );

        currentPage = 1; // Reset to the first page when searching
        updatePagination(filteredicus);
      }, 300);
    });

    // Initial display
    updatePagination();

    // Update total icus
    totalicusEl.innerHTML = totalAvailableIcus;
    // Update total Beds
    totalBedsEl.innerHTML = totalAvailableBeds;
  } catch (error) {
    console.error("Error fetching icus:", error);
  }
}

  
  
  getICUdata();
 
  
});