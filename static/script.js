function submitPreset() {
    const preset = {
        url: document.querySelector("#url").value,
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
        jobName: document.querySelector("#job").value,
        presetName: "demo"
    }
    fetch("config", {
        method: "POST",
        body: JSON.stringify(preset),
        headers: {
            "Content-Type": "application/json"
        },
    }).then(x => x.json())
        .then(x => alert(x.saved ? "Saved Successfully" : "Some error occurred"))
    // console.log(preset);
    return false
}

async function getPreset() {
    const data = await fetch("preset").then(x => x.json())
    document.querySelector("#url").value = data.config.url
    document.querySelector("#username").value = data.config.username
    document.querySelector("#password").value = data.config.password
    document.querySelector("#job").value = data.config.jobName
}