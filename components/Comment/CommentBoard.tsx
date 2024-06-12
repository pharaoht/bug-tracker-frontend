import Image from 'next/image';
import ButtonBtn from '../Inputs/Button/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextInput from '../Inputs/TextInput/TextInput';
import styles from './commentBoard.module.css';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { commentApi } from '@/api/Comments/comments.api';
import useHttp from '@/hooks/useHttp';

interface CommentData {
    id: number,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    imageUrl: string,
    teamName: string,
    text: string, 
}

interface CommentBoardProps {
    commentData: CommentData[];
    isLoading: boolean;
    isLoggedIn :boolean;
    userId: string;
    issueId: string;
    token: string;
    setComments: (...args: any) => void;
    commentRequest: (...args: any) => any;
}

const CommentBoard = ( { commentData, isLoading, isLoggedIn, userId, issueId, token, setComments , commentRequest }: CommentBoardProps) => {

    const [ inputValue, setInputValue ] = useState<string>('');

    const { postCreateCommentToIssueId, getCommentsByIssueId } = commentApi;

    const { isLoading: postLoading, sendRequest, error } = useHttp();

    const isValid = inputValue == '' ? true : false;

    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => setInputValue(event.target.value);

    const onSubmitHandler =  async ( event: React.MouseEvent<HTMLButtonElement> ) => {

        event.preventDefault();

        const postBody = {
            comment: inputValue,
            userId: userId,
            issueId: issueId
        };

        const callbackFunc = ( result: any ) => {

            if(result?.data == 'success'){
               setInputValue('');
               getCommentsByIssueId(issueId, setComments, commentRequest)
               alert('success')
            }
            if(typeof result === 'string'){
                alert(result)
            }
        }

        await postCreateCommentToIssueId(token, postBody, sendRequest, callbackFunc);
    };

    const renderComments = () => (

        <div className={styles.texts}>
            {
                commentData.map((itm, idx) => (
                    <div key={itm.id} className={styles.commentContainer}>

                        <div className={styles.commentHeader}>
                            <div className={styles.profileImage}>
                                <Image width={25} height={25} src={itm.imageUrl} alt={`${itm.createdBy}'s profile`} />
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>{itm.createdBy}</span>
                                <b><span className={styles.commentDate}>{itm.createdAt}</span></b>
                            </div>
                        </div>
                        <div className={styles.commentText}>
                            {itm.text}
                        </div>
                    </div>
                ))
            }
        </div>
    );

    return (
        <div className={styles.container}>
            <label 
                className={styles.labelText}
            >
                Comments 
            </label>
            <div className={styles.commentBoard}>
                { isLoading &&   
                    <div className={styles.spanCenter}>
                       <CircularProgress/>
                    </div> 
                }

                { !isLoading && ( commentData.length > 0 ? renderComments() 
                    : 
                        <div className={styles.spanCenter}>No comments</div> 
                    ) 
                }
        
                {
                    isLoggedIn && 
                    (
                        <div className={styles.inputSection}>
                            <div style={{width:'100%'}}>
                                <TextInput
                                    inputNameAttribute='message'
                                    inputValueAttribute={inputValue}
                                    placeholder='Start typing'
                                    onChangeHandler={(event) => onChangeHandler(event)}
                                    isRequired={false}
                                    labelTitle=''
                                    margin={true}
                                />
                            </div>
                            <ButtonBtn
                                type='button'
                                isDisabled={isValid}
                                loadingState={postLoading}
                                onClickHandler={onSubmitHandler}
                                buttonText='Add'
                                buttonStyleColor='blue'
                            />
                        </div>
                    )
                }

            </div>
        </div>
    )
};


export default CommentBoard;