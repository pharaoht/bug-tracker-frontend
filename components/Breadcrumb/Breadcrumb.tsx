import React from 'react';
import styles from './breadcrumb.module.css';
import Link from 'next/link';

interface BreadcrumbProps {
    title: string;
    location: string;
}

const Breadcrumb = ({ title, location} : BreadcrumbProps) => {
  return (
    <div className={styles.headTitle}>
        <div className={styles.left}>
            <h1>{title}</h1>
            <ul className={styles.breadcrumb}>
                <li>
                    <Link href="#">{title}</Link>
                </li>
                <li><i className={styles.bx}>{'>'}</i></li>
                <li>
                    <Link href="#" className={styles.active}>{location}</Link>
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