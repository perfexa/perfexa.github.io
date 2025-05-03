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
  table.innerHTML = ""; // Clear previous
  
  partsList.forEach((part, index) => {
    const card = document.createElement("div");
    card.className = "part-card";
    
    let html = `
      <h3>${part.name}</h3>
      <div class="spec-row">
        <span class="spec-name">Model</span>
        <span>${part.name}</span>
      </div>
    `;
    
    if (type === "cpu") {
      html += `
        <div class="spec-row">
          <span class="spec-name">Cores</span>
          <span>${part.cores}</span>
        </div>
        <div class="spec-row">
          <span class="spec-name">Threads</span>
          <span>${part.threads}</span>
        </div>
        <div class="spec-row">
          <span class="spec-name">Speed</span>
          <span>${part.speed}</span>
        </div>
      `;
    } else {
      html += `
        <div class="spec-row">
          <span class="spec-name">VRAM</span>
          <span>${part.vram}</span>
        </div>
        <div class="spec-row">
          <span class="spec-name">Speed</span>
          <span>${part.speed}</span>
        </div>
      `;
    }
    
    card.innerHTML = html;
    table.appendChild(card);
  });
}
