// MOBILE SIDEBAR

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});

// API

const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

const API_URL =
`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=50`;

const marketData = document.getElementById("marketData");
const districtFilter = document.getElementById("districtFilter");
const searchInput = document.getElementById("searchInput");

let allRecords = [];

// CROP IMAGES

const cropImages = {
    Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200",
    Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200",
    Onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200",
    Potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
    Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200"
};

// FETCH DATA

async function fetchMarketPrices(){

    try{

        const response = await fetch(API_URL);
        const data = await response.json();

        allRecords = data.records;

        loadDistricts(allRecords);

        renderTable(allRecords);

        updateTime();

    }

    catch(error){

        console.log(error);

        marketData.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color:red;">
                    Failed to load market prices
                </td>
            </tr>
        `;

    }

}

// LOAD DISTRICTS

function loadDistricts(records){

    const districts = [...new Set(records.map(item => item.district))];

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

// RENDER TABLE

function renderTable(records){

    marketData.innerHTML = "";

    records.forEach(item => {

        const govtPrice = Number(item.min_price);
        const marketPrice = Number(item.modal_price);

        const difference = marketPrice - govtPrice;

        const diffClass = difference >= 0 ? "green" : "red";

        const diffSymbol = difference >= 0 ? "↑" : "↓";

        const image =
            cropImages[item.commodity] ||
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200";

        marketData.innerHTML += `

            <tr>

                <td class="crop-name">
                    <img src="${image}">
                    ${item.commodity}
                </td>

                <td>${item.district}</td>

                <td>${item.market}</td>

                <td>₹${govtPrice}</td>

                <td>₹${marketPrice}</td>

                <td class="${diffClass}">
                    ${difference >= 0 ? '+' : ''}₹${difference} ${diffSymbol}
                </td>

                <td>
                    <button class="save-btn">
                        Save
                    </button>
                </td>

            </tr>

        `;

    });

}

// SEARCH + FILTER

function filterData(){

    const searchValue =
        searchInput.value.toLowerCase();

    const districtValue =
        districtFilter.value;

    const filtered = allRecords.filter(item => {

        const matchSearch =
            item.commodity.toLowerCase()
            .includes(searchValue);

        const matchDistrict =
            districtValue === "" ||
            item.district === districtValue;

        return matchSearch && matchDistrict;

    });

    renderTable(filtered);

}

// UPDATE TIME

function updateTime(){

    const now = new Date();

    document.getElementById("updateTime").innerText =
        "Last Updated : " +
        now.toLocaleDateString() +
        " " +
        now.toLocaleTimeString();

}

// EVENTS

searchInput.addEventListener("keyup", filterData);

districtFilter.addEventListener("change", filterData);

// INITIAL LOAD

fetchMarketPrices();

// AUTO REFRESH

setInterval(fetchMarketPrices, 300000);