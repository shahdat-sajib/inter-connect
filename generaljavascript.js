var currentLocation = "currentLocation";
var recipientLocation = "recipientLocation";
var recipientName = "recipientName";
var messageType = "messageType";
var textTransferMessage = "textTransferMessage";
var voiceTransferMessage = "voiceTransferMessage";
var videoTransferMessage = "videoTransferMessage";
var dataTransferMessage = "dataTransferMessage";
var imageTransferMessage = "imageTransferMessage";
var predefinedTransferMessage = "predefinedTransferMessage";
var transferMethod = "transferMethod";
var currentScenario = "";
var scenario = "Scenario";
var sendMessageButton = "scenarioButton";
var sendMessage = "SendMessage";
var newSolar = "NewSolar"
var sendMessageButton = "sendMessageButton";
var backButton = "backButton";
var tryAgainButton = "tryAgainButton";
var submitButton = "submitButton";
var messageSize = 0;

var astronomicalUnit = 149597871;
var scenario1SignalRange = 477000000;
var speedOfLight = 299792.458;
var radioDataRate = 500 * 1024;
var laserDataRate = radioDataRate * 10;

function sendTheMessage() {
    var selectedTransferMethod = getSelectedOption(transferMethod);


    if (selectedTransferMethod.id === "laser") {
        setSolarSystemLaserImage();
        updateOutPut();
    } else {
        setSolarSystemRadioImage();
        updateOutPut();
    }

    var selectedMessageType = getSelectedOption(messageType).id;

    if (selectedMessageType === "text") {
        ValidateTextSizeInBYTE(document.getElementById(textTransferMessage));
    } else if (selectedMessageType === "predefined") {
        messageSize = 1;
    }

    hideElement(document.getElementById("InputId"));
    ScenarioInformation();
    scrollToTop();
    return false;
}

function fileAdded() {
    var messageElement = getSelectedOption(messageType);
    var messageElementId = messageElement.id;
    var sizeId = messageElementId + "Size";
    var inputId = messageElementId + "Input";

    var sizeElement = document.getElementById(sizeId);
    sizeElement.innerText = "";
    var file = document.getElementById(inputId);
    
    ValidateSizeInBYTE(file);

    if (messageSize > 0) {
        var message = messageElementId + " size: " + messageSize + " bytes";
        sizeElement.innerText = message;
    } else {
        sizeElement.innerText = "";
    }
}

function ValidateTextSizeInBYTE(text) {
    messageSize = text.value.length;
}

function ValidateSizeInBYTE(file) {
    messageSize = 0;
    if (file.files.length < 1) {
        messageSize = 0;
    } else {
        var localFileSize = file.files[0].size; // in Byte
        messageSize = localFileSize;
    }
}

function messageTypeChanged() {
    var opt = getSelectedOption(messageType).id;

    var sel = document.getElementsByClassName("messages");

    for (var i = 0; i < sel.length; i++) {
        hideElement(sel[i]);
    }

    sel = document.getElementById(opt + "Message");
    messageSize = 0;
    showElement(sel);
}

function setSolarSystemImage() {
    var src = "";
    if (currentScenario === "scenario1") {
        src = "./images/" + "front.gif";
    }
    //if (currentScenario === "scenario2") {
        //src = "./images/" + "transparent_scenario2.png";
    //}
    //if (currentScenario === "scenario3") {
       // src = "./images/" + "transparent_scenario3.png";
   // }
    var sel = document.getElementById("scenarioImage");
    sel.src = src;
}

function setSolarSystemLaserImage() {
    var src = "";
    if (currentScenario === "scenario1") {
        src = "./images/" + "orbit-connection.gif";
    }
    //if (currentScenario === "scenario2") {
       // src = "./images/" + "transparent_scenario2_laser.png";
    //}
    //if (currentScenario === "scenario3") {
        //src = "./images/" + "transparent_scenario3_laser.png";
    //}
    var sel = document.getElementById("scenarioImage");
    sel.src = src;
}

function setSolarSystemRadioImage() {
    var src = "";
    if (currentScenario === "scenario1") {
        src = "./images/" + "deep-space-connection.gif";
    }
    //if (currentScenario === "scenario2") {
        //src = "./images/" + "transparent_scenario2_radio.png";
    //}
    //if (currentScenario === "scenario3") {
       // src = "./images/" + "transparent_scenario3_radio.png";
    //}
    var sel = document.getElementById("scenarioImage");
    sel.src = src;
}

