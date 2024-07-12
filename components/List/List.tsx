import React from 'react';
import Image from 'next/image';
import styles from './list.module.css';
import MessageIcon from '@mui/icons-material/Message';
import { selectedUserProps } from '@/containers/Messages/Messages';


interface ListPropTypes {
    listData: any[];
    isLogin: boolean;
    title: string;
    setSelectedUser: React.Dispatch<React.SetStateAction<selectedUserProps>>;
    isError: string;
    logginId: string;
}

const List = ({ listData, isLogin, title, setSelectedUser, isError, logginId } : ListPropTypes) => {

    const onClickHandler = (userId: string, userImage: string, receiverName: string) => {
        setSelectedUser(prev => ({
            ...prev,
            userId: userId,
            userImage: userImage,
            userName: receiverName
        }))
    }

    const truncateText = (text: string): string => {

        return text.length > 30 ? text.substring(0, 30) + '...' : text
    }

    const renderList = (): React.ReactNode => (
    
        <ul className={styles.ulContainer}>
        
            { listData.length >= 1 && listData?.map((itm, idx) => (
            
                <li key={itm.id} 
                    className={styles.liContainer} 
                    onClick={() => onClickHandler(itm.receiverId, itm.receiverImageUrl, itm.receiverName)}
                >
                    <div className={styles.liImage}>
                        <Image src={itm.receiverImageUrl} alt='user_image' height={40} width={40}/>
                    </div>

                    <div className={styles.liInfo}>
                        <div className={styles.messageInfo}>
                            <span>{itm.receiverName}</span>
                            {
                                
                                itm.isRead === false && itm.senderId !== logginId && <span className={styles.smallTxt}>New Message</span>
                            }
                            
                        </div>
                        <p><MessageIcon sx={{ fontSize: '13px', color: 'grey' }}/> {truncateText(itm.messageText)}</p>
                    </div>
    
                </li>
            ))}
        </ul>
    )

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            { isError !== '' && isError}
            { !isError && !isLogin && 'Not logged in'}
            { !isError && isLogin && listData.length > 0 && renderList() }
        </div>
    )
};

export default List;