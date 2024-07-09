import React, { useContext, useEffect, useState } from 'react';
import styles from './messages.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import List from '@/components/List/List';
import MessageBoard from '@/components/MessageBoard/MessageBoard';
import useHttp from '@/hooks/useHttp';
import UserContext from '@/context/UserContext';
import { messagesApi } from '@/api/Messages/messages.api';

export interface selectedUserProps {
    userId: string,
    userImage: string,
    userName: string,
    newMessage: boolean,
}

const Messages = () => {

    const [ cons, setCons ] = useState<any>([]);

    const [ selectedUser, setSelectedUser ] = useState<selectedUserProps>({
        userId: '',
        userImage: '',
        userName: '',
        newMessage: false,
    });

    const [ chats, setChats ] = useState<any[]>([])

    const userProfileContext = useContext(UserContext);

    const isLoggedIn = userProfileContext?.isLoggedIn || false;

    const userProfile = userProfileContext?.userInfo && userProfileContext?.userInfo[0] || {};

    const token = userProfileContext?.token || '';

    const { id } = userProfile || {};

    const { getLatestConversations, getMessagesById } = messagesApi;

    const { isLoading: loadConversations, sendRequest: conversationRequest, error: conversationError } = useHttp();

    const getConversations = async () => {
    
        if(!isLoggedIn){

            return setCons([]);
        };
   
        await getLatestConversations(id, token, setCons, conversationRequest);
    };

    const getMessages = async () => {

        if(!isLoggedIn || !token ){
            return undefined
        }

        await getMessagesById(id, token, selectedUser.userId, setChats, conversationRequest);
    }

    useEffect(() => {
        getConversations()
    }, []);

    useEffect(() => {
        if(selectedUser.userId !== ''){
            getMessages();
        }

        if(selectedUser.newMessage){
            setSelectedUser(prev => ({...prev, newMessage: false}))
        } 
            
    }, [selectedUser])

    return (
        <section className={styles.section}>
            <Breadcrumb
                openModule={()=>{}}
                title='Messages'
                location='Home'
                greenBtnTitle='Create Message'
                searchPlaceHolder='Search messages'
            />
            <div className={styles.container}>
                <List 
                    listData={cons || []}
                    isLogin={isLoggedIn}
                    title='Chats'
                    setSelectedUser={setSelectedUser}
                />
                <MessageBoard
                    selectedUser={selectedUser}
                    chats={chats}
                    ownerId={id || ''}
                    loadConversations={loadConversations}
                    token={token}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </section>
    )
}

export default Messages;