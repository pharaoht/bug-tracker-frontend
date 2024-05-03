import React from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <i className={`${styles.bx} ${styles.icon}`}></i>
        <Link href="#" className={`${styles.navLink}`}>Categories</Link>
        <form action="#">
            <div className={`${styles.formInput}`}>
                <input type="search" placeholder="Search..." />
                <button type="submit" className={`${styles.searchBtn}`}><i className={`${styles.bx} ${styles.searchIcon}`}></i></button>
            </div>
        </form>
        <input type="checkbox" className={styles.switchMode} hidden />
        <label htmlFor="switchMode" className={`${styles.switchMode}`}></label>
        <Link href="#" className={`${styles.notification}`}>
            <i className={`${styles.bx} ${styles.bellIcon}`}></i>
            <span className={`${styles.num}`}>8</span>
        </Link>
        <Link href="#" className={`${styles.profile}`}>
            hi
        </Link>
    </nav>
  )
}

export default Navbar;