import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Text from "./Text";

const useStyles = makeStyles(() => ({
  root: { marginLeft: "16px", marginRight: "16px" },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "10px",
  },
  stat: {
    borderRadius: "10px",
    border: "1px solid gray",
    backgroundColor: "#3b3737",
    height: "100px",
    flexGrow: 1,
    padding: "10px",
  },
}));

export default function Stats(props) {
  const { data } = props;
  const classes = useStyles();

  const totalStoreValue = data.reduce((acc, curr) => {
    if (!curr.disabled) {
      let num = curr.value;
      acc += num - '';
    }
    return acc;
  }, 0);

  const outOfStock = data.reduce((acc, curr) => {
    if (curr.quantity === 0 && !curr.disabled) acc++;
    return acc;
  }, 0)

  const numberOfCategory = data.reduce((acc, curr) => {
    if (!acc.includes(curr.category) && !curr.disabled) acc.push(curr.category);
    return acc;
  }, []);

  const totalProducts = data.filter(obj => !obj.disabled);

  return (
    <div class={classes.root}>
      <h2>
        <Text>Inventory Stats</Text>
      </h2>
      <div class={classes.statsContainer}>
        <div class={classes.stat}>
          <Text>Total Products</Text> <br />
          <h4>
            <Text>{totalProducts.length}</Text>{" "}
          </h4>
        </div>
        <div class={classes.stat}>
          <Text>Total Store Value</Text> <br />
          <h4>
            <Text>$ {' '} {totalStoreValue}</Text>{" "}
          </h4>
        </div>
        <div class={classes.stat}>
          <Text> Out of Stock </Text> <br />
          <h4>
            <Text>{outOfStock}</Text>{" "}
          </h4>
        </div>
        <div class={classes.stat}>
          <Text>No. of Category</Text> <br />
          <h4>
            <Text>{numberOfCategory.length}</Text>{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}
