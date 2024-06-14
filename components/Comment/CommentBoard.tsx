import Comment from './Comment/Comment';
import ButtonBtn from '../Inputs/Button/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextInput from '../Inputs/TextInput/TextInput';
import styles from './commentBoard.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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

    const { postCreateCommentToIssueId, getCommentsByIssueId, deleteCommentToIssueId } = commentApi;

    const { isLoading: postLoading, sendRequest, error } = useHttp();

    const { isLoading: deleteLoading, sendRequest: deleteRequest, error: deleteError } = useHttp();

    const isValid = inputValue == '' ? true : false;

    const commentBoardRef = useRef<HTMLDivElement>(null);

    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => setInputValue(event.target.value);

    const onEditHandler = ( event: React.MouseEvent<HTMLButtonElement>, commentId: number ) => {
        
    }

    const onDeleteHandler = async ( event: React.MouseEvent<HTMLButtonElement>, commentId: number ) => {

        event.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want to delete?');

        if (!isConfirmed) return;

        const id = String(commentId);

        const responseCallback = ( res: any) => {

            if(res.data == 'success'){
                alert('Deleted Successfully')
            };

            if(typeof res == 'string'){
                alert('Your session expired, please login again')
            }

            getCommentsByIssueId(issueId, setComments, commentRequest);

        };

        await deleteCommentToIssueId(token, id, deleteRequest, responseCallback);

    }

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

               getCommentsByIssueId(issueId, setComments, commentRequest);

               alert('success');

            }
            if(typeof result === 'string'){

                alert(result);

            }
        }

        await postCreateCommentToIssueId(token, postBody, sendRequest, callbackFunc);
    };

    const renderComments = () => (

        <div className={styles.texts}>
            {
                commentData?.map((itm, idx) => (
                    <Comment
                        key={itm.id}
                        commentId={String(itm.id)}
                        commentDate={itm.createdAt}
                        commentText={itm.text}
                        commentUserId={String(itm.userId)}
                        createdBy={itm.createdBy}
                        profileImageUrl={itm.imageUrl}
                        isUserLogIn={isLoggedIn}
                        onDeleteHandler={onDeleteHandler}
                        loginUserId={userId}
                        loadingState={deleteLoading}
                    />
                ))
            }
        </div>
    );

    useEffect(() => {
    if (commentBoardRef.current) {
        commentBoardRef.current.scrollTop = 270
    }
    }, []);

    return (
        <div className={styles.container}>
            <label 
                className={styles.labelText}
            >
                Comments 
            </label>
            <div className={styles.commentBoard} ref={commentBoardRef}>
    
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