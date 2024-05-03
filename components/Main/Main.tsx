import React from 'react'
import styles from './main.module.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Widget from '../Widget/Widget';
import Table from '../Table/Table';

const Main = () => {
  return (
    <div className={styles.main}>
        <Breadcrumb/>
        <Widget/>
        <Table/>
    </div>
  )
}

export default Main;