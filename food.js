let foodStockR, foodStockL = [], loop = [];

class Food {
    constructor () {
        foodStockL.push(this);
    }
    display (cd) {
        image(imageG, (cd % 10) * 40 - 20, 800 - 80 * round(cd/10 + 0.5), 80, 80);
    }
}

function displayAll () {
    for (loop[0] = 0;loop[0] < foodStockL.length;loop[0] += 1) {
        foodStockL[loop[0]].display(loop[0])
    }
}