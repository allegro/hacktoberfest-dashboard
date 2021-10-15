import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    legend: { color: 'white', marginBottom: theme.spacing(2), marginTop: theme.spacing(2), display: "flex", justifyContent:"center", alignItems:"center" },
    star: { height: 40, marginRight: theme.spacing(1) }, 
    score: { marginLeft:theme.spacing(1), display: "flex", alignItems:"center", color: theme.palette.primary.main }
}));

export default function Legend() {
    const classes = useStyles();
    return (
        <Typography gutterBottom align="center" className={classes.legend}>
            Legenda:
            <Chip
                component="small"
                style={{ marginLeft: '10px' }}
                size="small"
                label="nazwa reporzytorium"
            />
            <div className={classes.score}>
                <StarIcon className={classes.star}/>
                <Typography>suma gwiazdek z repozytoriów</Typography>
            </div>
        </Typography>
    );
}
