import React from 'react'
import styles from './main.module.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Widget from '../Widget/Widget';

const Main = () => {
  return (
    <div className={styles.main}>
        <Breadcrumb/>
        <Widget/>
    </div>
  )
}

export default Main;