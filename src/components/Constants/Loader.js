import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const useStyles = makeStyles(()=>({
    loading:{
      width: '100%',
  display: 'flex',
  height: '100vh',
  flexDirection:'column',
  justifyContent:"center",
  alignItems: 'center',
    },
    container_loading:{
      width: '50%',
    
     margin: '0  auto'
  
    }
  }))
const Loader = () => {
  const classes  = useStyles()

  return (
    <Box container className={classes.loading}> 
        <div ClassNames={classes.container_loading}>
         <CircularProgress color="secondary" />
        </div>
        </Box>
  )
}

export default Loader