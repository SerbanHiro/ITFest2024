mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsMjIxIiwiYSI6ImNsdGl4M3dnazBkcjYyam8xMzNqYmt0aTIifQ.bBaKbk6zJQcirPAjBlgRKw';


function aruncaGunoiMenajer(index) {
    var pubela = pubeleMenajer[index];
    if(pubela.fillRate>=100){
        alert('Pubela este plină!');
        return;
    }
    const selectElement = document.getElementById('dimensiune');
    const selectedValue = selectElement.value;
    switch(selectedValue) {
        case 'mica':
            pubela.fillRate+=3;
            break;
        case 'medie':
            pubela.fillRate+=5;
            break;
        case 'mare':
            pubela.fillRate+=7;
            break;
    }
    if(pubela.fillRate>100){    
        pubela.fillRate=100;
    }
    console.log('Gunoiul a fost aruncat!');
    document.getElementById("showFill").innerHTML = `Rată de umplere: ${pubela.fillRate}`;
}

function aruncaGunoiReciclabil(index) {
    var pubela = pubeleReciclabil[index];
    if(pubela.fillRate>=100){
        alert('Pubela este plină!');
        return;
    }
    const selectElement = document.getElementById('dimensiune');
    const selectedValue = selectElement.value;
    switch(selectedValue) {
        case 'mica':
            pubela.fillRate+=3;
            break;
        case 'medie':
            pubela.fillRate+=5;
            break;
        case 'mare':
            pubela.fillRate+=7;
            break;
    }
    if(pubela.fillRate>100){    
        pubela.fillRate=100;
    }
    console.log('Gunoiul a fost aruncat!');
    document.getElementById("showFill").innerHTML = `Rată de umplere: ${pubela.fillRate}`;
}


// Get user's current location
navigator.geolocation.getCurrentPosition(success, error);

const minLng= 21.1865;
const minLat= 45.6975;
const maxLng= 21.3326;
const maxLat= 45.8419;

var pubeleMenajer = [];
var pubeleReciclabil = [];
var pubeleSticla = [];

const timisoaraPerimeterCoordinates = [
    [21.19425807451313, 45.77653322891817],
    [21.177153172527994, 45.76576200434283],
    [21.180477443933853, 45.75258507348528],
    [21.177745515384743, 45.74943535300915],
    [21.17881531537418, 45.744461887089386],
    [21.180282019554056, 45.741892612541164],
    [21.175726065400283, 45.74120129620266],
    [21.176715733721608, 45.73760725082397],
    [21.175525783115717, 45.73055639189545],
    [21.166808209262086, 45.723227272995985],
    [21.17730622628622, 45.71907927670918],
    [21.189071468414284, 45.72549556893023],
    [21.197276040182857, 45.720273416526254],
    [21.191483624669445, 45.71302796666623],
    [21.21103261520784, 45.71033508634076],
    [21.214894142678133, 45.710841392151394],
    [21.232267935538687, 45.70730416544086],
    [21.24384998412785, 45.705619656606785],
    [21.254466907362115, 45.7135395570844],
    [21.268220037086508, 45.716403737983],
    [21.27087413054977, 45.72044670980185],
    [21.278112596682405, 45.720951792627915],
    [21.279801582824064, 45.724826011214475],
    [21.27907773112406, 45.729205334929645],
    [21.270632849627646, 45.73341612082132],
    [21.272563105733298, 45.736279096760995],
    [21.266048501550927, 45.73678433341988],
    [21.266530918302465, 45.74250931212882],
    [21.279077714762025, 45.742509774059215],
    [21.28510975791619, 45.74671928233005],
    [21.291141801069273, 45.752443704189574],
    [21.281490532023554, 45.75597908322399],
    [21.28149053202361, 45.75850421684015],
    [21.288246420356387, 45.75917756650577],
    [21.288004364206756, 45.7702869444243],
    [21.28390231896995, 45.77499886061821],
    [21.279800990039917, 45.77819564944352],
    [21.277147349134708, 45.777354253566614],
    [21.268222212067883, 45.78155997420711],
    [21.257129078001583, 45.78122248762497],
    [21.253510383262068, 45.77853137585936],
    [21.24506749317402, 45.78122301306041],
    [21.236374606443064, 45.78290715832608],
    [21.219482417624874, 45.787955360573875],
    [21.20548693187834, 45.78122526358811],
    [21.19425807451313, 45.77653322891817]
];

var userLat=-1;
var userLng=-1;

var tempLat=-1;
var tempLng=-1;

