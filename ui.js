let gameState = 'title';
let currentSettings = {gameMode: 'survival', renderDistance: 8, masterVolume: 70, mouseSensitivity: 1, dayNightCycle: true, enableClouds: true};

function startGame() {
    gameState = 'playing';
    document.getElementById('titleScreen').classList.remove('active');
    document.getElementById('gameHUD').classList.remove('hidden');
    if (window.game) window.game.startGameLoop();
}

function pauseGame() {
    gameState = 'paused';
    document.getElementById('pauseMenu').classList.remove('hidden');
    document.getElementById('gameHUD').classList.add('hidden');
}

function resumeGame() {
    gameState = 'playing';
    document.getElementById('pauseMenu').classList.add('hidden');
    document.getElementById('gameHUD').classList.remove('hidden');
}

function openSettings() {
    document.getElementById('settingsScreen').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsScreen').classList.add('hidden');
}

function updateGameMode() {
    const mode = document.getElementById('gameModeSelect').value;
    currentSettings.gameMode = mode;
    if (window.game && window.game.player) window.game.player.setGameMode(mode);
}

function updateRenderDistance() {
    const distance = document.getElementById('renderDistance').value;
    currentSettings.renderDistance = parseInt(distance);
    document.getElementById('renderDistanceValue').textContent = distance;
}

function updateVolume() {
    const volume = document.getElementById('masterVolume').value;
    currentSettings.masterVolume = parseInt(volume);
    document.getElementById('volumeValue').textContent = volume + '%';
}

function updateMouseSensitivity() {
    const sensitivity = document.getElementById('mouseSensitivity').value;
    currentSettings.mouseSensitivity = parseFloat(sensitivity);
    document.getElementById('sensitivityValue').textContent = sensitivity;
    if (window.game && window.game.player) window.game.player.mouseSensitivity = sensitivity;
}

function updateDayNight() {
    currentSettings.dayNightCycle = document.getElementById('enableDayNight').checked;
    if (window.game && window.game.world) window.game.world.dayNightCycle = currentSettings.dayNightCycle;
}

function updateClouds() {
    currentSettings.enableClouds = document.getElementById('enableClouds').checked;
}

function saveWorld() {
    if (window.game && window.game.world) {
        window.game.world.saveWorld();
        alert('World saved successfully!');
    }
}

function selectBlock(index) {
    if (window.game && window.game.player) window.game.player.selectBlock(index);
    updateHotbar();
}

function updateHotbar() {
    const slots = document.querySelectorAll('.hotbar-slot');
    slots.forEach((slot, index) => {
        slot.classList.remove('selected');
        if (index === (window.game?.player?.selectedBlockIndex || 0)) slot.classList.add('selected');
    });
}

function updateGameDisplay() {
    if (window.game && window.game.player) {
        const pos = window.game.player.position;
        document.getElementById('coordinates').textContent = `X: ${Math.floor(pos.x)} Y: ${Math.floor(pos.y)} Z: ${Math.floor(pos.z)}`;
        document.getElementById('gameMode').textContent = `Mode: ${currentSettings.gameMode.toUpperCase()}`;
        document.getElementById('blockName').textContent = BLOCK_INFO[window.game.player.selectedBlock]?.name || 'Unknown';
        const count = window.game.player.inventory[window.game.player.selectedBlock];
        document.getElementById('blockCount').textContent = count === Infinity ? '∞' : count;
    }
}