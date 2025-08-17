import Modal from "@mui/material/Modal";
import PopUpBox from "./PopUpBox";

export default function PopUp({ open, onClose, txn, date, setTxns, setPopUp }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="transaction-modal"
        >
            <PopUpBox
                txn={txn}
                date={date}
                setTxns={setTxns}
                setPopUp={setPopUp}
            />
        </Modal>
    );
}
