import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from 'react-select';
import Image from 'next/image';
import { useState } from 'react';

interface OptionType {
    id: string
    name: string;
    imageUrl: string;
    value: number;
    label: string;
}

interface CustomSelectProps {
    options: OptionType[];
    onChangeHandler: (...args: any) => void;
    isDisabled?: boolean;
    formkey: string;
}

const customStyles: StylesConfig<OptionType> = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
};

const CustomSelect = ({options, onChangeHandler, formkey }: CustomSelectProps) => {

    const [ selectedOption, setSelectedOption ] = useState<SingleValue<OptionType>>(null);

    const formatOptionLabel = ({ name, imageUrl }: OptionType ) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={imageUrl} alt="user_image" height={20} width={20} />
            <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
    );

    const selectOnChange = (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        //type assertion is safe because we are checking that its an array
        if (!Array.isArray(newValue)) {
        
        setSelectedOption(newValue as SingleValue<OptionType>);

        onChangeHandler(formkey, String((newValue as SingleValue<OptionType>)?.id));
        }

    };

    return (
        <div>
            <label>Send Message To</label>
            <Select 
                options={options}
                onChange={selectOnChange}
                value={selectedOption}
                isDisabled={false}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
};

export default CustomSelect;