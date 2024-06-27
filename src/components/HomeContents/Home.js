import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import Stats from "./Stats";
import CircularProgress from "@mui/material/CircularProgress";
import Text from "./Text";
import DataTable from "./DataTable";

const useStyles = makeStyles(() => ({
  root: {},
  centerContents: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
    gap: "5px",
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const [admin, setAdmin] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    try {
      let res = await fetch(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      let resJson = await res.json();
      let finalData = resJson.map((item, i) => {
        return {
          ...item,
          id: i,
          disabled: false,
          price: item.price[0] === "$" ? item.price.slice(1) : item.price,
          value: item.value[0] === '$' ? item.value.slice(1) : item.value,
        };
      });
      setData(finalData);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data && !error)
    return (
      <div class={classes.centerContents}>
        <CircularProgress /> <br />
        <Text>Loading Data</Text>
      </div>
    );
  else if (!data && error)
    return (
      <div class={classes.centerContents}>
        {" "}
        <Text>Unexpected Error Occured: {error} </Text>
      </div>
    );

  return (
    <div className={classes.root}>
      <NavBar admin={admin} setAdmin={setAdmin} />
      <Stats data={data} />
      <DataTable data={data} setData={setData} admin={admin} />
    </div>
  );
}
