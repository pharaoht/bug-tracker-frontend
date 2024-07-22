import SearchIcon from '@mui/icons-material/Search';
import styles from './searchbar.module.css';
import TextInput from '../Inputs/TextInput/TextInput';
import ButtonBtn from '../Inputs/Button/Button';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import DashboardContext from '@/context/DashboardContext';

interface searchbarProps {
    placeHolder: string;
}

const Searchbar = ({  placeHolder }:searchbarProps) => {

    const [ inputValue, setInputvalue ] = useState<string>('');

    const dashboardContext = useContext(DashboardContext);

    const lastQuery = dashboardContext?.lastQueryChanged || '';

    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => { 

        if(lastQuery !== 'searchTerm'){

            dashboardContext?.setQueryParamsFunc('offset', 0);
        }

        setInputvalue(event.target.value);
        
        dashboardContext?.setQueryParamsFunc('searchTerm', event.target.value);
            
    };


    useEffect(() => {

        if(lastQuery == '') return;

        if(inputValue == '') return;

        if(lastQuery !== 'searchTerm') setInputvalue('');

    }, [lastQuery])

    return (
        <div className={styles.containerSearch}>
            <TextInput 
                placeholder={placeHolder}
                isRequired={false}
                labelTitle=''
                onChangeHandler={(event) => onChangeHandler(event)}
                inputNameAttribute='searchInput'
                inputValueAttribute={inputValue}
                inputType='Search'
                margin={true}
            />
            <ButtonBtn 
                type='button'
                buttonIcon={<SearchIcon/>}
                buttonText=''
                onClickHandler={() => {}}
                buttonStyleColor='blue'
                isSearch={true}
                size='search'
            />
        </div>
    )
}

export default Searchbar;