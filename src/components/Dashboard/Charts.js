import { Box, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Featured from './Revenue/Featured'
import TotalRevenue from './Revenue/TotalRevenue'
import Widget from './Widget'
const usestyles = makeStyles(() => ({
  charts: {
    display: 'flex',

  }
}))
const Charts = () => {
  const classes = usestyles();
  return (
    <>
      <Box mb={4}>
        <Grid container spacing={1}>
          <Grid xs={12} md={3}>
            <Widget type="todaysPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="sevendaysPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="monthPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="TotalPayment" />
          </Grid>
        </Grid>
      </Box>
      <div className={classes.charts}>

        <Featured />
        <TotalRevenue title="Total Students In Class" aspect={2 / 1} />
      </div>
    </>

  )
}

export default Charts