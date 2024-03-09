document.addEventListener('DOMContentLoaded', function() {
    const cities = ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'];
    const citySelect = document.getElementById('city-select');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const cityTitle = document.getElementById('city-title');
    const paginationDiv = document.getElementById('pagination');

    // Pagination variables
    let currentPage = 1;
    const pageSize = 2; // Number of users per page

    // Populate city dropdown
    cities.forEach(city => {
        const option = document.createElement('option');
        option.text = city;
        citySelect.add(option);
    });

    // Function to generate random recycle points
    function getRandomPoints() {
        return Math.floor(Math.random() * 100) + 1; // Random points between 1 and 100
    }

    // Function to update leaderboard for selected city and page
    function updateLeaderboard(city, page) {
        cityTitle.textContent = `${city} Leaderboard`;
        leaderboardBody.innerHTML = ''; // Clear previous data

        // Filter users by selected city
        const usersInCity = users.filter(user => user.city === city);

        // Sort users by points
        usersInCity.sort((a, b) => b.points - a.points);

        // Calculate pagination boundaries
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const usersToShow = usersInCity.slice(startIndex, endIndex);

        // Populate leaderboard table
        usersToShow.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center">${user.name}</td>
                <td class="px-4 py-2 text-center">${user.points}</td>
            `;
            leaderboardBody.appendChild(row);
        });
        

        // Update pagination controls
        updatePagination(page, Math.ceil(usersInCity.length / pageSize));
    }

    // Function to update pagination controls
    function updatePagination(currentPage, totalPages) {
        paginationDiv.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('px-4', 'py-2', 'mr-2', 'bg-gray-200', 'rounded-md', 'hover:bg-gray-300', 'focus:outline-none');
            button.addEventListener('click', function() {
                updateLeaderboard(citySelect.value, i);
            });
            if (i === currentPage) {
                button.classList.add('active');
            }
            paginationDiv.appendChild(button);
        }
    }

    // Event listener for city dropdown change
    citySelect.addEventListener('change', function() {
        currentPage = 1; // Reset current page when city changes
        updateLeaderboard(citySelect.value, currentPage);
    });

    // Dummy data for users in each city
    const users = [
        { name: 'John Doe', city: 'Bucharest', points: getRandomPoints() },
        { name: 'Jane Smith', city: 'Bucharest', points: getRandomPoints() },
        { name: 'Michael Johnson', city: 'Bucharest', points: getRandomPoints() },
        { name: 'Alexandra Popescu', city: 'Bucharest', points: getRandomPoints() },
        { name: 'Andrei Stan', city: 'Bucharest', points: getRandomPoints() },
        { name: 'Maria Ionescu', city: 'Cluj-Napoca', points: getRandomPoints() },
        { name: 'Ion Pop', city: 'Cluj-Napoca', points: getRandomPoints() },
        { name: 'Elena Radu', city: 'Cluj-Napoca', points: getRandomPoints() },
        { name: 'Mihai Georgescu', city: 'Cluj-Napoca', points: getRandomPoints() },
        { name: 'Ana Popa', city: 'Cluj-Napoca', points: getRandomPoints() },
        { name: 'George Popovici', city: 'Timișoara', points: getRandomPoints() },
        { name: 'Cristina Neagu', city: 'Timișoara', points: getRandomPoints() },
        { name: 'Vlad Mihai', city: 'Timișoara', points: getRandomPoints() },
        { name: 'Andreea Vasile', city: 'Timișoara', points: getRandomPoints() },
        { name: 'Marius Radulescu', city: 'Timișoara', points: getRandomPoints() },
        { name: 'Adrian Stoica', city: 'Iași', points: getRandomPoints() },
        { name: 'Ana Maria Ivan', city: 'Iași', points: getRandomPoints() },
        { name: 'Radu Dan', city: 'Iași', points: getRandomPoints() },
        { name: 'Denisa Georgescu', city: 'Iași', points: getRandomPoints() },
        { name: 'Daniel Simionescu', city: 'Iași', points: getRandomPoints() },
        { name: 'Catalin Munteanu', city: 'Constanța', points: getRandomPoints() },
        { name: 'Larisa Andreescu', city: 'Constanța', points: getRandomPoints() },
        { name: 'Mariana Popovici', city: 'Constanța', points: getRandomPoints() },
        { name: 'Adriana Dobrescu', city: 'Constanța', points: getRandomPoints() },
        { name: 'Bogdan Marin', city: 'Constanța', points: getRandomPoints() }
    ];

    // Initially update leaderboard for the first city in the dropdown
    updateLeaderboard(cities[0], currentPage);
});
