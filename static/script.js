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
    })
    // console.log(preset);
    return false
}