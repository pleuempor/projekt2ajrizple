function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    for (const name in files) {
        formData.append("image", files[name]);
    }

    fetch('/analyze', {
        method: 'POST',
        headers: {},
        body: formData
    }).then(
        response => {
            console.log(response)
            response.json().then(function (data) {
                const classNames = formatClassNames(data);
                answer.innerHTML = classNames;
            });

        }
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );

}

function formatClassNames(data) {
    let classNames = "";
    data.forEach(item => {
        classNames += `${item.className}: ${formatProbability(item.probability)}<br>`;
    });
    return classNames;
}

function formatProbability(probability) {
    return (probability * 100).toFixed(2) + "%";
}

