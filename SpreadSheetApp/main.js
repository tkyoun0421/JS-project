const spreadSheetContainerEl = document.querySelector('#spreadsheet-container');
const ROWS = 10;
const COLURMS = 10;
const exportBtnEl = document.querySelector('#export-btn');

const spreadsheet = [];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

exportBtnEl.addEventListener('click', a);

function a() {
    let csv = '';

    for(let i = 0; i < spreadsheet.length; i++) {
        csv +=
            spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') + '\r\n'
    }

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}

initSpreadsheet();

function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLURMS; j++) {
            let cellData = '';
            let isHeader = false;
            let disabled = false;
            
            if (j === 0) {
                cellData = i;
                isHeader = true;
                disabled = true;
            }

            if (i === 0) {
                cellData = alphabet[j - 1];
                isHeader = true;
                disabled = true;
            }

            if (!cellData) {
                cellData = '';
            }

            const rowName = i;
            const columnName = alphabet[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
}

function createCellElement(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if (cell.isHeader) {
        cellEl.classList.add('header');
    }

    cellEl.onclick = () => handleCellClick(cell);
    cellEl.oninput = (event) => handleOnChange(event.target.value, cell);

    return cellEl;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    const cellStatusEl = document.querySelector('#cell-status');

    cellStatusEl.textContent = `${cell.columnName}-${cell.rowName}`;

    columnHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');
}

function clearHeaderActiveStates() {
    const activeEls = document.querySelectorAll('.active');
    activeEls.forEach(item => {
        item.classList.remove('active');
    })
}

function getElFromRowCol(row, col) {
    return document.querySelector('#cell_' + row + col);
}

function drawSheet() {
    for (let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement('div');
        rowContainerEl.className = 'cell-row';
        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellElement(cell));
        }
        spreadSheetContainerEl.append(rowContainerEl)
    }
}