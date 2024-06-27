import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Text from "./Text";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const useStyles = makeStyles(() => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "space-around",
    gap: "5px",
  },
  gridItem: {
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#3b3737",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function EditModal(props) {
  const { openModal, setOpenModal, editData, setEditData, setData } = props;
  const classes = useStyles();

  let itemvalue = Number(editData?.price) * Number( editData?.quantity)

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h4>
            <Text>Edit Product</Text>
          </h4>
          <h6>
            <Text>{editData?.name}</Text>
          </h6>
          <div class={classes.gridContainer}>
            <div class={classes.gridItem}>
              <Text>Category</Text>
              <TextField
                value={editData?.category}
                size="small"
                onChange={(e) => {
                  setEditData((prev) => {
                    return { ...prev, category: e.target.value };
                  });
                }}
              />
            </div>
            <div class={classes.gridItem}>
              <Text>Price</Text>
              <TextField
                value={`$${editData?.price}`}
                size="small"
                onChange={(e) => {
                  setEditData((prev) => {
                    return { ...prev, price: e.target.value.slice(1)};
                  });
                }}
              />
            </div>
            <div class={classes.gridItem}>
              <Text>Quantity</Text>
              <TextField
                value={editData?.quantity}
                size="small"
                onChange={(e) => {
                  setEditData((prev) => {
                    return { ...prev, quantity: e.target.value };
                  });
                }}
              />
            </div>
            <div class={classes.gridItem}>
              <Text>Value</Text>
              <TextField
                value={`$${itemvalue}`}
                size="small"
              />
            </div>
          </div>
          <br />
          <div class={classes.buttons}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setData((prev) => {
                  let newData = [...prev].map(obj => {
                    if (obj.id === editData.id) return {...editData, value: itemvalue};
                    else return obj;
                  });
                  return newData;
                });
                setOpenModal(false);
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
