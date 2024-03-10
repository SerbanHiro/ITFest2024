// Debris types data with associated companies
const debrisServices = {
    mobila: [
      { company: "Company A", price: "$100" },
      { company: "Company B", price: "$120" },
      { company: "Company C", price: "$90" }
    ],
    deconstructii: [
      { company: "Company X", price: "$150" },
      { company: "Company Y", price: "$180" },
      { company: "Company Z", price: "$200" }
    ],
    electronice: [
      { company: "Company M", price: "$80" },
      { company: "Company N", price: "$100" },
      { company: "Company O", price: "$120" }
    ],
    textile: [
      { company: "Company T", price: "$50" },
      { company: "Company U", price: "$60" },
      { company: "Company V", price: "$70" }
    ],
    biodegradabile: [
      { company: "Company P", price: "$40" },
      { company: "Company Q", price: "$45" },
      { company: "Company R", price: "$50" }
    ],
    sticla: [
      { company: "Company S", price: "$30" },
      { company: "Company W", price: "$35" },
      { company: "Company K", price: "$40" }
    ]
  };
  
  function adjustMarketplaceHeight() {
    // Obțineți containerul pentru listările de cumpărături și înălțimea acestuia
    const offersDiv = document.getElementById('offers');
    const offersHeight = offersDiv.offsetHeight;
    
    // Obțineți secțiunea de marketplace și setați înălțimea minimă a acesteia
    const marketplaceSection = document.getElementById('services'); // Schimbați cu ID-ul corect al secțiunii de marketplace
    marketplaceSection.style.minHeight = offersHeight + 'px';
  }
  
  
  // Function to generate HTML options for debris types
  // Function to generate HTML options for debris types
  function populateDebrisTypes() {
    const select = document.getElementById("debrisType");
    for (const [key, value] of Object.entries(debrisServices)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
      select.appendChild(option);
    }
  
    // Add this code to remove upward movement blocking
    const textSection = document.getElementById('services');
    textSection.classList.remove('blocked-upward-movement');
  }
  
  
  // Function to get offers
  function getOffers() {
    const debrisType = document.getElementById("debrisType").value;
    const offersDiv = document.getElementById("offers");
    const offers = debrisServices[debrisType];
  
    const textSection = document.getElementById('services');
    if (debrisType !== '') {
      populateDebrisTypes
    } else {
      textSection.classList.remove('blocked-upward-movement');
    }
  
    // Create the table
  const table = document.createElement("table");
  table.classList.add("table-auto", "border-collapse", "border", "border-gray-800");
  table.style.margin = "0 auto"; // Center the table horizontally
  
  // Create the table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Companie", "Preț"];
  headers.forEach(headerText => {
    const header = document.createElement("th");
    header.classList.add("p-4", "text-gray-800", "font-bold", "border", "border-gray-600");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create the table body
  const tbody = document.createElement("tbody");
  tbody.style.textAlign = "center"; // Center the contents of the table cells
  
  offers.forEach(offer => {
    const row = document.createElement("tr");
    const companyCell = document.createElement("td");
    companyCell.classList.add("p-4", "text-gray-800", "border", "border-gray-600");
    companyCell.textContent = offer.company;
    row.appendChild(companyCell);
  
    const priceCell = document.createElement("td");
    priceCell.classList.add("p-4", "text-gray-800", "border", "border-gray-600");
    priceCell.textContent = offer.price;
    row.appendChild(priceCell);
  
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  
  
    // Clear the offers div and append the table
  
    offersDiv.innerHTML = "<h3>Oferte disponibile:</h3>";
    offersDiv.appendChild(table);
  }
  
  // Function to handle form submission
  function handleBooking(event) {
    event.preventDefault();
    const pickupDate = document.getElementById("pickupDate").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const streetAddress = document.getElementById("streetAddress").value;
    const bookingMessage = document.getElementById("bookingMessage");
    bookingMessage.innerHTML = "<p>Programarea pentru data " + pickupDate + " la ora " + pickupTime + " a fost realizată la adresa: " + streetAddress + ".</p>";
  }
  
  // Call the function to populate debris types when the page loads
  window.onload = function() {
    populateDebrisTypes();
    const bookingForm = document.getElementById("bookingForm");
    bookingForm.addEventListener("submit", handleBooking);
  };
  // Function to handle form submission
  function handleBooking(event) {
    event.preventDefault();
    const pickupDate = document.getElementById("pickupDate").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const streetAddress = document.getElementById("streetAddress").value;
    const bookingMessage = document.getElementById("bookingMessage");
    const debrisType = document.getElementById("debrisType").value;
  
    if (pickupDate && pickupTime && streetAddress && debrisType) {
      bookingMessage.innerHTML = "<p>Programarea pentru data " + pickupDate + " la ora " + pickupTime + " a fost realizată cu succes la adresa: " + streetAddress + " pentru colectarea deșeurilor de tipul " + debrisType + ".</p>";
    } else {
      bookingMessage.innerHTML = "<p>Vă rugăm să completați toate câmpurile.</p>";
    }
  }
  
  // Call the function to populate debris types when the page loads
  window.onload = function() {
    populateDebrisTypes();
    const bookingForm = document.getElementById("bookingForm");
    bookingForm.addEventListener("submit", handleBooking);
  };