window.onload = async function() {
    let path = window.location.href;
    if(!path.includes("?")) return;
    var material = path.split("?")[1];
    switch(material.toLowerCase()) {
        case "glass":  {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // Funcția pentru calcularea distanței dintre două puncte pe sferă (Haversine formula)
                    function haversineDistance(lat1, lon1, lat2, lon2) {
                        const R = 6371; // Raza Pământului în kilometri
                        const dLat = (lat2 - lat1) * Math.PI / 180;
                        const dLon = (lon2 - lon1) * Math.PI / 180;
                        const a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        const d = R * c; // Distanta in km  
                        return d;
                    }

                    // Cel mai mare număr posibil pentru distanță
                    let minDistance = Number.MAX_VALUE;
                    // Pubela cea mai apropiată
                    let nearestBin;

                    // Iterăm prin toate pubelile de sticlă pentru a găsi cea mai apropiată
                    for (const bin of pubeleSticla) {
                        const distance = haversineDistance(userLat, userLng, bin.lngLat[1], bin.lngLat[0]);
                        if (distance < minDistance) {
                            minDistance = distance;
                            nearestBin = bin;
                        }
                    }

                    console.log(nearestBin);

                    tempLat = nearestBin.lngLat[1];
                    tempLng = nearestBin.lngLat[0];
                    
                    // map.flyTo({
                    //     center: [nearestBin.lngLat[1], nearestBin.lngLat[0]], // Coordonatele markerului pubelii de sticlă
                    //     zoom: 15, // Nivelul de zoom al hărții
                    //     essential: true // Indicăm că este o acțiune esențială pentru harta
                    // });

                    // nearestBin conține acum cea mai apropiată pubelă de sticlă
                    console.log("Cea mai apropiată pubelă de sticlă este la o distanță de: " + minDistance.toFixed(2) + " km");
                    console.log("Coordonatele publei: Latitudine - " + nearestBin.lngLat[1] + ", Longitudine - " + nearestBin.lngLat[0]);
                });
            } else {
                console.log("Geolocation nu este suportat de acest browser.");
            }
        }
            break;
        case "plastic":
        case "metal":
        case "paper":
        case "cardboard":

            break;
        case "shoes":
        case "clothes":

            break;
        case "battery":

            break;
    }
}
 
function isPointInPath(y, x) {
    let c = false;
    for (let i = 1; i < timisoaraPerimeterCoordinates.length; i++) {
        let [ax, ay] = timisoaraPerimeterCoordinates[i];
        let [bx, by] = timisoaraPerimeterCoordinates[i - 1];
        if (x === ax && y === ay) {
            // point is a corner
            return true;
        }
        if ((ay > y) != (by > y)) {
            let slope = (x - ax) * (by - ay) - (bx - ax) * (y - ay);
            if (slope === 0) {
                // point is on boundary
                return true;
            }
            if ((slope < 0) !== (by < ay)) {
                c = !c;
            }
        }
    }
    return c;
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    userLat=latitude;
    userLng=longitude;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/daniel221/cltj97xd900fk01pkebjn9iyr', // Replace with your custom Mapbox style URL
        minZoom: 13, // Adjust the minimum zoom level as needed
        maxZoom: 20, // Adjust the maximum zoom level as needed
        zoom: 17, // Adjust the initial zoom level as needed
        center: [longitude, latitude] // Center the map on the user's location
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', function () {
        map.addLayer({
            "id": "timisoara-perimeter",
            "type": "fill",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [timisoaraPerimeterCoordinates]
                    }
                }
            },
            "layout": {},
            "paint": {
                "fill-color": "#0080ff",
                "fill-opacity": 0
            }
        });
        if(tempLat!=-1&&tempLng!=-1) {
            map.flyTo({
                center: [tempLng, tempLat], 
                zoom: 17, 
                essential: true 
            });
            tempLat=tempLng=-1;
        }
    });

