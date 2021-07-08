import React from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const Highlight = () => {
    return (
        <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Cases</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            </Grid>
            
            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Recovery</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Death</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Highlight
