import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { CountryData } from '../../App';
import HighMaps from './../Charts/HighMaps';
import LineChart from './../Charts/LineChart';

interface Props {
    report: Array<CountryData>;
    selectedCountryId: string;
}

const Summary: FC<Props> = ({ report, selectedCountryId }) => {
    const [mapData, setMapData] = useState<any[]>([]);

    useEffect(() => {
        if (selectedCountryId) {
            const fetchMapData = async () => {
                const mapData = await import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`);
                setMapData(mapData);
            }

            fetchMapData();
        }
    }, [selectedCountryId]);

    return (
        <Grid container spacing={3} style={{ marginTop: 20 }}>
            <Grid item sm={8} xs={12}>
                <LineChart data={report} />
            </Grid>

            <Grid item sm={4} xs={12}>
                <HighMaps mapData={mapData} />
            </Grid>            
        </Grid>
    )
}

export default Summary
