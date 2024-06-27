import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditModal from "./EditModal";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles(() => ({
  table: {
    marginLeft: "16px",
    marginRight: "16px",
    paddingTop: "16px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, disabled }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3b3737",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#3b3737",
    color: disabled ? theme.palette.common.gray : theme.palette.common.white,
  },
}));

export default function DataTable(props) {
  const { data, setData, admin } = props;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState();

  return (
    <>
      <div class={classes.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Value</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <StyledTableCell disabled={item.disabled}>
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" disabled={item.disabled}>
                    {item.category}
                  </StyledTableCell>
                  <StyledTableCell align="center" disabled={item.disabled}>
                    {"$"} {item.price}
                  </StyledTableCell>
                  <StyledTableCell align="center" disabled={item.disabled}>
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center" disabled={item.disabled}>
                    {"$"} {item.value}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div class={classes.actionButtons}>
                      <IconButton
                        onClick={() => {
                          setEditData(item);
                          setOpenModal(true);
                        }}
                        disabled={!admin || item.disabled}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        disabled={!admin}
                        onClick={() => {
                          setData((prev) => {
                            let newData = [...prev].map((obj) => {
                              if (obj.id === item.id)
                                return { ...obj, disabled: !obj.disabled };
                              return obj;
                            });
                            return newData;
                          });
                        }}
                      >
                        {item.disabled ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setData((prev) => {
                            let newData = [...prev].filter(
                              (obj) => obj.id !== item.id
                            );
                            return newData;
                          });
                        }}
                        disabled={!admin}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <EditModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editData={editData}
        setEditData={setEditData}
        setData={setData}
      />
    </>
  );
}
