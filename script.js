// Parts Data (could also be in a JSON file)
const cpus = {
    "i9-13900K": { name: "Intel i9-13900K", cores: 24, threads: 32, speed: "5.8GHz" },
    "r9-7950X": { name: "AMD Ryzen 9 7950X", cores: 16, threads: 32, speed: "5.7GHz" },
    "i7-13700K": { name: "Intel i7-13700K", cores: 16, threads: 24, speed: "5.4GHz" },
    "r7-7700X": { name: "AMD Ryzen 7 7700X", cores: 8, threads: 16, speed: "5.4GHz" }
};

const gpus = {
    "rtx4090": { name: "NVIDIA RTX 4090", vram: "24GB", speed: "2.52GHz" },
    "rx7900xtx": { name: "AMD RX 7900 XTX", vram: "24GB", speed: "2.5GHz" },
    "rtx4080": { name: "NVIDIA RTX 4080", vram: "16GB", speed: "2.51GHz" },
    "rx7900xt": { name: "AMD RX 7900 XT", vram: "20GB", speed: "2.4GHz" }
};

// Redirect to compare.html with selected parts
function compareParts() {
    const cpu1 = document.getElementById("cpu1").value;
    const cpu2 = document.getElementById("cpu2").value;
    const gpu1 = document.getElementById("gpu1").value;
    const gpu2 = document.getElementById("gpu2").value;
    
    window.location.href = `compare.html?cpu1=${cpu1}&cpu2=${cpu2}&gpu1=${gpu1}&gpu2=${gpu2}`;
}

// On compare.html, display the results
if (window.location.pathname.includes("compare.html")) {
    const params = new URLSearchParams(window.location.search);
    const cpu1 = params.get("cpu1");
    const cpu2 = params.get("cpu2");
    const gpu1 = params.get("gpu1");
    const gpu2 = params.get("gpu2");
    
    const cpuComparison = document.getElementById("cpu-comparison");
    const gpuComparison = document.getElementById("gpu-comparison");
    
    cpuComparison.innerHTML = `
        <div>
            <h3>${cpus[cpu1].name}</h3>
            <p>Cores: ${cpus[cpu1].cores}</p>
            <p>Threads: ${cpus[cpu1].threads}</p>
            <p>Speed: ${cpus[cpu1].speed}</p>
        </div>
        <div>
            <h3>${cpus[cpu2].name}</h3>
            <p>Cores: ${cpus[cpu2].cores}</p>
            <p>Threads: ${cpus[cpu2].threads}</p>
            <p>Speed: ${cpus[cpu2].speed}</p>
        </div>
    `;
    
    gpuComparison.innerHTML = `
        <div>
            <h3>${gpus[gpu1].name}</h3>
            <p>VRAM: ${gpus[gpu1].vram}</p>
            <p>Speed: ${gpus[gpu1].speed}</p>
        </div>
        <div>
            <h3>${gpus[gpu2].name}</h3>
            <p>VRAM: ${gpus[gpu2].vram}</p>
            <p>Speed: ${gpus[gpu2].speed}</p>
        </div>
    `;
}
