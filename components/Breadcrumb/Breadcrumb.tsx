import React from 'react';
import styles from './breadcrumb.module.css';
import Link from 'next/link';

interface BreadcrumbProps {
    title: string;
    location: string;
    openModule: (...args: any) => void;
}

const Breadcrumb = ({ title, location, openModule} : BreadcrumbProps) => {
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

        <div className={styles.btnHolder}>
            
            <div className={styles.create} onClick={openModule}>
                <span className={styles.text}>Create Issue</span>
            </div >

            <div className={styles.btnDownload}>
                <i className='bx bxs-cloud-download' ></i>
                <span className={styles.text}>Download PDF</span>
            </div>
        </div>
    </div>
  )
}

export default Breadcrumb;