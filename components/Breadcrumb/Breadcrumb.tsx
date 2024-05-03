import React from 'react';
import styles from './breadcrumb.module.css';
import Link from 'next/link';

const Breadcrumb = () => {
  return (
    <div className={styles.headTitle}>
        <div className={styles.left}>
            <h1>Dashboard</h1>
            <ul className={styles.breadcrumb}>
                <li>
                    <Link href="#">Dashboard</Link>
                </li>
                <li><i className={styles.bx}></i></li>
                <li>
                    <Link href="#" className={styles.active}>Home</Link>
                </li>
            </ul>
        </div>
        <Link href="#" className={styles.btnDownload}>

            <i className='bx bxs-cloud-download' ></i>
            <span className={styles.text}>Download PDF</span>

        </Link>
    </div>
  )
}

export default Breadcrumb;