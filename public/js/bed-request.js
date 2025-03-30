$(document).ready(function () {
  const pickerFrom = new Pikaday({
    field: document.getElementById("req-search-from"),
    format: "DD/MM/YYYY",
    firstDay: 1,
    toString(date) {
      return formatDate(date);
    },
  });

  const pickerTo = new Pikaday({
    field: document.getElementById("req-search-to"),
    format: "DD/MM/YYYY",
    firstDay: 1,
    toString(date) {
      return formatDate(date);
    },
  });

  async function getReqData() {
    try {
      const response = await fetch("/bedreq");
      const bedreqs = await response.json();
      let filteredReqs = [...bedreqs];
      let currentPage = 1;
      const itemsPerPage = 5;
      const totalReqsEl = document.querySelector('.total-content .total-req');
      
      let totalReqs = bedreqs.length;

      function parseDDMMYYYY(dateStr) {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}`);
      }

      function filterByDate() {
        const fromDate = parseDDMMYYYY(document.getElementById("req-search-from").value);
        const toDate = parseDDMMYYYY(document.getElementById("req-search-to").value);

        filteredReqs = bedreqs.filter((req) => {
          const reqDate = parseDDMMYYYY(req.reqDate);
          return (!fromDate || reqDate >= fromDate) && (!toDate || reqDate <= toDate);
        });

        currentPage = 1;
        updatePagination();
      }

      function clearFilter() {
        document.getElementById("req-search-from").value = "";
        document.getElementById("req-search-to").value = "";
        pickerFrom.setDate(null);
        pickerTo.setDate(null);
        filteredReqs = [...bedreqs];
        currentPage = 1;
        updatePagination();
      }

      function displayReq(reqPage) {
        const reqTableWrap = document.querySelector(".table_body");
        reqTableWrap.innerHTML = "";

        if (reqPage.length === 0) {
          reqTableWrap.innerHTML = "<div class='no-result'>No results found</div>";
          return;
        }
        reqPage.forEach((data) => {
          const reqRow = document.createElement("DIV");
          reqRow.classList.add("table_row");
          
          reqRow.innerHTML = `
            <div class="date">${data.reqDate}</div>
            <div class="p-name">${data.patientName}</div>
            <div class="p-age">${data.patientAge}</div>
            <div class="hos-name">${data.hospitalName}</div>
            <div class="ward-no">${data.wardNumber}</div>
            <div class="p-status">${data.patientStatus}</div>
            <div class="req-status">${data.bedRequestStatus}</div>
          `;
          reqTableWrap.appendChild(reqRow);
        });
      }

      function createPaginationControls(totalItems) {
        const paginationControls = document.querySelector(".pagination-controls");
        paginationControls.innerHTML = "";
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        function createButton(label, disabled, onClick) {
          const button = document.createElement("button");
          button.textContent = label;
          button.disabled = disabled;
          button.addEventListener("click", onClick);
          paginationControls.appendChild(button);
        }

        createButton("<< Previous", currentPage === 1, () => {
          if (currentPage > 1) {
            currentPage--;
            updatePagination();
          }
        });

        for (let i = 1; i <= totalPages; i++) {
          createButton(i, i === currentPage, () => {
            currentPage = i;
            updatePagination();
          });
        }

        createButton("Next >>", currentPage === totalPages, () => {
          if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
          }
        });
      }

      function updatePagination() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const reqPage = filteredReqs.slice(startIndex, endIndex);
        displayReq(reqPage);
        createPaginationControls(filteredReqs.length);
      }

      document.getElementById("req-search-from").addEventListener("change", filterByDate);
      document.getElementById("req-search-to").addEventListener("change", filterByDate);
      document.getElementById("clear-filter").addEventListener("click", clearFilter);

      updatePagination();
      
      totalReqsEl.innerHTML = totalReqs;
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getReqData();
});
