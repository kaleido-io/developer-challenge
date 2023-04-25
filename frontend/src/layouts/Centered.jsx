import React from 'react';
import { Grid } from '@mui/material';

export function Centered({ children }) {
    return (
        <Grid container>
            <Grid xl={2} lg={1} item />
            <Grid xl={8} lg={10} md={12} item>{children}</Grid>
            <Grid xl={2} lg={1} item />
        </Grid>
    );
}