const numMarkers = 750;
// Generăm markerii în interiorul poligonului Timișoarei
for (let i = 0; i < numMarkers; i++) {
    const randomLng = Math.random() * (maxLng - minLng) + minLng;
    const randomLat = Math.random() * (maxLat - minLat) + minLat;

    const fillRate = Math.floor(Math.random() * 100) + 1;
    // Verificăm dacă markerul generat se află în interiorul poligonului Timișoarei
    const isInsideTimisoara = isPointInPath(randomLat, randomLng);

    if (isInsideTimisoara) {
        const pubelaMenajer = {
            lngLat: [randomLng, randomLat],
            imageSrc: '../Images/dumpster-svgrepo-com.svg',
            width: 60,
            height: 60,
            fillRate: fillRate
        };
        pubeleMenajer.push(pubelaMenajer); // Adaugă markerul în vectorul de marcaje
    }
}
    // Afisează marcajele pe hartă și adaugă-le în vector
    pubeleMenajer.forEach((pubelaMenajer, index, fillRate) => {
        const pubelaMenajerImg = new Image();
        pubelaMenajerImg.onload = function() {
            // După ce imaginea s-a încărcat, adăugați markerul în vector și pe hartă
            // console.log(pubelaMenajer.fillRate);
            const newMarker = new mapboxgl.Marker(pubelaMenajerImg, {
                anchor: 'center',
                width: pubelaMenajer.width,
                height: pubelaMenajer.height
            })
                .setLngLat(pubelaMenajer.lngLat)
                .addTo(map)
                //in locul setPopup de mai jos vreau la setText sa fie  pubela + index scris mai mare si sub sa fie rata de umplere a pubelei


                .setPopup(new mapboxgl.Popup().setHTML(`
                    <div>
                        <div>Pubela ${index}</div>
                        <div id="showFill">Rată de umplere: ${pubelaMenajer.fillRate}</div>
                        <form id="form-dimensiune">
                            <label for="dimensiune">Selectează dimensiunea gunoiului:</label><br>
                            <select id="dimensiune" name="dimensiune">
                                <option value="mica">Mică</option>
                                <option value="medie">Medie</option>
                                <option value="mare">Mare</option>
                            </select><br><br>
                            <button type="button" onclick="aruncaGunoiMenajer(${index})">Arunca Gunoi</button>
                        </form>
                    </div>
                `));
            
 // Adaugă un popup care indică indexul
        pubeleMenajer.push(newMarker);

        // Mărește zona de clic pentru marker
        const clickZoneRadius = 50; // Poți ajusta acest parametru în funcție de dimensiunea dorită a zonei de clic
        const clickZone = document.createElement('div');
        clickZone.style.width = clickZone.style.height = `${clickZoneRadius * 4}px`;
        clickZone.style.borderRadius = '75%';
        clickZone.style.position = 'absolute';
        clickZone.style.top = `-${clickZoneRadius}px`;
        clickZone.style.left = `-${clickZoneRadius}px`;
        clickZone.style.cursor = 'pointer';
        newMarker.getElement().appendChild(clickZone);
    };
    pubelaMenajerImg.src = pubelaMenajer.imageSrc;
});
    
