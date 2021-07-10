import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import React, { FC } from 'react';
import { CountryType } from '../../App';

interface Props {
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    countries: CountryType[];
    value: string;
}

const CountrySelector: FC<Props> = ({ handleChange, countries, value }) => {
    return (
        <FormControl>
            <InputLabel htmlFor="country-selector" shrink>Country</InputLabel>

            <NativeSelect
                value={value}
                onChange={handleChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {
                    countries.map((country: CountryType) => (
                        <option value={country.ISO2.toLowerCase()} key={country.ISO2}>
                            {country.Country}
                        </option>
                    ))
                }
            </NativeSelect>

            <FormHelperText>Choose a country</FormHelperText>
        </FormControl>
    )
}

export default CountrySelector
