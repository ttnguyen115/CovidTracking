import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { Summary } from '.';
import CountUp from 'react-countup';

const useStyles = makeStyles({
    wrapper: (props: Summary) => {
        if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c' };
        if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' };
        else return { borderLeft: '5px solid gray' };
    },

    title: {
        fontSize: 18,
        marginBottom: 5
    },

    count: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});

const HighlightCard: FC<Summary> = ({ title, count, type }) => {
    const classes = useStyles({ title, count, type });

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={classes.title}>{title}</Typography>
                <Typography component="span" variant="body2" className={classes.count}>
                    <CountUp end={count || 0} duration={2} separator=' ' />    
                </Typography>
            </CardContent>
        </Card>
    )
}

export default HighlightCard
