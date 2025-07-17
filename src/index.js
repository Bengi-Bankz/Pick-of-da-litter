import {
    Application,
    Assets,
    Container,
    Sprite,
    Graphics,
    Text
} from 'pixi.js';

(async () => {
    // Enable PixiJS Dev Tools (set before and after app init for compatibility)
    window.__PIXI_DEVTOOLS__ = { app: null };
    const ROWS = 5;
    const COLS = 5;
    const SYMBOL_SPACING = 0;
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    const app = new Application();
    await app.init({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 0x000000
    });

    // Register app for PixiJS Dev Tools
    window.__PIXI_DEVTOOLS__ = { app };

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.appendChild(app.canvas);

    // 📦 Load assets
    const frameTexture = await Assets.load('/frame.png');
    const symbolsSheet = await Assets.load('/symbols.png.json');

    // Use measured grid cell size
    const SYMBOL_WIDTH = 110;
    const SYMBOL_HEIGHT = 124;
    const GRID_WIDTH = COLS * SYMBOL_WIDTH + (COLS - 1) * SYMBOL_SPACING;
    const GRID_HEIGHT = ROWS * SYMBOL_HEIGHT + (ROWS - 1) * SYMBOL_SPACING;

    // 🖼️ Black background rectangle
    const bgRect = new Graphics();
    bgRect.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    bgRect.fill({ color: 0x232323 });
    app.stage.addChild(bgRect);

    // 🖼️ Frame (grid)
    const frame = new Sprite(frameTexture);
    frame.width = frameTexture.width;
    frame.height = frameTexture.height;
    frame.x = (SCREEN_WIDTH - frame.width) / 2;
    frame.y = SCREEN_HEIGHT - frame.height;
    app.stage.addChild(frame);

    // 🎰 Slot container
    const slotContainer = new Container();
    slotContainer.x = frame.x + 58;
    slotContainer.y = frame.y + 65; // Adjusted to fit within the frame
    app.stage.addChild(slotContainer);

    // 🧩 Symbol pool
    const symbolNames = Object.keys(symbolsSheet.textures);

    // 🎲 Build grid with spacing
    const CELL_WIDTH = 110;
    const CELL_HEIGHT = 124;
    const CELL_SPACING_X = 20; // adjust as needed for grid spacing
    const CELL_SPACING_Y = 30; // adjust as needed for grid spacing

    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            const textureName = symbolNames[Math.floor(Math.random() * symbolNames.length)];
            const symbol = new Sprite(symbolsSheet.textures[textureName]);
            symbol.width = CELL_WIDTH;
            symbol.height = CELL_HEIGHT;
            symbol.x = col * (CELL_WIDTH + CELL_SPACING_X);
            symbol.y = row * (CELL_HEIGHT + CELL_SPACING_Y);
            slotContainer.addChild(symbol);
        }
    }

    // Ensure symbols are rendered behind the grid frame
    app.stage.setChildIndex(frame, app.stage.children.length + 1);
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            const textureName = symbolNames[Math.floor(Math.random() * symbolNames.length)];
            const symbol = new Sprite(symbolsSheet.textures[textureName]);
            symbol.width = SYMBOL_WIDTH;
            symbol.height = SYMBOL_HEIGHT;
            symbol.x = col * (SYMBOL_WIDTH + SYMBOL_SPACING);
            symbol.y = row * (SYMBOL_HEIGHT + SYMBOL_SPACING);
            slotContainer.addChild(symbol);
        }
    }
})();
