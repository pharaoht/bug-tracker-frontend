import React, { ChangeEvent, useState } from 'react';
import styles from './messageBoard.module.css';
import Image from 'next/image';
import { selectedUserProps } from '@/containers/Messages/Messages';
import TextInput from '../Inputs/TextInput/TextInput';
import ButtonBtn from '../Inputs/Button/Button';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import useHttp from '@/hooks/useHttp';
import { messagesApi } from '@/api/Messages/messages.api';

interface MessageBoardPropTypes {
    selectedUser: selectedUserProps;
    chats: any[];
    ownerId: string;
    loadConversations: boolean;
    token: string;
    setSelectedUser: React.Dispatch<React.SetStateAction<selectedUserProps>>;
}

const MessageBoard = ({ selectedUser, chats, ownerId, loadConversations, token, setSelectedUser }: MessageBoardPropTypes) => {

    const [ messageInput, setMessageInput ] = useState<string>('');

    const { sendRequest, error, isLoading } = useHttp();

    const { postCreateMessage } = messagesApi;

    const isBtnDisabled = messageInput.length == 0 ? true : false;
    
    const isFromOwner = ( senderId: string, ownerId: string ): string => {

        if(Number(senderId) === Number(ownerId)){
            return styles.owner
        }

        return styles.otherUser;
    };

    const submitHandler = ( event: React.MouseEvent<HTMLButtonElement> ) => {

        event.preventDefault();
    
        const body = {
            senderId: ownerId,
            receiverId: selectedUser.userId,
            message: messageInput
        };

        const cb = ( data: any[] ) => {
            return
        }

        postCreateMessage(token, body, sendRequest, cb);

        setMessageInput('');

        setSelectedUser(prev => ({
            ...prev,
            newMessage: true
        }))
       
    }

    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {

        const value = event.target.value;

        setMessageInput(value);
    };

    return (
        <div className={styles.container}>

            { selectedUser.userId !== '' && chats.length !== 0 &&
                <div className={styles.profileBar}>
                    <div className={styles.details}>
                        <span>
                            <Image src={selectedUser?.userImage} alt='user_image' height={45} width={45} />
                        </span>
                        <span className={styles.text}>
                            {selectedUser.userName}
                        </span>
                    </div>
                    <div className={styles.actions}>
                       
                    </div>
                </div>
            }

            <div className={styles.chatContainer}>
                { chats?.length > 0 && !loadConversations && ownerId && chats?.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${isFromOwner(message.senderId, ownerId)}`}
                    >
                        <p className={styles.messageText}>
                            {message.messageText}
                        </p>
                        <span className={styles.timestamp}>{message.createdAt}</span>
                    </div>
                ))}

                { (selectedUser.userId == '' && chats.length == 0) && !ownerId && <span className={styles.noChats}>No chat selected</span>}
                { loadConversations && <span className={styles.noChats}><CircularProgress/></span> }
            </div>

            { selectedUser.userId !== '' && chats.length !== 0 &&
                <div className={styles.inputSection}>

                    <div style={{width:'100%'}}>
                        <TextInput
                            inputNameAttribute='message'
                            inputValueAttribute={messageInput}
                            placeholder={'Send a message'}
                            onChangeHandler={onChangeHandler}
                            isRequired={false}
                            labelTitle=''
                            margin={true}
                            isDisabled={false}
                        />
                    </div>
                    <ButtonBtn
                        type='button'
                        isDisabled={isBtnDisabled}
                        loadingState={isLoading}
                        onClickHandler={submitHandler}
                        buttonText='Send'
                        buttonStyleColor='blue'
                    />
                </div>
            }

        </div>
    )
}

export default MessageBoard

