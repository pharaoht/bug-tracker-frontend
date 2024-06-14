import { isValidElement } from 'react';
import styles from './button.module.css';
import { CircularProgress } from '@mui/material';

interface ButtonBtnPropTypes {
    type: 'button' | 'submit' | 'reset'; 
    onClickHandler: (...args: any) => void;
    buttonText: string;
    buttonIcon?: React.ReactNode;
    buttonStyleColor?: 'orange' | 'yellow' | 'blue' | 'green' | 'red';
    loadingState?: boolean;
    isDisabled?: boolean;
    size?: 'small' | 'medium' | 'large'
}

const ButtonBtn = (
    { type, isDisabled, onClickHandler, buttonText, buttonIcon, buttonStyleColor, loadingState, size } : ButtonBtnPropTypes
) => {

    const cssBtnColor = styles[buttonStyleColor || ''];

    const cssBtnSize = styles[size || 'medium'];

    return (
        <button
            className={`${styles.buttonSkeleton} ${cssBtnColor} ${cssBtnSize}`}
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