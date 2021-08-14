import React, { useState } from 'react';
import cx from 'classnames';

import styles from './Main.module.scss';

import { ReactComponent as Arrow } from './img/arrow.svg';
import Grid from '../Grid/Grid';
import ActiveCellsList from '../ActiveCells/ActiveCellsList';


function Main (props) {
  const [activeMode, setActiveMode] = useState(null);
  const [isModeStarted, setIsModeStarted] = useState(false);
  const [activeCells, setActiveCells] = useState({});
  const [isDroped, setISDroped] = useState(false);
  const mods = props;

  const changeCells = (rowId, cellId) => {
    if(!isModeStarted) return;

    setActiveCells({
      [`${rowId}-${cellId}`]: activeCells[`${rowId}-${cellId}`] ? null : `row ${rowId} - col ${cellId}`
    });
  }

  const changeMode = (currMode) => {
    setActiveMode(currMode);
    setActiveCells({});
  }

  const renderOptions = () => {
    return Object.values(mods).map((currMode, index) => (
      <div className={styles.option} key={index} onClick={() => changeMode(currMode)}>
        {currMode.modeName}
      </div>
    ));
  }

  const dropedDown = () => {
    setISDroped(!isDroped);
  }

  const startBtn = () =>{
    if(!activeMode) return;

    setIsModeStarted(!isModeStarted);
  }
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.controls}>
          <div
            className={cx(
              styles.select,
              {[styles.selectOpened]: isDroped}
            )}
            onClick={() => dropedDown()}
          >
            { (activeMode && activeMode.modeName) ||
              <span className={styles.selectDefaultValue}>Pick a mode</span>
            }
            <Arrow />
            <div className={styles.dropdown}>
              {renderOptions()}
            </div>
          </div>
          <button
            type="button"
            className={cx(
              styles.startBtn,
              { [styles.startBtnDisabled]: !activeMode,
                [styles.startBtnActive]: isModeStarted}
            )}
            onClick={() => startBtn()}
          >
            {isModeStarted ? 'STOP' : 'START'}
          </button>
        </div>
        { activeMode &&
          <Grid
              activeMode={activeMode}
              activeCells={activeCells}
              changeCellState={changeCells()}
          />
        }
      </div>
      { activeMode &&
        <ActiveCellsList activeCells={activeCells} />
      }
    </div>
  );

}
export default Main;