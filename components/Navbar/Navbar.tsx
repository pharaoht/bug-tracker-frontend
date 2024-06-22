'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import UserContext from '@/context/UserContext';
import { authApi } from '@/api/Auth/auth.api';
import useHttp from '@/hooks/useHttp';
import Image from 'next/image';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { connectSocket, disconnectSocket } from '@/sockets';
import { notificationsApi } from '@/api/Notifications/notifications.api';
import Notifications from '../Notfications/Notifications';

const Navbar = () => {

    const [ notifications, setNotifications ] = useState<any[]>([]);

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const userContext = useContext(UserContext);

    const userProfile = userContext?.userInfo || [];

    const userToken = userContext?.token || '';

    const currentUserId = userProfile[0]?.id || ''

    const isLoggedIn = userContext?.isLoggedIn || false;

    const contextSetterUserProfile = userContext?.setUserInfo || (() => {})

    const { userDetails, logout } = authApi;

    const { getNotificationsByUserId, deleteNotificationById, updateNotificationById } = notificationsApi;

    const { isLoading, sendRequest } = useHttp();

    const { isLoading: notificationLoading, sendRequest: notificationRequest, error: notificationError } = useHttp();

    const requestCallback = async ( response: [] ) => {

        if(typeof response == 'string'){

            await logout(sendRequest, contextSetterUserProfile);
        }
        else {
            contextSetterUserProfile(response)
        }

    }

    const openNotificationHandler = ( event: React.MouseEvent<HTMLAnchorElement ,MouseEvent>) => {
        event.preventDefault();
        setIsOpen(!isOpen)
    }

    const getNotifications = async () => {

        await getNotificationsByUserId(userToken, currentUserId, setNotifications, notificationRequest);
    }

    const deleteNotification = async ( notificationId: string ) => {
        await deleteNotificationById(userToken, notificationId, notificationRequest);
        await getNotifications();
    }

    const updateNotificationAsRead = async ( notificationId: string ) => {
        await updateNotificationById(userToken, notificationId, notificationRequest);
        await getNotifications();
    }

    useEffect(() =>{

        if(!isLoggedIn && userToken){
            const tk =  userToken
            userDetails(requestCallback, sendRequest, tk)
        }
    }, [ userToken ]);

    useEffect(() => {

        if(userProfile.length > 0){
            connectSocket(currentUserId, setNotifications)
        }

        if(notifications.length == 0 && currentUserId){
            getNotifications()
        }

        return () => {
            disconnectSocket();
        };

    }, [userProfile])

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
            <span>
                {
                    isLoggedIn ? `Welcome ${userProfile[0].name}` : 'Not logged in'
                }
            </span>
            { isLoggedIn &&
                <div className={styles.notificationContainer}>
                    <Link href="#" className={styles.notification} onClick={(event) => openNotificationHandler(event)}>
                        <i className={`${styles.bx} ${styles.bellIcon}`}>
                            <NotificationsIcon/>
                        </i>
                        {   notifications.length > 0 &&
                            <span className={styles.num}>{notifications.length}</span>
                        }
                    </Link>
                    {
                        isOpen && 
                        <Notifications 
                            notifications={notifications} 
                            updateHandler={updateNotificationAsRead} 
                            deleteHandler={deleteNotification}
                        />
                    }
                </div>
            }
            { isLoggedIn &&
                <Link href="#" className={styles.profile}>
                    <Image src={userProfile[0]?.imageUrl} height={30} width={30} alt='user profile'/>
                </Link>
            }
        </nav>
    )
}

export default Navbar;