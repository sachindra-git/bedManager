$( document ).ready(function() {
  
async function getHospitalData() {
  try {
    const response = await fetch("/hospitals");
    const hospitals = await response.json();
    const hospitalTableWrap = document.querySelector('.hospital-table .table_body');
    const totalHospitalsEl = document.querySelector('.total-content .total-hospitals');
    const paginationControls = document.querySelector('.pagination-controls'); // Add this container in your HTML
    
    let totalHospitals = hospitals.length;
    let currentPage = 1;
    const itemsPerPage = 15;
    
    hospitals.sort((a, b) => a.name.localeCompare(b.name));

    function displayHospitals(hospitalsPage) {
      hospitalTableWrap.innerHTML = "";

      if (hospitalsPage.length === 0) {
        hospitalTableWrap.innerHTML = "<div class='no-result'>No results found</div>";
        return;
      }

      hospitalsPage.forEach((data) => {
        const HoswrapperDiv = document.createElement('DIV');
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
        anchor.href = 'tel:' + data.contact;

        // Fill content
        newDiv2.innerHTML = data.name;
        newDiv3.innerHTML = data.district;
        newDiv4.innerHTML = data.province;
        newDiv5.innerHTML = data.totalIcus;
        anchor.innerHTML = data.contact;

        // Build row
        newDiv6.appendChild(anchor);
        HoswrapperDiv.appendChild(newDiv2);
        HoswrapperDiv.appendChild(newDiv3);
        HoswrapperDiv.appendChild(newDiv4);
        HoswrapperDiv.appendChild(newDiv5);
        HoswrapperDiv.appendChild(newDiv6);

        // Append to table
        hospitalTableWrap.appendChild(HoswrapperDiv);
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

    function updatePagination(filteredHospitals = hospitals) {
      // Calculate the items to display on the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const hospitalsPage = filteredHospitals.slice(startIndex, endIndex);

      // Display the current page data
      displayHospitals(hospitalsPage);

      // Update pagination controls
      createPaginationControls(filteredHospitals.length);
    }

    // Add search functionality
    const searchBar = document.querySelector("#hospital-search");
    let debounceTimeout;

    searchBar.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();

        // Filter hospitals based on the search term
        const filteredicus = hospitals.filter((hospital) =>
          hospital.name.toLowerCase().includes(searchTerm)
        );

        currentPage = 1; // Reset to the first page when searching
        updatePagination(filteredicus);
      }, 300);
    });

    // Initial display
    updatePagination();

    // Update total hospitals
    totalHospitalsEl.innerHTML = totalHospitals;

  } catch (error) {
    console.error("Error fetching hospitals:", error);
  }
}

  
  
  getHospitalData();
 
  
});