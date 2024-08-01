import React, { useContext, useEffect, useState } from 'react';
import styles from './messages.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import List from '@/components/List/List';
import MessageBoard from '@/components/MessageBoard/MessageBoard';
import useHttp from '@/hooks/useHttp';
import UserContext from '@/context/UserContext';
import { messagesApi } from '@/api/Messages/messages.api';
import ContainerModal from '@/components/Modal/Modal';
import CreateChat from '@/components/Forms/CreateChat/CreateChat';

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

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const [ chats, setChats ] = useState<any[]>([])

    const userProfileContext = useContext(UserContext);

    const isLoggedIn = userProfileContext?.isLoggedIn || false;

    const userProfile = userProfileContext?.userInfo && userProfileContext?.userInfo[0] || {};

    const token = userProfileContext?.token || '';

    const { id } = userProfile || {};

    const { getLatestConversations, getMessagesById, putUpdateReadStatus } = messagesApi;

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
    };

    const setMessagesAsRead = async () => {
    
        if(!isLoggedIn || !token ){
            return undefined
        };

        const callback = () => {
            return
        }

        await putUpdateReadStatus(selectedUser.userId, id, token, conversationRequest, callback);
    }

    const openModal = () => {
    
        if(!isLoggedIn){
            alert('You must log in');
            return undefined
        }
        setIsOpen(true)
    }

    useEffect(() => { getConversations() }, [ isOpen ]);

    useEffect(() => {
        if(selectedUser.userId !== ''){
            getMessages();
        }

        if(selectedUser.newMessage){
            getConversations();
            setSelectedUser(prev => ({...prev, newMessage: false}))
        } 
            
    }, [ selectedUser ]);

    useEffect(() => {
        if(selectedUser.userId !== '') {
            setMessagesAsRead();
            getConversations();
        }
    }, [ selectedUser.userId ])

    return (
        <section className={styles.section}>
            <Breadcrumb
                openModule={openModal}
                title='Messages'
                location='Home'
                greenBtnTitle='Create Chat'
                searchPlaceHolder='Search messages'
                
            />
            <div className={styles.container}>
                <List 
                    listData={cons || []}
                    isLogin={isLoggedIn}
                    title='Chats'
                    setSelectedUser={setSelectedUser}
                    isError={conversationError}
                    logginId={id}
                />
                <MessageBoard
                    selectedUser={selectedUser}
                    chats={chats ?? []}
                    ownerId={id ?? ''}
                    loadConversations={loadConversations}
                    token={token}
                    setSelectedUser={setSelectedUser}
                />
            </div>
            <ContainerModal isOpen={isOpen} onClose={() => setIsOpen}>
                <CreateChat formToggle={setIsOpen} logginId={id} token={token}/>
            </ContainerModal>
        </section>
    )
}

export default Messages;