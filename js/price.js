// ===============================
// SIDEBAR TOGGLE
// ===============================

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");

    });

}


// ===============================
// REFRESH BUTTON
// ===============================

const refreshBtn = document.querySelector(".refresh-btn");

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

        alert("Market Prices Refreshed Successfully!");

    });

}


// ===============================
// SAVE BUTTONS
// ===============================

const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.innerText = "Saved";
        button.style.backgroundColor = "#555";
        button.disabled = true;

    });

});


// ===============================
// SEARCH FUNCTION
// ===============================

const searchInput = document.querySelector(".top-box input");
const tableRows = document.querySelectorAll("tbody tr");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const searchText = searchInput.value.toLowerCase();

        tableRows.forEach((row) => {

            const cropName = row.querySelector(".crop-name").innerText.toLowerCase();

            if (cropName.includes(searchText)) {

                row.style.display = "table-row";

            } else {

                row.style.display = "none";

            }

        });

    });

}


const districtSelect = document.querySelector("select");

if (districtSelect) {

    districtSelect.addEventListener("change", () => {

        const selectedDistrict = districtSelect.value.toLowerCase();

        tableRows.forEach((row) => {

            const districtName = row.children[1].innerText.toLowerCase();

            if (
                selectedDistrict === "all districts" ||
                districtName === selectedDistrict
            ) {

                row.style.display = "table-row";

            } else {

                row.style.display = "none";

            }

        });

    });

}