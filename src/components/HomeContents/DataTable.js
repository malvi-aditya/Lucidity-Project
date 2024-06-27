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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
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
                <StyledTableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{'$'}{' '}{item.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">{'$'}{' '}{item.value}</StyledTableCell>
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
                      <IconButton disabled={!admin || item.disabled}>
                        {" "}
                        <VisibilityIcon />
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
                        disabled={!admin || item.disabled}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
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
