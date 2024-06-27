import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function Text({children}) {
  return (
    <span style = {{color: 'white'}}> {children}</span>
  )
}