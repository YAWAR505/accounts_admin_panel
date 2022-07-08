import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const useStyles = makeStyles(() => ({
  loading: {
    width: '100%',
    display: 'flex',
    height: '980px',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#000",
    opacity: "0.2"
  },
  container_loading: {
    width: '50%',
    margin: '0  auto'

  }
}))
const Loader = () => {
  const classes = useStyles()

  return (
    <Box container className={classes.loading}>
      <div ClassNames={classes.container_loading}>
        <CircularProgress style={{ color: "pink" }} size={80} value={95} />
      </div>
    </Box>
  )
}

export default Loader