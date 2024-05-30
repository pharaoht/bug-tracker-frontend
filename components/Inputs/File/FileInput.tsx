import styles from './fileInput.module.css';

interface FileInputPropTypes {
    label: string;
    onChangeHandler: (...args: any) => void;
}

const FileInput = ({ label, onChangeHandler }: FileInputPropTypes) => {

    return (
        <div className={styles.formGroup}>
            <label>{label}</label>
            <input onChange={onChangeHandler} className={styles.fileInput} type='file' />
        </div>
    )
};

export default FileInput;