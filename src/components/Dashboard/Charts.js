import { Box, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Featured from './Revenue/Featured'
import TotalRevenue from './Revenue/TotalRevenue'
import Widget from './Widget'
const usestyles = makeStyles(() => ({
  charts: {
    display: 'flex',
    marginTop: "15px",
    width: "100%"

  },
  totalrevenue: {
    marginLeft: "10px"
  }
}))
const Charts = () => {
  const classes = usestyles();
  return (
    <>
      <Grid container rowSpacing={2}
        columnSpacing={2} >
        <Grid xs={12} md={3} mr={1}>
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
      <div className={classes.charts}>
        <Featured />
        <TotalRevenue title="Total Students In Class" aspect={2 / 1} />
      </div>
    </>

  )
}

export default Charts