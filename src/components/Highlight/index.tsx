import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { CountryData } from '../../App';
import HighlightCard from './HighlightCard';

interface Props {
    report: Array<CountryData>;
}

export interface Summary {
    title: string;
    count: number;
    type: string;
}

const Highlight: FC<Props> = ({ report }) => {
    const data = (report && report.length) && report[report.length - 1];
    
    const summary: Array<Summary> = [
        {
            title: 'Active cases',
            count: data ? data.Confirmed : 0,
            type: 'confirmed',
        },

        {
            title: 'Recovered',
            count: data ? data.Recovered : 0,
            type: 'recovered',
        },

        {
            title: 'Deaths',
            count: data ? data.Deaths : 0,
            type: 'deaths',
        },
    ];

    return (
        <Grid container spacing={3}>
            {
                summary.map((item: Summary, index: number) => (
                    <Grid key={index} item sm={4} xs={12}>
                        <HighlightCard title={item.title} count={item.count} type={item.type} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Highlight
