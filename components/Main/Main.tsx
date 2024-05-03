import React from 'react'
import styles from './main.module.css';
import Link from 'next/link';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const Main = () => {
  return (
    <div className={styles.main}>
        <Breadcrumb/>

    </div>
  )
}

export default Main;