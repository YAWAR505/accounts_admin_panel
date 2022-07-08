import { makeStyles } from '@material-ui/core'
import React from 'react'
import Featured from './Revenue/Featured'
import TotalRevenue from './Revenue/TotalRevenue'
const usestyles = makeStyles(() => ({
  charts: {
    display: 'flex',

  }
}))
const Charts = () => {
  const classes = usestyles();
  return (
    <div className={classes.charts}>
      <Featured />
      <TotalRevenue title="Transactions" aspect={2 / 1} />
    </div>
  )
}

export default Charts