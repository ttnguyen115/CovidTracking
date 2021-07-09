import React from 'react'
import { FormControl, InputLabel, NativeSelect, FormHelperText } from '@material-ui/core';
import { CountryType } from '../../App';
import { FC } from 'react';

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
