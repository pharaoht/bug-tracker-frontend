import { issuesApi } from '@/api/Issues/issues.api';
import UserContext from '@/context/UserContext';
import useHttp from '@/hooks/useHttp';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './createIssue.module.css';
import Image from 'next/image';
import ButtonBtn from '@/components/Inputs/Button/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import TextAreaInput from '@/components/Inputs/TextArea/TextArea';
import SelectDropDownInput from '@/components/Inputs/DropDown/SelectDropDown';
import { formStateType } from '@/types/Dashboard/dashboardType';

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
        teamId: userProfileContext?.userInfo[0].teamId,
        file: null,
    });

    const formStateKeys = Object.keys(formState);

    const onChangeFormHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {

        if( 
            event.target instanceof HTMLInputElement 
            && event.target.files 
            && event.target.files.length > 0
        ){
            const selectedFile = event.target.files[0];

            setFormState(prev => ({
                ...prev,
                'file': selectedFile
            }))

            return
        }

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setFormState(prev => ({
            ...prev,
            [inputName]: inputValue
        }));

    };

    const validateForm = () => {};

    const onSubmitFormHandler = async ( event: React.MouseEvent<HTMLButtonElement> ) => {

        event.preventDefault();

        const responseCallback = (res: { data: string }) => {
            if(res.data == 'success'){
                alert('success')
                setIsOpen(false)
            }
        }

        if(token == ''){
            return 
        }

        await postCreateIssue(token, formState, sendRequest, responseCallback);

    };

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
                onChangeHandler={onChangeFormHandler} 
                labelTitle='Title'
                isRequired={true}
            />
            <TextAreaInput
                inputNameAttribute={formStateKeys[1]}
                inputValueAttribute={formState.description} 
                onChangeHandler={onChangeFormHandler} 
                isRequired={true}
                isDisabled={false}
                placeholder='Tell the team more about the issue *Required'
                labelTitle='Description'
            />
            <div className={styles.formGroup}>
                <label htmlFor='title'>Status</label>
                <input 
                    type="text" 
                    name={formStateKeys[2]} 
                    value={formState.status} 
                    disabled
                />
            </div>
            <SelectDropDownInput
                dropDownArray={priorities}
                inputNameAttribute={formStateKeys[3]}
                inputValueAttribute={formState.priority}
                labelTitle='Priority'
                onChangeHandler={onChangeFormHandler}
            />
            <input type='file' onChange={onChangeFormHandler} />
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