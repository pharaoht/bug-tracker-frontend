import { useEffect, useRef } from 'react';
import styles from './textArea.module.css';

interface TextAreaPropTypes {
    inputNameAttribute: string;
    inputValueAttribute: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    labelTitle: string;
    isDisabled?: boolean;
    margin?: boolean;
}

const TextAreaInput = ({ inputNameAttribute, inputValueAttribute, onChangeHandler, placeholder, isDisabled, isRequired, labelTitle, margin }: TextAreaPropTypes ) => {

    const bottomMargin = margin ? styles.noMargin : styles.margin;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {

        if(textAreaRef.current){

            if(textAreaRef?.current?.scrollHeight > 237){
                return
            }
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [inputValueAttribute])

    return (
        <div className={styles.formGroup}>
            <label 
                className={styles.labelText}
                htmlFor={inputNameAttribute}
            >
                {labelTitle}
            </label>
            <textarea
                id={inputNameAttribute}
                ref={textAreaRef}
                className={styles.textArea}
                name={inputNameAttribute}
                value={inputValueAttribute}
                disabled={isDisabled || false}
                placeholder={placeholder}
                onChange={(event) => onChangeHandler(event)}
            >

            </textarea>
        </div>
    )
};

export default TextAreaInput;