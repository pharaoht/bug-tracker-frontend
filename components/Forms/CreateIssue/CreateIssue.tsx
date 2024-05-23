import { issuesApi } from '@/api/Issues/issues.api';
import UserContext from '@/context/UserContext';
import useHttp from '@/hooks/useHttp';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './createIssue.module.css';
import Image from 'next/image';
import ButtonBtn from '@/components/Inputs/Button/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextInput from '@/components/Inputs/TextInput/TextInput';

interface formStateType {
    title: string;
    description: string;
    status: string;
    priority: string;
    userId: string;
    teamId: string
}

interface CreateIssuePropTypes {
    setIsOpen: (isOpen: boolean) => void;
}

const priorities = [
    { displayName: 'Low', value: 'low'},
    { displayName: 'Medium', value: 'medium'},
    { displayName: 'High', value: 'high'},
]

const CreateIssue = ({ setIsOpen }: CreateIssuePropTypes ) => {

    const userProfileContext = useContext(UserContext);

    const token = userProfileContext?.token || '';

    const { postCreateIssue } = issuesApi;

    const { isLoading, sendRequest, error } = useHttp();

    const [ formState, setFormState ] = useState<formStateType>({
        title: '',
        description:'',
        status:'OPEN',
        priority: priorities[0].value,
        userId: userProfileContext?.userInfo[0].id,
        teamId: userProfileContext?.userInfo[0].teamId
    });

    const formStateKeys = Object.keys(formState);

    const onChangeFormHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setFormState(prev => ({
            ...prev,
            [inputName]: inputValue
        }));

    };

    const validateForm = () => {};

    const onSubmitFormHandler = async ( event: React.MouseEvent<HTMLButtonElement> ) => {

        const responseCallback = (res: { data: string }) => {
            if(res.data == 'success'){
                alert('success')
                setIsOpen(false)
            }
        }

        event.preventDefault();
    
        if(token == ''){
            return 
        }

        const response = await postCreateIssue(token, formState, sendRequest, responseCallback);

    };



    const renderSelect = () => (
        <div className={styles.formGroup}>
            <label htmlFor="priority">Priority:</label>
            <select className={styles[formState.priority]} name={formStateKeys[3]} value={formState.priority} onChange={(event) => onChangeFormHandler(event)}>
                {
                    priorities.map((itm) => (
                        <option key={itm.value} className={styles.options} value={itm.value}>{itm.displayName}</option>
                    ))
                }
            </select>
        </div>
    )

    useEffect(() =>{
        if(error){
            alert(error)
        }
    }, [error])


    return (
        <form className={styles.form}>
            <div className={styles.headTitle}>
                <div className={styles.left}>
                    <h1>Create Issue</h1>
                </div>
                <div>
                    <ButtonBtn
                        type='button'
                        onClickHandler={() => setIsOpen(false)}
                        buttonText='X'
                        buttonStyleColor='orange'
                        loadingState={false}
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label>Reporting by:</label>
                <div className={styles.profile}>
                    <Image src={userProfileContext?.userInfo[0].imageUrl} alt='user image' height={30} width={30}/>
                    <span>Assigned to: <b>{userProfileContext?.userInfo[0].name}</b> (You)</span> 
                    <span>Allocated to team: {userProfileContext?.userInfo[0].teamName}</span>
                </div>
            </div>
            <TextInput
                placeholder='Whats the issue? *Required'
                inputNameAttribute={formStateKeys[0]} 
                inputValueAttribute={formState.title} 
                onChangeHandler={(event) =>onChangeFormHandler(event)} 
                labelTitle='Title'
                isRequired={true}
            />
            <div className={styles.formGroup}>
                <label htmlFor='description'>Description</label>
                <textarea 
                    name={formStateKeys[1]} 
                    value={formState.description} 
                    onChange={(event) =>onChangeFormHandler(event)} 
                    required 
                    placeholder='Tell the team more about the issue *Required'
                ></textarea>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor='title'>Status</label>
                <input 
                    type="text" 
                    name={formStateKeys[3]} 
                    value={formState.status} 
                    disabled
                />
            </div>
            { renderSelect() }
            <ButtonBtn 
                type='submit'
                buttonStyleColor='green'
                onClickHandler={(event) => onSubmitFormHandler(event)}
                buttonText='Create'
                buttonIcon={<SaveIcon fontSize='small'/>}
                loadingState={isLoading}
            />
        </form>
    )
}

export default CreateIssue