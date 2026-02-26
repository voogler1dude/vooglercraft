'use strict';

const BLOCK_TYPES = {AIR: 0, GRASS: 1, DIRT: 2, STONE: 3, WOOD: 4, LEAVES: 5, SAND: 6, WATER: 7, GRAVEL: 8, COAL_ORE: 9, IRON_ORE: 10};

const BLOCK_INFO = {0: {name: 'Air', color: 0x87ceeb, breakable: false}, 1: {name: 'Grass', color: 0x7ec850, breakable: true}, 2: {name: 'Dirt', color: 0x8b6914, breakable: true}, 3: {name: 'Stone', color: 0x888888, breakable: true}, 4: {name: 'Oak Wood', color: 0x8b5a2b, breakable: true}, 5: {name: 'Leaves', color: 0x2ecc71, breakable: true}, 6: {name: 'Sand', color: 0xf4a460, breakable: true}, 7: {name: 'Water', color: 0x1e90ff, breakable: false}, 8: {name: 'Gravel', color: 0xb0b0b0, breakable: true}, 9: {name: 'Coal Ore', color: 0x2a2a2a, breakable: true}, 10: {name: 'Iron Ore', color: 0xb87333, breakable: true}};

function createBlockTexture(blockType) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    const blockData = BLOCK_INFO[blockType];
    const color = blockData.color;
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, 32, 32);

    return canvas;
}