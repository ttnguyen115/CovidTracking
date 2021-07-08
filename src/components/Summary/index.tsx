import React from 'react'
import { Grid } from '@material-ui/core';
import LineChart from './../Charts/LineChart/index';

const Summary = () => {
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart data={[]} />
            </Grid>

            <Grid item sm={4} xs={12}>
                
            </Grid>            
        </Grid>
    )
}

export default Summary
