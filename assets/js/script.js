(() => {
  const timeDisplay = document.getElementById('timeDisplay');
  const modeLabel = document.getElementById('modeLabel');
  const bigBtn = document.getElementById('bigBtn');
  const bigBtnLabel = document.getElementById('bigBtnLabel');
  const modeBtn = document.getElementById('modeBtn');
  const lapBtn = document.getElementById('lapBtn');
  const resetBtn = document.getElementById('resetBtn');
  const lapsPanel = document.getElementById('lapsPanel');
  const lapsList = document.getElementById('lapsList');
  const clearLaps = document.getElementById('clearLaps');
  
  const MODES = ['timer', 'pomodoro'];
  let modeIndex = 0;
  let mode = MODES[modeIndex];
  let running = false,
    startTime = 0,
    elapsed = 0,
    interval = null;
  let laps = [];
  
  function format(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return (h > 0 ? String(h).padStart(2, '0') + ':' : '') +
      String(m).padStart(2, '0') + ':' +
      String(sec).padStart(2, '0');
  }
  
  function update() {
    let t = elapsed;
    if (running) t += Date.now() - startTime;
    timeDisplay.textContent = format(t);
    modeLabel.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  }
  
  function start() {
    running = true;
    startTime = Date.now();
    bigBtnLabel.textContent = "Stop";
    interval = setInterval(update, 200);
  }
  
  function stop() {
    running = false;
    elapsed += Date.now() - startTime;
    clearInterval(interval);
    bigBtnLabel.textContent = "Start";
    update();
  }
  
  function reset() {
    running = false;
    elapsed = 0;
    clearInterval(interval);
    bigBtnLabel.textContent = "Start";
    update();
  }
  
  function addLap() {
    laps.push(timeDisplay.textContent);
    renderLaps();
    lapsPanel.setAttribute("aria-hidden", "false");
  }
  
  function renderLaps() {
    lapsList.innerHTML = "";
    laps.forEach((l, i) => {
      let li = document.createElement("li");
      li.textContent = `Lap ${i+1}: ${l}`;
      lapsList.appendChild(li);
      lapsPanel.style.display = 'block';
    });
  }
  
  bigBtn.onclick = () => running ? stop() : start();
  resetBtn.onclick = () => {
      reset();
      laps = [];
      renderLaps();
  };
  lapBtn.onclick = addLap;
  modeBtn.onclick = () => {
    modeIndex = (modeIndex + 1) % MODES.length;
    mode = MODES[modeIndex];
    reset();
  };
  clearLaps.onclick = () => {
    lapsPanel.style.display = 'none';
    laps = [];
    renderLaps();
  };

})();