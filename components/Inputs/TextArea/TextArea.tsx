import styles from './textArea.module.css';

interface TextAreaPropTypes {
    inputNameAttribute: string;
    inputValueAttribute: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    labelTitle: string;
    isDisabled?: boolean;
}

const TextAreaInput = ({ inputNameAttribute, inputValueAttribute, onChangeHandler, placeholder, isDisabled, isRequired, labelTitle }: TextAreaPropTypes ) => {

    return (
        <div className={styles.formGroup}>
            <label 
                className={styles.labelText}
                htmlFor={inputNameAttribute}
            >
                {labelTitle}
            </label>
            <textarea
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