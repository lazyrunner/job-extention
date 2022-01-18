let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
    getElement();
}

alert('Hello');
var jobDescDiv;
var btnChecks;

var siteMap = {
    'indeed': 'jobDescriptionText',
    'linkedin': 'job-details'
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

function getLinkedinDivs() {
    var div = document.getElementById('job-details');
    return div;
}

function getIndeedDivs() {
    var iframe = document.getElementById("vjs-container-iframe");
    var div;
    if (iframe) {
        div = iframe.contentWindow.document.getElementById('jobDescriptionText');
    }
    return div;
}


function checkLinkedBtnExists(id) {
    return document.getElementById(id);

}
function checkIndeedBtnExists(id) {
    var iframe = document.getElementById("vjs-container-iframe");
    var btn;
    if (iframe) {
        btn = iframe.contentWindow.document.getElementById(id);
    }
    return btn;
}

async function getElement() {
    jobDescDiv = null;
    var siteFun;
    var siteName = window.location.href
    siteName = url_domain(siteName);
    for (var sites of Object.keys(siteMap)) {
        if (siteName.indexOf(sites) >= 0) {
            if (sites == 'indeed') {
                siteFun = getIndeedDivs;
                btnChecks = checkIndeedBtnExists;
            } else if (sites == 'linkedin') {
                siteFun = getLinkedinDivs;
                btnChecks = checkLinkedBtnExists;

            }
        }
    }

    while (!jobDescDiv) {
        console.log('Still searching')
        await sleep(2000);
        jobDescDiv = siteFun();
    }
    createButton();

}

function createButton() {
    var btId = 'genrateskillz';
    var doesBtnExist = btnChecks(btId);
    if (!doesBtnExist) {
        alert('creating button');
        let btn = document.createElement("button");
        btn.id = 'genrateskillz';
        btn.innerHTML = "Genetate Skills";
        btn.addEventListener("click", fetchSkills);
        jobDescDiv.appendChild(btn);
    }

}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}

function fetchSkills(){
    var siteName = window.location.href
    siteName = url_domain(siteName);
    console.log(jobDescDiv.textContent)
}

getElement();

