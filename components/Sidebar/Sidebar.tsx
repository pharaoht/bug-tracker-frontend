import React, { useContext } from 'react'
import styles from './sidebar.module.css';
import Link from 'next/link';
import { authApi } from '@/api/Auth/auth.api';
import { SideMenuLinksType } from '@/types/Sidebar/sidebarTypes';
import useHttp from '@/hooks/useHttp';
import UserContext from '@/context/UserContext';

interface SidebarProps {
    pageIndex: Number;
    setPageIndex: (args: any) => void; 
}

const Sidebar = ({ pageIndex, setPageIndex }: SidebarProps) => {

    const userContext = useContext(UserContext);

    const { sendRequest } = useHttp()

    const isLoggedIn = userContext?.isLoggedIn || false;

    const sideMenuLinks: SideMenuLinksType[] = [
        { title: 'Dashboard', icon: '' },
        { title: 'All Issues', icon: ''},
        { title: 'Messages', icon: ''},
        { title: 'Teams', icon: ''},
    ]

    const loginHandler = () => {
        authApi.login()
    }
    const logoutHandler = () => {
        authApi.logout(sendRequest, userContext?.setUserInfo || (()=>{}))
    }

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
                <span className={styles.text}>Bug Tracker</span>
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
                {
                    isLoggedIn ?
                    (
                        <li onClick={logoutHandler}>
                            <Link href="#" className={`${styles.link} ${styles.logout}`}>
                                    <i className={styles.bx} ></i>
                                    <span className={styles.text}>Logout</span>
                            </Link>
                        </li>
                    )
                    :
                    <li onClick={loginHandler}>
                        <Link href="#" className={`${styles.link} ${styles.login}`}>
                                <i className={styles.bx} ></i>
                                <span className={styles.text}>Login</span>
                        </Link>
                    </li>
                }

            </ul>
        </section>
  )
}

export default Sidebar;