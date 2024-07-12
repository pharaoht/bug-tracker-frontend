import useHttp from "@/hooks/useHttp";
import styles from './createChat.module.css';
import { usersApi } from "@/api/Users/users.api";
import { ChangeEvent, useEffect, useState } from "react";
import { messagesApi } from "@/api/Messages/messages.api";
import ButtonBtn from "@/components/Inputs/Button/Button";
import TextAreaInput from "@/components/Inputs/TextArea/TextArea";
import CustomSelect from "@/components/Inputs/CustomDropDown/CustomDropDown";

interface CreateChatPropTypes {
    logginId: string;
    token: string;
    formToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateChat = ({ formToggle, logginId, token }: CreateChatPropTypes ) => {

    const [ formState, setFormState ] = useState({
        senderId: logginId,
        receiverId:'',
        message:'',
    });

    const [ users, setUsers ] = useState<any[]>([]);

    const { isLoading, sendRequest, error } = useHttp();

    const { getAllUsers } = usersApi;

    const { postCreateMessage } = messagesApi;

    const getUsers = async () => await getAllUsers(sendRequest, setUsers);

    const submitHandler = ( event: React.MouseEvent<HTMLButtonElement> ) => {

        event.preventDefault();

        const cb = ( res: { data: string } ) => {
    
            if(res.data == 'success'){

                alert('success');

                formToggle(false);

                return
            } 

        }

        postCreateMessage(token, formState, sendRequest, cb);
        
    };

    const onChangeHandler = ( key: string, event: ChangeEvent<HTMLTextAreaElement> | string) => {

        if(typeof event === 'string'){

            setFormState( prev => ({
                ...prev,
                [key]: event
            }));

            return 
        }

        setFormState( prev => ({
            ...prev,
            [key]: event.target.value
        }));

    };


    useEffect(() => {
        Promise.all([
            getUsers(),
        ]);
    }, [])

    useEffect(()=>{
        if(error){
            alert(error)
        }
    }, [error])

    return (
        <form className={styles.form}>
            <div className={styles.headTitle}>
                <div className={styles.left}>
                    <h1>Create Chat</h1>
                </div>
                <div>
                    <ButtonBtn
                        type='button'
                        onClickHandler={() => formToggle(false)}
                        buttonText='X'
                        buttonStyleColor='orange'
                        loadingState={false}
                    />
                </div>
            </div>
            <CustomSelect
                options={users}
                onChangeHandler={onChangeHandler}
                formkey="receiverId"
            />
            <TextAreaInput 
                inputNameAttribute="message"
                placeholder="Send a message"
                inputValueAttribute={formState.message}
                onChangeHandler={(event) => onChangeHandler('message', event)}
                labelTitle="Message"
            />
            <ButtonBtn 
                type='submit'
                buttonStyleColor='green'
                onClickHandler={(event) => submitHandler(event)}
                buttonText='Send'
                buttonIcon={''}
                loadingState={isLoading}
            />
        </form>
    )
};


export default CreateChat;