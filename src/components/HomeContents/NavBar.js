import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@mui/material/Switch';
import Text from './Text'

const useStyles = makeStyles(() => ({
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '10px',
    paddingBottom: '5px',
  }
}));


export default function NavBar(props) {
  const classes = useStyles();
  const { admin, setAdmin } = props;

  return (
    <>
    <div class={classes.navbar} > 
      <Text> User </Text>
      <Switch checked={admin} onChange={() => setAdmin(prev => !prev)} />
      <Text> Admin </Text>
    </div >
    <div style = {{height:'1px', backgroundColor: "white"}}></div>
    </>
  )
}