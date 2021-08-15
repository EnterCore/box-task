import React from 'react';
import styles from './Grid.module.scss'

function Grid ({activeMode, activeCells, changeCellState}) {
  const gridSize = activeMode.gridSize;

  const renderCells = (rowId) => {
    let result;

    result = new Array(gridSize).fill(0).map((currElem, index) =>(
      <div 
        key={index} 
        className={styles.cell} 
        onMouseEnter={() => changeCellState(rowId, index + 1)}
        style={activeCells[`${rowId}-${index + 1}`] ? {backgroundColor: '#03a8f4'} : {}}
      >
      </div>
    ));

    return result;
  }

  const renderRows = () => {
    let result

    result = new Array(gridSize).fill(null).map((currElem, index) => (
      <div keys={index} className={styles.row}>
        {renderCells(index + 1)}
      </div>
    ));

    return result;
  }

  return (
      <div className={styles.gridContainer} style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
        {renderRows(gridSize)}
      </div>
  );
}

export default Grid;