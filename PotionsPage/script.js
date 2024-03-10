document.addEventListener('DOMContentLoaded', function() {
    const detailsButton = document.getElementById('detailsButton');
    const function1Container = document.getElementById('function1Container');
    const function2Container = document.getElementById('function2Container');

    detailsButton.addEventListener('click', function() {
        if (function1Container.classList.contains('hidden')) {
            function1Container.classList.remove('hidden');
            function2Container.classList.remove('hidden');
        } else {
            function1Container.classList.add('hidden');
            function2Container.classList.add('hidden');
        }
    });
    
    const redeem1Button = document.getElementById('redeem1');
    const redeem2Button = document.getElementById('redeem2');

    redeem1Button.addEventListener('click', function() {
        var currentPoints = parseInt(document.getElementById('ownPotions').innerHTML
        .replace(" ","").split(":")[1]);
        var pointsNeeded = parseInt(document.getElementById('4500Transaction')
        .innerText.split("-")[1].split(" ")[1]);

        console.log(pointsNeeded);
        if (currentPoints >= pointsNeeded) {
            currentPoints -= pointsNeeded;
            document.getElementById('ownPotions').innerHTML = "Potions: " + currentPoints;
        } else {
            alert("You don't have enough potions to redeem this item");
        }
    });
    redeem2Button.addEventListener('click', function() {
        var currentPoints = parseInt(document.getElementById('ownPotions').innerHTML
        .replace(" ","").split(":")[1]);
        var pointsNeeded = parseInt(document.getElementById('2000Transaction')
        .innerText.split("-")[1].split(" ")[1]);
        if (currentPoints >= pointsNeeded) {
            currentPoints -= pointsNeeded;
            document.getElementById('ownPotions').innerHTML = "Potions: " + currentPoints;
        } else {
            alert("You don't have enough potions to redeem this item");
        }
    });
});
