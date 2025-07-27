import { useState } from "react";
import "./PopUp.css"
import Modal from "@mui/material/Modal"
import Box from '@mui/material/Box';

import Category from "../categories/Category";
import Typography from "@mui/material/Typography";
import PopUpBox from "./PopUpBox";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '400px', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PopUp ({open, onClose, txn, date, setTxns, setPopUp}) { 
    return (
        <Modal 
            open={open} 
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        > 
            <PopUpBox sx={style} txn={txn} date={date} setTxns={setTxns} setPopUp = {setPopUp}/>
        </Modal>
    )
}