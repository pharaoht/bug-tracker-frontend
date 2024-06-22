import styles from './textInput.module.css';

interface TextInputPropTypes {
    inputNameAttribute: string;
    inputValueAttribute: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    labelTitle: string;
    isDisabled?: boolean;
    margin?: boolean;
}

const TextInput = ({ placeholder, isRequired, onChangeHandler, labelTitle, inputNameAttribute, inputValueAttribute, isDisabled, margin }: TextInputPropTypes) => {

   const bottomMargin = margin ? styles.noMargin : styles.margin;

   return (
        <div className={`${styles.formGroup} ${bottomMargin}`}>
            <label 
                className={styles.labelText}
                htmlFor={inputNameAttribute}
            >
                {labelTitle}
            </label>
            <input
                id={inputNameAttribute}
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