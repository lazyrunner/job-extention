let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, { subtree: true, childList: true });

let skillToAdd = new Set();

function onUrlChange() {
    var box = document.getElementById("extention-big-box");
    if (box) {
        box.remove();
    }
    skillToAdd = new Set();
    getElement();
}

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
        let btn = document.createElement("button");
        btn.id = 'genrateskillz';
        btn.innerHTML = "Genetate Skills";
        btn.className = "artdeco-button artdeco-button--2 artdeco-button--secondary";
        btn.addEventListener("click", fetchSkills);
        var mybr = document.createElement('br');
        jobDescDiv.appendChild(mybr);
        jobDescDiv.appendChild(btn);
    }

}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}

function fetchSkills() {
    var siteName = window.location.href
    siteName = url_domain(siteName);
    var jobDesc = jobDescDiv.textContent;
    console.log(jobDesc)
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/keywords/",
        dataType: "json",
        data: JSON.stringify({
            site: siteName,
            text: jobDesc
        }),
        success: function (data) {
            console.log(data);
            showSkills(data);
        } //end function
    }); //End ajax 
}

function createResume() {
    var siteName = window.location.href
    siteName = url_domain(siteName);
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/resume/",
        // dataType: "json",
        data: JSON.stringify({
            site: siteName,
            skills: Array.from(skillToAdd)
        }),
        xhrFields:{
            responseType:'blob'
        },
        success: function (data) {
            var filename = 'resume';
            if (data.error === undefined) {
                console.log(data) // This will be informative
                var blob = new Blob([data]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename + '.pdf';
                link.click();
            }
        } //end function
    }); //End ajax 
}

function showSkills(skills) {
    let skillsHtml = '';
    for (skill in skills) {
        skillsHtml += `<button class = "extentions-skill" onclick="extentionAddSkill()"> ` + skills[skill] + ` </button> `
    }
    var div = document.createElement("div");
    div.className = 'extentions-container';
    div.id = "extention-big-box";
    var toAddDiv = document.createElement("div");
    toAddDiv.id = "extentionToAddItems";
    for (skill in skills) {
        let btn = document.createElement("button");
        btn.innerHTML = skills[skill];
        btn.className = "extentions-skill";
        btn.addEventListener("click", extentionAddSkill);
        toAddDiv.appendChild(btn);
    }
    div.appendChild(toAddDiv);
    var selected = document.createElement("div");
    selected.className = 'extentions-selected';
    selected.innerHTML = 'Added Skills :'
    div.appendChild(selected);

    let btn = document.createElement("button");
    btn.id = 'generteResume';
    btn.innerHTML = "Genetate Resume";
    btn.className = "artdeco-button artdeco-button--2 artdeco-button--secondary";
    btn.addEventListener("click", createResume);
    var mybr = document.createElement('br');
    div.appendChild(mybr);
    div.appendChild(btn);
    jobDescDiv.appendChild(div);
}

function extentionAddSkill() {
    $(this).toggleClass("clicked");
    $(this).remove();
    let btn = document.createElement("button");
    btn.innerHTML = $(this).text();
    btn.className = "extentions-addded-skill";
    btn.addEventListener("click", extentionRemovedSkill);
    $('.extentions-selected').append(btn)
    skillToAdd.add($(this).text());
}

function extentionRemovedSkill() {
    $(this).toggleClass("clicked");
    $(this).remove();
    let btn = document.createElement("button");
    btn.innerHTML = $(this).text();
    btn.className = "extentions-skill";
    btn.addEventListener("click", extentionAddSkill);
    let div = document.getElementById('extentionToAddItems');
    div.appendChild(btn);
    skillToAdd.delete($(this).text());
}

getElement();