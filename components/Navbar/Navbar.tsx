'use client'
import React, { useContext, useEffect } from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import UserContext from '@/context/UserContext';
import { authApi } from '@/api/Auth/auth.api';
import useHttp from '@/hooks/useHttp';
import Image from 'next/image';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {

    const userContext = useContext(UserContext);

    const userProfile = userContext?.userInfo || [];

    const userToken = userContext?.token || '';

    const isLoggedIn = userContext?.isLoggedIn || false;

    const contextSetterUserProfile = userContext?.setUserInfo || (() => {})

    const { userDetails } = authApi;

    const { isLoading, sendRequest } = useHttp()

    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : '';

    const token = urlParams == '' ? '' : urlParams.get('token');

    useEffect(() =>{

        if(!isLoggedIn){
            const tk = token || userToken
            userDetails(contextSetterUserProfile, sendRequest, tk)
        }
        if (token) {

            localStorage.setItem('token', token);
        }
    }, [token]);

    return (
        <nav className={styles.nav}>
            <form action="#">
                <div className={`${styles.formInput}`}>
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className={`${styles.searchBtn}`}>
  
                            <SearchIcon/>
                        
                    </button>
                </div>
            </form>
            {/* <input type="checkbox" className={styles.switchMode} hidden />
            <label htmlFor="switchMode" className={`${styles.switchMode}`}></label> */}
            <span>
                {
                    isLoggedIn ? `Welcome ${userProfile[0].name}` : 'Not logged in'
                }
            </span>
            { isLoggedIn &&
            <Link href="#" className={`${styles.notification}`}>
                
                <i className={`${styles.bx} ${styles.bellIcon}`}>
                    <NotificationsIcon/>
                </i>
                <span className={`${styles.num}`}>8</span>
            </Link>
            }
            { isLoggedIn &&
            <Link href="#" className={`${styles.profile}`}>
     
                    <Image src={userProfile[0]?.imageUrl} height={30} width={30} alt='user profile'/>
                
            </Link>
            }
        </nav>
    )
}

export default Navbar;