const numMarkersRecy = 100;

    //duplica codul de mai sus pentru o pubela de tip reciclabil
    for (let i = 0; i < numMarkersRecy; i++) {
        const randomLng = Math.random() * (maxLng - minLng) + minLng;
        const randomLat = Math.random() * (maxLat - minLat) + minLat;
        
        const fillRate = Math.floor(Math.random() * 100) + 1;
        // Verificăm dacă markerul generat se află în interiorul poligonului Timișoarei
        // const isInsideTimisoara = turf.booleanPointInPolygon(turf.point([randomLng, randomLat]), turf.polygon([timisoaraPerimeterCoordinates]));
        const isInsideTimisoara = isPointInPath(randomLat,randomLng);
        // console.log(isInsideTimisoara);
        if (isInsideTimisoara) {
            const pubelaReciclabil = {
                lngLat: [randomLng, randomLat],
                imageSrc: '../Images/dumpster-recyclable-svgrepo-com.svg',
                width: 60,
                height: 60,
                fillRate: fillRate
            };
           // console.log(pubelaReciclabil);
            pubeleReciclabil.push(pubelaReciclabil); // Adaugă markerul în vectorul de marcaje
        }
    }

    pubeleReciclabil.forEach((pubelaReciclabil, index, fillRate) => {
        const pubelaReciclabilImg = new Image();
        pubelaReciclabilImg.onload = function() {
            // După ce imaginea s-a încărcat, adăugați markerul în vector și pe hartă
            // console.log(pubelaReciclabil.fillRate);
            const newMarker = new mapboxgl.Marker(pubelaReciclabilImg, {
                anchor: 'center',
                width: pubelaReciclabil.width,
                height: pubelaReciclabil.height
            })
                .setLngLat(pubelaReciclabil.lngLat)
                .addTo(map)
                //in locul setPopup de mai jos vreau la setText sa fie  pubela + index scris mai mare si sub sa fie rata de umplere a pubelei


                .setPopup(new mapboxgl.Popup().setHTML(`
                    <div>
                        <div>Pubela ${index}</div>
                        <div id="showFill">Rată de umplere: ${pubelaReciclabil.fillRate}</div>
                        <form id="form-dimensiune">
                            <label for="dimensiune">Selectează dimensiunea gunoiului:</label><br>
                            <select id="dimensiune" name="dimensiune">
                                <option value="mica">Mică</option>
                                <option value="medie">Medie</option>
                                <option value="mare">Mare</option>
                            </select><br><br>
                            <button type="button" onclick="aruncaGunoiReciclabil(${index})">Arunca Gunoi</button>
                        </form>
                    </div>
                `));
            
 // Adaugă un popup care indică indexul
        pubeleReciclabil.push(newMarker);

        // Mărește zona de clic pentru marker
        const clickZoneRadius = 50; // Poți ajusta acest parametru în funcție de dimensiunea dorită a zonei de clic
        const clickZone = document.createElement('div');
        clickZone.style.width = clickZone.style.height = `${clickZoneRadius * 4}px`;
        clickZone.style.borderRadius = '75%';
        clickZone.style.position = 'absolute';
        clickZone.style.top = `-${clickZoneRadius}px`;
        clickZone.style.left = `-${clickZoneRadius}px`;
        clickZone.style.cursor = 'pointer';
        newMarker.getElement().appendChild(clickZone);
    };
    pubelaReciclabilImg.src = pubelaReciclabil.imageSrc;
    });
    

    const numMarkersGlass = 100;

    //duplica codul de mai sus pentru o pubela de tip reciclabil
    for (let i = 0; i < numMarkersGlass; i++) {
        const randomLng = Math.random() * (maxLng - minLng) + minLng;
        const randomLat = Math.random() * (maxLat - minLat) + minLat;
        
        const fillRate = Math.floor(Math.random() * 100) + 1;
        // Verificăm dacă markerul generat se află în interiorul poligonului Timișoarei
        // const isInsideTimisoara = turf.booleanPointInPolygon(turf.point([randomLng, randomLat]), turf.polygon([timisoaraPerimeterCoordinates]));
        const isInsideTimisoara = isPointInPath(randomLat,randomLng);
        // console.log(isInsideTimisoara);
        if (isInsideTimisoara) {
            const pubelaSticla = {
                lngLat: [randomLng, randomLat],
                imageSrc: '../Images/dumpster-glass.svg',
                width: 60,
                height: 60,
                fillRate: fillRate
            };
            // console.log(pubelaSticla);
            pubeleSticla.push(pubelaSticla); // Adaugă markerul în vectorul de marcaje
        }
    }

    pubeleSticla.forEach((pubelaSticla, index, fillRate) => {
        const pubelaSticlaImg = new Image();
        pubelaSticlaImg.onload = function() {
            // După ce imaginea s-a încărcat, adăugați markerul în vector și pe hartă
            // console.log(pubelaSticla.fillRate);
            const newMarker = new mapboxgl.Marker(pubelaSticlaImg, {
                anchor: 'center',
                width: pubelaSticla.width,
                height: pubelaSticla.height
            })
                .setLngLat(pubelaSticla.lngLat)
                .addTo(map)
                //in locul setPopup de mai jos vreau la setText sa fie  pubela + index scris mai mare si sub sa fie rata de umplere a pubelei


                .setPopup(new mapboxgl.Popup().setHTML(`
                    <div>
                        <div>Pubela ${index}</div>
                        <div id="showFill">Rată de umplere: ${pubelaSticla.fillRate}</div>
                        <form id="form-dimensiune">
                            <label for="dimensiune">Selectează dimensiunea gunoiului:</label><br>
                            <select id="dimensiune" name="dimensiune">
                                <option value="mica">Mică</option>
                                <option value="medie">Medie</option>
                                <option value="mare">Mare</option>
                            </select><br><br>
                            <button type="button" onclick="aruncaGunoiReciclabil(${index})">Arunca Gunoi</button>
                        </form>
                    </div>
                `));
            
 // Adaugă un popup care indică indexul
        pubeleSticla.push(newMarker);

        // Mărește zona de clic pentru marker
        const clickZoneRadius = 50; // Poți ajusta acest parametru în funcție de dimensiunea dorită a zonei de clic
        const clickZone = document.createElement('div');
        clickZone.style.width = clickZone.style.height = `${clickZoneRadius * 4}px`;
        clickZone.style.borderRadius = '75%';
        clickZone.style.position = 'absolute';
        clickZone.style.top = `-${clickZoneRadius}px`;
        clickZone.style.left = `-${clickZoneRadius}px`;
        clickZone.style.cursor = 'pointer';
        newMarker.getElement().appendChild(clickZone);
    };
    pubelaSticlaImg.src = pubelaSticla.imageSrc;
    });


    // Add a popup to the marker
    const popup = new mapboxgl.Popup({ offset: 15 })
        .setHTML('<h3>Wizzard</h3>');

    // Add a marker at the user's location
    const WizzImg = new Image();
    WizzImg.onload = function() {
    // După ce imaginea s-a încărcat, adăugați markerul pe hartă
    new mapboxgl.Marker(WizzImg, {
        anchor: 'center',
        width: 45,
        height: 45
    })

        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);
    };
    WizzImg.src = '../Images/wizz.svg';


    //adauga un cerc in jurul utilizatorului cu functia map.Circle

    map.scrollZoom.enable();

    var text1=document.getElementById("text1");
    text1.remove();
    var text2=document.getElementById("text2");
    text2.remove();


}

