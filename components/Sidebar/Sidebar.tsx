import React from 'react'
import styles from './sidebar.module.css';
import Link from 'next/link';
import { SideMenuLinksType } from '@/types/Sidebar/sidebarTypes';

interface SidebarProps {
    pageIndex: Number;
    setPageIndex: (args: any) => void; 
}

const Sidebar = ({ pageIndex, setPageIndex }: SidebarProps) => {

    const sideMenuLinks: SideMenuLinksType[] = [
        { title: 'Dashboard', icon: '' },
        { title: 'All Issues', icon: ''},
        { title: 'Messages', icon: ''},
        { title: 'Teams', icon: ''},
    ]

    const renderSideMenu = () => (
        sideMenuLinks.map((itm, idx) => (
            <li key={itm.title} className={`${idx === pageIndex && styles.active}`} onClick={() => setPageIndex(idx)}>
                <Link href="#" className={styles.link}>
                        <i className={styles.bx}></i>
                        <span className={styles.text}>{itm.title}</span>
                </Link>
            </li>
        ))
    )

    return (
        <section className={styles.sidebar}>
            <Link href="#" className={styles.brand}>
                <i className={styles.bx}></i>
                <span className={styles.text}>AdminHub</span>
            </Link>
            <ul className={styles.sideMenu}>
                {renderSideMenu()}
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