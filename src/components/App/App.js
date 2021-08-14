import React, { useState, useEffect} from "react";
import cx from "classnames";

import GET_MODS_URL from "../../constants/GET_MODS_URL";
import Main from "../Main/Main";
import styles from "./App.module.scss"; 

function App() {
  const [fetching, setFetching] = useState(true);
  const [error, setErrore] = useState(null);
  const [mods, setMods] = useState(null);

  useEffect(() => {
    fetchMods();
  }, []);

  const handleMods = (result) => {
    if (typeof result !== 'object' || result === null) return;

    return Object.keys(result).map((currKey) => ({
      modeName: currKey.replace('Mode', ''),
      gridSize: result[currKey].field,
    }));
  };

  const fetchMods = () => {
    fetch(GET_MODS_URL)
      .then((res) => res.json())
      .then((result) => {
        setFetching(false);
        setMods(handleMods(result));
      })
      .catch((err) => {
        setFetching(false);
        setErrore( err);
      });
  };

if(error || (!fetching && !mods)){
  return(
    <div className={cx(styles.App, styles.error)}>
      Something went wrong.
    </div>
  )
}

  return( 
  <div className={styles.App}>
    {fetching 
    ? <div className={styles.loader}>Loading...</div>
    : <Main mods={mods}/>
  }
  </div>
  );
}

export default App;
