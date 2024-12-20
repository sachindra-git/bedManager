// common.js

// Function to populate components with checkboxes and handle deletions
async function populateComponentsList(componentsListContainerId) {
  try {
    const componentsListContainer = document.getElementById(
      componentsListContainerId
    );

    // Fetch all components
    const response = await fetch("/components");
    const components = await response.json();
    
    

    // Display components with checkboxes
    componentsListContainer.innerHTML = components
      .map(
        (component) =>
          `<div>
        <label>
          <input type="checkbox" name="selectedComponents" value="${component._id}">
          ${component.name}
        </label>
      </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error populating components list:", error);
  }
}

// Function to delete selected components
async function deleteSelectedComponents() {
  try {
    // Get the selected component IDs
    const selectedComponents = document.querySelectorAll(
      'input[name="selectedComponents"]:checked'
    );
    const componentIds = Array.from(selectedComponents).map(
      (input) => input.value
    );

    console.log("Selected Component IDs:", componentIds); // Add this line

    if (componentIds.length === 0) {
      alert("Please select components to delete.");
      return;
    }

    // Confirm the deletion
    const confirmMessage = `Are you sure you want to delete the selected components?`;
    if (confirm(confirmMessage)) {
      // Perform the deletion
      await Promise.all(
        componentIds.map(async (componentId) => {
          await fetch(`/components/delete/${componentId}`, {
            method: "DELETE",
          });
        })
      );

      // Redirect to the components list page or perform any other action
      //window.location.href = 'file:///D:/Office%20Documents/my_projects/time-guesstimate-web/delete.html';
      location.reload();
    }
  } catch (error) {
    console.error("Error deleting components:", error);
  }
}

// Function to populate components with checkboxes and handle update
async function updateComponentsList(componentsListContainerId) {
  try {
    const componentsListContainer = document.getElementById(
      componentsListContainerId
    );

    // Fetch all components
    const response = await fetch("/components");
    const components = await response.json();

    // Clear existing content
    componentsListContainer.innerHTML = "";

    components.forEach((component) => {
      // Create a container for each component
      const componentContainer = document.createElement("div");
      componentContainer.classList.add("update-list");

      // Construct the options HTML
      let optionsHTML = "";
      if (component.options && component.options.length > 1) {
        optionsHTML += `<div class="option-title">Options:</div>`;
      }
      optionsHTML += `<div class="options-container">`;
      optionsHTML += component.options
        .map(
          (option) => `
            <div>
              <label>
                <input type="text" name="optionName" value="${option.name}" data-option-id="${option._id}">
                <input type="number" name="optionDefaultTime" value="${option.defaultTime}" data-option-id="${option._id}">
              </label>
            </div>
          `
        )
        .join("");
      optionsHTML += `</div>`;

      // Set the inner HTML of the component container
      componentContainer.innerHTML = `
        <label class="text-style">
          <input type="checkbox" name="selectedComponents" value="${component._id}">
          Click here to Update This Component
        </label>
        <div class="text-style input-st">
          Name: <input type="text" class="text-style custom-input" name="componentName" data-component-id="${component._id}" value="${component.name}">
        </div>
        <p class="text-style input-st">
          Default Time: <input type="number" class="text-style custom-input"  name="defaultTime" data-component-id="${component._id}" value="${component.defaultTime}">
        </p>
        <p class="text-style input-st">
          Default Elements: <input type="text" class="text-style custom-input"  name="defaultElements" data-component-id="${component._id}" value="${component.defaultElements}">
        </p>
        <p class="text-style input-st">
          Reference Link: <input type="url" class="text-style custom-input"  name="referenceLink" data-component-id="${component._id}" value="${component.referenceLink}">
        </p>
        ${optionsHTML}
      `;

      // Append the component container to the main container
      componentsListContainer.appendChild(componentContainer);
    });
  } catch (error) {
    console.error("Error populating components list:", error);
  }
}


// Function to update selected components
async function updateSelectedComponents() {
  try {
    const selectedComponents = document.querySelectorAll(
      'input[name="selectedComponents"]:checked'
    );
    const componentIds = Array.from(selectedComponents).map(
      (input) => input.value
    );

    if (componentIds.length === 0) {
      alert("Please select components to update.");
      return;
    }

    // Confirm the update
    const confirmMessage = `Are you sure you want to update the selected components?`;
    
    if (confirm(confirmMessage)) {
      
      // Fetch all components
      const response = await fetch("/components");
      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }
      const components = await response.json();

      const updates = components
        .filter((component) => componentIds.includes(component._id))
        .map((component) => {
          
          console.log(component)
          
          return {
            _id: component._id,
            name:
              document.querySelector(
                `input[name="componentName"][data-component-id="${component._id}"]`
              )?.value || component.name,
            defaultTime:
              document.querySelector(
                `input[name="defaultTime"][data-component-id="${component._id}"]`
              )?.value || component.defaultTime,
            defaultElements:
              document.querySelector(
                `input[name="defaultElements"][data-component-id="${component._id}"]`
              )?.value || component.defaultElements,
            referenceLink:
              document.querySelector(
                `input[name="referenceLink"][data-component-id="${component._id}"]`
              )?.value || component.referenceLink,
            options: component.options.map((option) => ({
              _id: option._id,
              name:
                document.querySelector(
                  `input[name="optionName"][data-option-id="${option._id}"]`
                )?.value || option.name,
              defaultTime:
                document.querySelector(
                  `input[name="optionDefaultTime"][data-option-id="${option._id}"]`
                )?.value || option.defaultTime,
            })),
          };
        });

      // Log the updated data
      console.log("Updated Components Data:", updates);

      await Promise.all(
        updates.map(async (update) => {
          console.log(`Sending update for Component ID: ${update._id}`); // Add logging to check ID

          const updateResponse = await fetch(
            `/components/update/${update._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: update.name,
                defaultTime: update.defaultTime,
                defaultElements: update.defaultElements,
                referenceLink: update.referenceLink,
                options: update.options,
              }),
            }
          );

          if (!updateResponse.ok) {
            throw new Error(
              `Failed to update component with ID: ${update._id}`
            );
          }
          console.log(`Successfully updated Component ID: ${update._id}`);
        })
      );

      // Optionally reload the page or update the UI
       location.reload();
    }
  } catch (error) {
    console.error("Error updating components:", error);
  }
}
