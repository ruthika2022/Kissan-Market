// ======================================
// API
// ======================================

const API_KEY =
"579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

const API_URL =
`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=50`;


// ======================================
// HTML ELEMENTS
// ======================================

const marketData =
document.getElementById("marketData");

const districtFilter =
document.getElementById("districtFilter");

const searchInput =
document.getElementById("searchInput");

const quantityUnit =
document.getElementById("quantityUnit");


// ======================================
// STORE RECORDS
// ======================================

let allRecords = [];


// ======================================
// FETCH DATA
// ======================================

async function fetchMarketPrices(){

    try{

        const response =
        await fetch(API_URL);

        const data =
        await response.json();

        allRecords =
        data.records;

        loadDistricts(allRecords);

        renderTable(allRecords);

        updateTime();

    }

    catch(error){

        console.log(error);

        marketData.innerHTML = `

            <tr>

                <td colspan="7"
                    style="
                    color:red;
                    text-align:center;
                    padding:20px;
                    ">

                    Failed To Load Data

                </td>

            </tr>

        `;

    }

}


// ======================================
// LOAD DISTRICTS
// ======================================

function loadDistricts(records){

    const districts =

    [...new Set(
        records.map(item => item.district)
    )];

    districtFilter.innerHTML =
    `<option value="">All Districts</option>`;

    districts.forEach(district => {

        districtFilter.innerHTML += `

            <option value="${district}">
                ${district}
            </option>

        `;

    });

}


// ======================================
// RENDER TABLE
// ======================================

function renderTable(records){

    marketData.innerHTML = "";

    const selectedUnit =
    quantityUnit.value;

    records.forEach(item => {

        const govtPrice =
        Number(item.min_price);

        const marketPrice =
        Number(item.modal_price);

        const difference =
        marketPrice - govtPrice;

        const diffClass =
        difference >= 0 ? "green" : "red";

        const diffSymbol =
        difference >= 0 ? "↑" : "↓";


        // ==========================
        // UNIT VALUES
        // ==========================

        let govtUnitPrice = "";
        let marketUnitPrice = "";
        let diffUnitPrice = "";
        let unitText = "";


        // KG

        if(selectedUnit === "Kg"){

            govtUnitPrice =
            Math.round(govtPrice / 100);

            marketUnitPrice =
            Math.round(marketPrice / 100);

            diffUnitPrice =
            Math.round(difference / 100);

            unitText = "Per Kg";

        }


        // TON

        else if(selectedUnit === "Ton"){

            govtUnitPrice =
            govtPrice;

            marketUnitPrice =
            marketPrice;

            diffUnitPrice =
            difference;

            unitText = "Per Ton";

        }


        // QUINTAL

        else if(selectedUnit === "Quintal"){

            govtUnitPrice =
            Math.round(govtPrice / 10);

            marketUnitPrice =
            Math.round(marketPrice / 10);

            diffUnitPrice =
            Math.round(difference / 10);

            unitText = "Per Quintal";

        }


        // DOZEN

        else if(selectedUnit === "Dozen"){

            govtUnitPrice =
            Math.round(govtPrice / 12);

            marketUnitPrice =
            Math.round(marketPrice / 12);

            diffUnitPrice =
            Math.round(difference / 12);

            unitText = "Per Dozen";

        }


        // DEFAULT

        else{

            govtUnitPrice = "-";

            marketUnitPrice = "-";

            diffUnitPrice = "-";

            unitText = "";

        }


        // ==========================
        // TABLE ROW
        // ==========================

        marketData.innerHTML += `

            <tr>

                <td>
                    ${item.commodity}
                </td>

                <td>
                    ${item.district}
                </td>

                <td>
                    ${item.market}
                </td>

                <!-- GOVT PRICE -->

                <td>

                    ₹${govtUnitPrice}

                    ${unitText}

                </td>

                <!-- MARKET PRICE -->

                <td>

                    ₹${marketUnitPrice}

                    ${unitText}

                </td>

                <!-- DIFFERENCE -->

                <td class="${diffClass}">

                    ₹${diffUnitPrice}

                    ${unitText}

                </td>

                <!-- UNIT -->

                <td>

                    ${selectedUnit || "No Unit"}

                </td>

            </tr>

        `;

    });

}


// ======================================
// FILTER DATA
// ======================================

function filterData(){

    const searchValue =
    searchInput.value.toLowerCase();

    const districtValue =
    districtFilter.value;

    const filtered = allRecords.filter(item => {

        const matchSearch =

        item.commodity
        .toLowerCase()
        .includes(searchValue);

        const matchDistrict =

        districtValue === ""

        ||

        item.district === districtValue;

        return matchSearch && matchDistrict;

    });

    renderTable(filtered);

}


// ======================================
// UPDATE TIME
// ======================================

function updateTime(){

    const now = new Date();

    document.getElementById("updateTime").innerText =

    "Last Updated : "

    +

    now.toLocaleDateString()

    +

    " "

    +

    now.toLocaleTimeString();

}


// ======================================
// EVENTS
// ======================================

searchInput.addEventListener(
    "keyup",
    filterData
);

districtFilter.addEventListener(
    "change",
    filterData
);

quantityUnit.addEventListener(
    "change",
    function(){

        renderTable(allRecords);

    }
);


// ======================================
// INITIAL LOAD
// ======================================

fetchMarketPrices();


// ======================================
// AUTO REFRESH
// ======================================

setInterval(
    fetchMarketPrices,
    300000
);