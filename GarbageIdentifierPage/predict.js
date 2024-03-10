const TARGET_CLASSES = {
    trash: {
        0: "Empty Trash Bin",
        1: "Full Trash Bin"
    },
    recyclables: {
        0: "Battery",
        1: "Biological",
        2: "Cardboard",
        3: "Clothes",
        4: "Glass",
        5: "Metal",
        6: "Paper",
        7: "Plastic",
        8: "Shoes",
        9: "Trash"
    }
};

function getClassLabels(value) {
    const labels = TARGET_CLASSES[value];
    if (labels) {
        return labels;
    } else {
        console.error("Invalid value:", value);
        return {};
    }
}

let imageLoaded = false;

$("#image-selector").change(async function () {
    imageLoaded = false;
    const file = $("#image-selector").prop('files')[0];

    if (file) {
        const dataURL = await readFileAsync(file);
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
        $("#prediction-list--most-probable").empty();
        imageLoaded = true;
    }
});

function readFileAsync(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}

let model;
let modelLoaded = false;

$(document).ready(async function () {
    var selectedOption = $("#prediction-type").val();
    console.log(selectedOption);    
    await loadModel(selectedOption);
});

const predictionTypeSelect = document.getElementById("prediction-type");
predictionTypeSelect.addEventListener("change", async function () {
    const selectedOption = predictionTypeSelect.value;
    await loadModel(selectedOption);
});

async function loadModel(selectedOption) {
    modelLoaded = false;
    $('.progress-bar').show();

    if (!selectedOption) {
        selectedOption = "Trash";
    }

    const defaultPath = `../model/${selectedOption}/model.json`;

    try {
        model = await tf.loadGraphModel(defaultPath);
        console.log("Model loaded.");
    } catch (error) {
        console.error("Error loading model:", error);
    } finally {
        $('.progress-bar').hide();
        modelLoaded = true;
    }
}

async function renderImage(image, modelSize, selectedOption) {
    console.log("Loading image...");
    let tensor = tf.browser.fromPixels(image, 3)
        .resizeNearestNeighbor(modelSize)
        .expandDims()
        .toFloat()
        .reverse(-1);

    let predictions = await model.predict(tensor).data();
    console.log(predictions);

    var sliceSize;
    if(selectedOption==="trash") {
        sliceSize=2;
    } else sliceSize=10;

    let top5 = Array.from(predictions)
        .map((p, i) => ({
            probability: p,
            className: getClassLabels(selectedOption)[i]
        }))
        .sort((a, b) => -1)
        .slice(0, 10);

    var mostProbable="None";
    var maxi=-1.0;

    top5.forEach((  p, i) => {
        var prob = p.probability.toFixed(6) * 100;
        $("#prediction-list").append(`<div>${p.className}: ${prob}%</div>`);
        if(maxi<prob) {
            maxi=prob;
            mostProbable=p.className;
        }
        console.log(p.className);
    });
    $("#prediction-list-most-probable").append(`<div style="font-size:30px">${mostProbable}</div>`);
    console.log(mostProbable);
}

$("#predict-button").click(async function () {
    if (!modelLoaded) {
        alert("The model must be loaded first");
        return;
    }

    if (!imageLoaded) {
        alert("Please select an image first");
        return;
    } else {
		$("#prediction-list").empty();
        $("#prediction-list-most-probable").empty();
	}

    const image = $('#selected-image').get(0);
    const selectedOption = $("#prediction-type").val();
    var modelSizeX;
    var modelSizeY;
    if(selectedOption==="trash") {
        modelSizeX=modelSizeY=224;
    } else {
        modelSizeX=modelSizeY=300;
    }
    const modelSize = [modelSizeX, modelSizeY];

    await renderImage(image, modelSize, selectedOption);
});