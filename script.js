// Sample Data (could be loaded from JSON later)
const parts = {
    cpus: [
        { id: "i9-13900K", name: "Intel Core i9-13900K", cores: 24, threads: 32, speed: "5.8GHz" },
        { id: "r9-7950X", name: "AMD Ryzen 9 7950X", cores: 16, threads: 32, speed: "5.7GHz" }
    ],
    gpus: [
        { id: "rtx4090", name: "NVIDIA RTX 4090", vram: "24GB", speed: "2.52GHz" },
        { id: "rx7900xtx", name: "AMD RX 7900 XTX", vram: "24GB", speed: "2.5GHz" }
    ]
};

// Search function
function searchPart() {
    const query = document.getElementById("search").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!query) return;

    // Find matching CPUs/GPUs
    const cpuMatches = parts.cpus.filter(cpu => 
        cpu.name.toLowerCase().includes(query)
    );
    const gpuMatches = parts.gpus.filter(gpu => 
        gpu.name.toLowerCase().includes(query)
    );

    // Display results
    if (cpuMatches.length > 0) {
        resultsDiv.innerHTML += "<h3>> CPUs</h3>";
        cpuMatches.forEach(cpu => {
            resultsDiv.innerHTML += `
                <div class="part-option" onclick="startComparison('cpu', '${cpu.id}')">
                    ${cpu.name} | Cores: ${cpu.cores} | Threads: ${cpu.threads}
                </div>
            `;
        });
    }

    if (gpuMatches.length > 0) {
        resultsDiv.innerHTML += "<h3>> GPUs</h3>";
        gpuMatches.forEach(gpu => {
            resultsDiv.innerHTML += `
                <div class="part-option" onclick="startComparison('gpu', '${gpu.id}')">
                    ${gpu.name} | VRAM: ${gpu.vram} | Speed: ${gpu.speed}
                </div>
            `;
        });
    }

    if (cpuMatches.length === 0 && gpuMatches.length === 0) {
        resultsDiv.innerHTML = "<p>> No results found.</p>";
    }
}

// Start comparison (redirect to compare.html)
function startComparison(type, id) {
    window.location.href = `compare.html?type=${type}&id=${id}`;
}

// Comparison Page Logic
if (window.location.pathname.includes("compare.html")) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = params.get("id");

    // Set comparison type (CPU/GPU)
    document.getElementById("comparison-type").textContent = type.toUpperCase();

    // Load first part
    const part = parts[type + "s"].find(p => p.id === id);
    updateComparisonTable(type, [part]);

    // Add new parts
    window.addPart = function() {
        const query = document.getElementById("add-part").value.toLowerCase();
        const matches = parts[type + "s"].filter(p => 
            p.name.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            const currentParts = JSON.parse(sessionStorage.getItem("compareParts") || "[]");
            currentParts.push(matches[0]);
            sessionStorage.setItem("compareParts", JSON.stringify(currentParts));
            updateComparisonTable(type, currentParts);
        }
    };
}

function updateComparisonTable(type, partsList) {
    const table = document.getElementById("comparison-table");
    let html = "<table>";

    // Headers
    html += "<tr>";
    html += "<th>Model</th>";
    if (type === "cpu") {
        html += "<th>Cores</th><th>Threads</th><th>Speed</th>";
    } else {
        html += "<th>VRAM</th><th>Speed</th>";
    }
    html += "</tr>";

    // Rows
    partsList.forEach(part => {
        html += "<tr>";
        html += `<td>${part.name}</td>`;
        if (type === "cpu") {
            html += `<td>${part.cores}</td><td>${part.threads}</td><td>${part.speed}</td>`;
        } else {
            html += `<td>${part.vram}</td><td>${part.speed}</td>`;
        }
        html += "</tr>";
    });

    html += "</table>";
    table.innerHTML = html;
    sessionStorage.setItem("compareParts", JSON.stringify(partsList));
}
