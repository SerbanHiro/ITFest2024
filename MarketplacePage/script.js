document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0]; // Get the selected file

    if (title.trim() && description.trim() && image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            const imageDataUrl = reader.result;
            const listing = `
                <li>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <img src="${imageDataUrl}" alt="${title}">
                </li>
            `;
            document.getElementById('listings-container').insertAdjacentHTML('beforeend', listing);
        };
        document.getElementById('post-form').reset();
    } else {
        alert('Te rugăm să completezi toate câmpurile.');
    }
});
function displayListings() {
    // Sample listings
    const listings = [
        { title: "Obiect 1", description: "Descriere obiect 1", image: "https://via.placeholder.com/150" },
        { title: "Obiect 2", description: "Descriere obiect 2", image: "https://via.placeholder.com/150" },
        { title: "Obiect 3", description: "Descriere obiect 3", image: "https://via.placeholder.com/150" },
        { title: "Obiect 4", description: "Descriere obiect 4", image: "https://via.placeholder.com/150" },
        { title: "Obiect 5", description: "Descriere obiect 5", image: "https://via.placeholder.com/150" },
        { title: "Obiect 6", description: "Descriere obiect 6", image: "https://via.placeholder.com/150" }
    ];

    const listingsContainer = document.getElementById('listings-container');
    listingsContainer.innerHTML = '';

    listings.forEach(listing => {
        const listingItem = `
            <div class="border p-4">
                <h3>${listing.title}</h3>
                <p>${listing.description}</p>
                <img src="${listing.image}" alt="${listing.title}">
            </div>
        `;
        listingsContainer.insertAdjacentHTML('beforeend', listingItem);
    });
}

function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    // Add the 'active' class to the clicked tab button
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
        if (tablinks[i].textContent === tabName) {
            tablinks[i].classList.add("active");
        }
    }

    // Call the displayListings function if necessary
    if (tabName === 'Cumpara') {
        displayListings();
    }

    // Adjust min-height of the Marketplace section
    adjustMarketplaceHeight();
}

function adjustMarketplaceHeight() {
    const cumparaListingsContainer = document.getElementById('cumpara-listings-container');
    const cumparaListingsHeight = cumparaListingsContainer.offsetHeight;
    const marketplaceSection = document.getElementById('marketplace-section');
    marketplaceSection.style.minHeight = cumparaListingsHeight + 'px';
}

// Show the 'Vinde' tab by default
openTab('Vinde');
