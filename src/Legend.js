import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    legend: { color: 'white', marginBottom: theme.spacing(2), marginTop: theme.spacing(2), display: "flex", justifyContent:"center", alignItems:"center" },
    star: { height: 40, marginRight: theme.spacing(1) },
    score: { display: "flex", alignItems:"center", color: theme.palette.primary.main },
    repository: { marginLeft: theme.spacing(2), marginRight: theme.spacing(2) }
}));

export default function Legend() {
    const classes = useStyles();
    return (
        <div className={classes.legend}>
            <Typography>Legenda:</Typography>
            <Chip
                component="small"
                size="small"
                label="nazwa repozytorium"
                className={classes.repository}
            />
            <div className={classes.score}>
                <StarIcon className={classes.star} />
                <Typography>Suma iloczynów pull requestów oraz gwiazdek repozytoriów</Typography>
            </div>
        </div>
    );
}
