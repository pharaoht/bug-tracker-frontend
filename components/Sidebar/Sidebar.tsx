import React from 'react'
import styles from './sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
        <Link href="#" className={styles.brand}>
            <i className={styles.bx}></i>
            <span className={styles.text}>AdminHub</span>
        </Link>
        <ul className={styles.sideMenu}>
            <li className={styles.active}>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>All Tickets</span>
                </Link>
            </li>
            <li>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Analytics</span>
                </Link>
            </li>
            <li>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Message</span>
                </Link>
            </li>
            <li>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Team</span>
                </Link>
            </li>
        </ul>
        <ul className={styles.sideMenu}>
            <li>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Settings</span>
                </Link>
            </li>
            <li>
                <Link href="#" className={`${styles.link} ${styles.logout}`}>
                        <i className={styles.bx} ></i>
                        <span className={styles.text}>Logout</span>
                </Link>
            </li>
        </ul>
    </section>
  )
}

export default Sidebar;