function error() {
    console.error('Unable to retrieve your location');
    // If unable to retrieve user's location, center the map on a default location
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/daniel221/cltiy7m6u01e101pjhg9zb34a', // Replace with your custom Mapbox style URL
        minZoom: 13, // Adjust the minimum zoom level as needed
        maxZoom: 20, // Adjust the maximum zoom level as needed
        zoom: 17, // Adjust the initial zoom level as needed
        center: [21.228831, 45.755827] // Coordinates for Timisoara
    });

    map.on('load', function () {
        map.addLayer({
            "id": "timisoara-perimeter",
            "type": "fill",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [timisoaraPerimeterCoordinates]
                    }
                }
            },
            "layout": {},
            "paint": {
                "fill-color": "#0080ff",
                "fill-opacity": 0
            }
        });
    });

    // Numărul de markeri de generat
    const numMarkers = 750;

    // Generăm markerii în interiorul poligonului Timișoarei
    for (let i = 0; i < numMarkers; i++) {
        const randomLng = Math.random() * (maxLng - minLng) + minLng;
        const randomLat = Math.random() * (maxLat - minLat) + minLat;

        // Verificăm dacă markerul generat se află în interiorul poligonului Timișoarei
        // const isInsideTimisoara = turf.booleanPointInPolygon(turf.point([randomLng, randomLat]), turf.polygon([timisoaraPerimeterCoordinates]));
        const isInsideTimisoara = isPointInPath(randomLat,randomLng);
        // console.log(isInsideTimisoara);
        if (isInsideTimisoara) {
            const pubelaMenajerImg = new Image();
            pubelaMenajerImg.onload = function() {
                // După ce imaginea s-a încărcat, adăugați markerul pe hartă
                new mapboxgl.Marker(pubelaMenajerImg, {
                    anchor: 'center',
                    width: 30,
                    height: 30
                })
                    .setLngLat([randomLng, randomLat])
                    .addTo(map);
            };
            pubelaMenajerImg.src = '../Images/dumpster-svgrepo-com.svg';

        }
    }
    
    const numMarkersRecy = 100;

    //duplica codul de mai sus pentru o pubela de tip reciclabil
    for (let i = 0; i < numMarkersRecy; i++) {
        const randomLng = Math.random() * (maxLng - minLng) + minLng;
        const randomLat = Math.random() * (maxLat - minLat) + minLat;

        // Verificăm dacă markerul generat se află în interiorul poligonului Timișoarei
        // const isInsideTimisoara = turf.booleanPointInPolygon(turf.point([randomLng, randomLat]), turf.polygon([timisoaraPerimeterCoordinates]));
        const isInsideTimisoara = isPointInPath(randomLat,randomLng);
        // console.log(isInsideTimisoara);
        if (isInsideTimisoara) {
            const pubelaReciclabilImg = new Image();
            pubelaReciclabilImg.onload = function() {
                // După ce imaginea s-a încărcat, adăugați markerul pe hartă
                new mapboxgl.Marker(pubelaReciclabilImg, {
                    anchor: 'center',
                    width: 30,
                    height: 30
                })
                    .setLngLat([randomLng, randomLat])
                    .addTo(map);
            };
            pubelaReciclabilImg.src = '../Images/dumpster--recyclable-svgrepo-com.svg';

        }
    }

    // Add a popup to the marker
    const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>Wizzard</h3>');

    // Add a marker at the user's location
    const WizzImg = new Image();
    WizzImg.onload = function() {
    // După ce imaginea s-a încărcat, adăugați markerul pe hartă
    new mapboxgl.Marker(WizzImg, {
        anchor: 'center',
        width: 30,
        height: 30
    })

        .setLngLat([21.228831, 45.755827])
        .setPopup(popup)
        .addTo(map);
    };
    WizzImg.src = '../Images/wizz.svg';

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.enable();

    var text1=document.getElementById("text1");
    text1.remove();
    var text2=document.getElementById("text2");
    text2.remove();
}
