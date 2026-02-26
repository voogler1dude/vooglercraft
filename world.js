class World {
    constructor(scene, renderer, chunkSize = 16, renderDistance = 8) {
        this.scene = scene;
        this.renderer = renderer;
        this.chunkSize = chunkSize;
        this.renderDistance = renderDistance;
        this.chunks = new Map();
        this.blocks = new Map();
        this.noise = new SimplexNoise(Math.random);
        this.dayNightCycle = true;
        this.timeOfDay = 6;
        this.gameTime = 0;
        this.worldSeed = Math.random();
        this.generateInitialTerrain();
    }
    generateInitialTerrain() {
        const centerChunkX = 0;
        const centerChunkZ = 0;
        for (let cx = centerChunkX - this.renderDistance; cx <= centerChunkX + this.renderDistance; cx++) {
            for (let cz = centerChunkZ - this.renderDistance; cz <= centerChunkZ + this.renderDistance; cz++) {
                this.generateChunk(cx, cz);
            }
        }
        this.generateTrees();
    }
    generateChunk(chunkX, chunkZ) {
        const chunkKey = `${chunkX},${chunkZ}`;
        if (this.chunks.has(chunkKey)) return;
        const terrain = new THREE.Group();
        terrain.name = `chunk_${chunkKey}`;
        for (let x = 0; x < this.chunkSize; x++) {
            for (let z = 0; z < this.chunkSize; z++) {
                const worldX = chunkX * this.chunkSize + x;
                const worldZ = chunkZ * this.chunkSize + z;
                const height = this.getTerrainHeight(worldX, worldZ);
                for (let y = 0; y < height; y++) {
                    let blockType = BLOCK_TYPES.STONE;
                    if (y === Math.floor(height) - 1)
                        blockType = BLOCK_TYPES.GRASS;
                    else if (y > Math.floor(height) - 5)
                        blockType = BLOCK_TYPES.DIRT;
                    this.setBlock(worldX, y, worldZ, blockType);
                }
            }
        }
        this.chunks.set(chunkKey, terrain);
        this.scene.add(terrain);
    }
    getTerrainHeight(x, z) {
        const scale1 = 0.005;
        const scale2 = 0.02;
        const noise1 = this.noise.noise2D(x * scale1, z * scale1) * 30;
        const noise2 = this.noise.noise2D(x * scale2, z * scale2) * 15;
        let height = 20 + noise1 + noise2;
        return Math.floor(Math.max(5, Math.min(60, height)));
    }
    setBlock(x, y, z, blockType) {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        this.blocks.set(key, blockType);
    }
    getBlock(x, y, z) {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        return this.blocks.get(key) || BLOCK_TYPES.AIR;
    }
    removeBlock(x, y, z) {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        this.blocks.delete(key);
    }
    placeBlock(x, y, z, blockType) {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        this.blocks.set(key, blockType);
    }
    saveWorld() {
        const worldData = {
            blocks: Array.from(this.blocks.entries()),
            timeOfDay: this.timeOfDay,
            worldSeed: this.worldSeed
        };
        localStorage.setItem('vooglercraft_world', JSON.stringify(worldData));
    }
    loadWorld() {
        const worldData = localStorage.getItem('vooglercraft_world');
        if (worldData) {
            const data = JSON.parse(worldData);
            this.blocks = new Map(data.blocks);
            this.timeOfDay = data.timeOfDay;
            this.worldSeed = data.worldSeed;
            return true;
        }
        return false;
    }
}