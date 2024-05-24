import { isValidElement } from 'react';
import styles from './button.module.css';
import { CircularProgress } from '@mui/material';

interface ButtonBtnPropTypes {
    type: 'button' | 'submit' | 'reset'; 
    onClickHandler: (...args: any) => void;
    buttonText: string;
    buttonIcon?: React.ReactNode;
    buttonStyleColor?: 'orange' | 'yellow' | 'blue' | 'green';
    loadingState?: boolean;
    isDisabled?: boolean;
}

const ButtonBtn = (
    { type, isDisabled, onClickHandler, buttonText, buttonIcon, buttonStyleColor, loadingState } : ButtonBtnPropTypes
) => {

    const cssBtnColor = styles[buttonStyleColor || ''];

    return (
        <button
            className={`${styles.buttonSkeleton} ${cssBtnColor}`}
            type={type}
            onClick={onClickHandler}
            disabled={loadingState || isDisabled || false}
        >
            { !loadingState &&
                buttonIcon &&
                    <i className={styles.buttonIcon}>
                        { 
                            isValidElement(buttonIcon) && buttonIcon
                        }              
                    </i>
            }
            <span className={styles.buttonText}>
                {
                    loadingState 
                    ? <CircularProgress size={25}/>
                    : buttonText
                }
            </span>
        </button>
    )
};

export default ButtonBtn;