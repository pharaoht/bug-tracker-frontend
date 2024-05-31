import styles from './pagination.module.css';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';


interface PaginationPropTypes {

}

const Paginator = ({}: PaginationPropTypes) => {

    return (
        <div className={styles.container}>
            <ul className={styles.uList}>
                <li><FirstPageIcon fontSize='small'/></li>
                <li><NavigateBeforeIcon fontSize='small'/></li>
                <li><span>1 of 2</span></li>
                <li><NavigateNextIcon fontSize='small'/></li>
                <li><LastPageIcon fontSize='small'/></li>
            </ul>
        </div>
    )
};


export default Paginator;