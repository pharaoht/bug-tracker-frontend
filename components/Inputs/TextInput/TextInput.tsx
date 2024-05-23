import styles from './textInput.module.css';

interface TextInputPropTypes {
    inputNameAttribute: string;
    inputValueAttribute: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    labelTitle: string;
    isDisabled?: boolean;
}

const TextInput = ({ placeholder, isRequired, onChangeHandler, labelTitle, inputNameAttribute, inputValueAttribute, isDisabled }: TextInputPropTypes) => {

   return (
        <div className={styles.formGroup}>
            <label 
                className={styles.labelText}
                htmlFor={labelTitle}
            >
                {labelTitle}
            </label>
            <input
                className={styles.inputElement}
                type='text'
                name={inputNameAttribute}
                value={inputValueAttribute}
                placeholder={placeholder}
                required={isRequired || true}
                onChange={(event) => onChangeHandler(event)}
                disabled={isDisabled || false}
            />
        </div>
   )
};

export default TextInput;