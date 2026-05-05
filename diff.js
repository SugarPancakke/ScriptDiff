async function loadIndex() {
    const res = await fetch("data/index.json");
    const files = await res.json();

    const list = document.getElementById("list");

    files.forEach(f => {
        const div = document.createElement("div");
        div.className = "file";
        div.innerText = f.file;

        div.onclick = () => loadFile(f.id, f.file);

        list.appendChild(div);
    });
}

async function loadFile(id, name) {

    const res = await fetch("data/" + id + ".json");
    const data = await res.json();

    let html = `<h3>${name}</h3>`;

    data.forEach(line => {

        if (line.type === "same") {
            html += `<div class="row">
                        <div class="left">${escape(line.left)}</div>
                        <div class="right">${escape(line.right)}</div>
                     </div>`;
        }

        if (line.type === "replace") {
            html += `<div class="row">
                        <div class="left replace">${escape(line.left)}</div>
                        <div class="right replace">${escape(line.right)}</div>
                     </div>`;
        }

        if (line.type === "delete") {
            html += `<div class="row">
                        <div class="left remove">${escape(line.left)}</div>
                        <div class="right"></div>
                     </div>`;
        }

        if (line.type === "insert") {
            html += `<div class="row">
                        <div class="left"></div>
                        <div class="right add">${escape(line.right)}</div>
                     </div>`;
        }
    });

    document.getElementById("viewer").innerHTML = html;
}

function escape(str) {
    return (str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

loadIndex();