function getSelectedOption(selectedId) {

    var sel = document.getElementById(selectedId);
    var opt;

    for (var i = 0, len = sel.options.length; i < len; i++) {
        opt = sel.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

function changeTab() {
    var tab = scenario;

    if (this.id === sendMessageButton || this.id === backButton || this.id === tryAgainButton) {
        tab = sendMessage;
    }
    scrollToTop();
    changeTabs(tab);
}

function changeTabs(tabName) {
    var i;
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        hideElement(tabcontent[i]);
    }

    hideOutPut();
    showElement(document.getElementById("InputId"));
    showElement(document.getElementById(tabName));
    setSolarSystemImage();
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "";
}

function changeScenariosEventHandler() {
    changeScenario(this.id);
}

function changeScenario(scenario) {
    currentScenario = scenario;
    changeButtonState(sendMessageButton, false);
    changeTabs(sendMessage); //change should be here
    scrollToTop();
}

function changeButtonState(buttonId, state) {
    var button = document.getElementById(buttonId);
    button.disabled = state;
}

function hideOutPut() {
    hideElement(document.getElementById("OutputGeneralId"));
}

function updateOutPut() {
    showElement(document.getElementById("OutputGeneralId"));
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function ScenarioInformation() {
    var scenarioInformation = document.getElementById("scenarioInformationId");
    scenarioInformation.innerText = "";

    var dataTransferInformation = document.getElementById("dataTransferInformationId");
    dataTransferInformation.innerText = "";
    var dataTransferInformationText = "";

    var aboutTransmissionsTooltip = document.getElementById("aboutTransmissionsTooltipId");
    aboutTransmissionsTooltip.title = "";
    var aboutTransmissionsTooltipText = "";

    var aboutTransmissionsId = document.getElementById("aboutTransmissionsId");
    aboutTransmissionsId.innerText = "";
    var aboutTransmissionsText = "";

    var text = "";
    var timeDelay = 0;
    var distanceBetweenPlanets = 0;
    var distanceForSignal = 0;
    var distanceMotivation = "";

    if (currentScenario === "scenario1") {
        distanceForSignal = scenario1SignalRange;
        timeDelay = scenario1SignalRange / speedOfLight;

        aboutTransmissionsText += "\nSize of the message: " + messageSize + " bytes\n\n";
        distanceBetweenPlanets = 377000000;
        distanceMotivation = "\n[as the signal goes around the sun trough the lagrange points]";

        aboutTransmissionsTooltipText =
            "Lagrange Points" +
            "Gravitational forces of the sun and earth can produce enhanced regions of attraction and repulsion. \n\n" +
            "This is where Lagrange Points appears. " +
            "Objects sent to a point tend to stay put. There are five Lagrange points placed around the sun and earth. " +
            "In this case, we are taking advantage of the points L4 and L5 that are placed on each side of Earth that can be spotted in the picture.\n\n";
    } else {
        //aboutTransmissionsText = "Only scenario1 is supported at this moment.";
    }

    if (timeDelay > 0) {
        var transferSpeed = radioDataRate;

        var messageTransferMethod = "radio";
        var textAboutTransferSpeed =
            "With help from the Mars Reconnaissance Orbiter it is possible to send data at a rate of at least " +
                transferSpeed +
                "bits per second," +
                " and at closer ranges even higher";

        var selectedTransferMethod = getSelectedOption(transferMethod).id;

        if (selectedTransferMethod === "laser") {
            messageTransferMethod = "laser";
            transferSpeed = laserDataRate;
            textAboutTransferSpeed =
                "The Deep Space Optical Communications is said to have 10x time the speed of the current" +
                " Deep Space Network, that would give us around " +
                transferSpeed +
                "bits per second";
        }

        aboutTransmissionsText += "Distance Mars to Earth: " +
            distanceBetweenPlanets +
            "km (" +
            (distanceBetweenPlanets / astronomicalUnit).toFixed(3) +
            " Au)\n\n";

        aboutTransmissionsText += "Signal distance: " +
            distanceForSignal +
            "km (" +
            (distanceForSignal / astronomicalUnit).toFixed(3) +
            " Au)" +
            distanceMotivation;

        var dataTransferTime = messageSize / transferSpeed;
        var transferTime = timeDelay + dataTransferTime;
        var timeToTransfer = "Time delay: " +
            (timeDelay / 60).toFixed(2) +
            " minutes\n\n" +
            "Data transfer speed: " +
            (dataTransferTime / 60).toFixed(2) +
            " minutes\n\n" +
            "Total time: " +
            (transferTime / 60).toFixed(2) +
            " minutes";


        aboutTransmissionsTooltipText += textAboutTransferSpeed;


        text += "\n";
        text += "Transfer method: " + messageTransferMethod + "\n\n";
        text += timeToTransfer;

    }

    scenarioInformation.innerText = text;
    aboutTransmissionsId.innerText = aboutTransmissionsText;
    aboutTransmissionsTooltip.title = aboutTransmissionsTooltipText;
    if (aboutTransmissionsTooltipText !== "") {
        aboutTransmissionsTooltip.style.display = "";
    } else {
        aboutTransmissionsTooltip.style.display = "none";
    }

    dataTransferInformation.innerText = dataTransferInformationText;
}


