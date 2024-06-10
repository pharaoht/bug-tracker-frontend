import styles from './pagination.module.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useContext, useEffect } from 'react';
import DashboardContext from '@/context/DashboardContext';


interface PaginationPropTypes {

}

const Paginator = ({}: PaginationPropTypes) => {

    const dashboardContext = useContext(DashboardContext);

    const currentOffset = dashboardContext?.queryParams.offset || 0;

    const currentPage = dashboardContext?.pagination.currentPage || 1;

    const totalPages = dashboardContext?.pagination.pageTotal || 1;

    const onClickIncrementPagination = () => {
            if(currentPage === totalPages) return undefined;

            dashboardContext?.setQueryParamsFunc('offset', Number(currentOffset) + 10);
    }

    const onClickDecrementPagination = () => {
            if(currentOffset == 0) return undefined;

            dashboardContext?.setQueryParamsFunc('offset', Number(currentOffset) - 10);
    }

    return (
        <div className={styles.container}>
            <ul className={styles.uList}>

                <li onClick={onClickDecrementPagination}><NavigateBeforeIcon fontSize='small'/></li>
                <li><span>{currentPage} of {totalPages}</span></li>
                <li onClick={onClickIncrementPagination}><NavigateNextIcon fontSize='small'/></li>

            </ul>
        </div>
    )
};


export default Paginator;