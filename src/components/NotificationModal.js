import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import {call} from "../service/ApiService";
const NotificationModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [ntNo, setNtNo] = useState("");
    const [open, setOpen] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false); // 추가: 삭제 여부 상태
    const handleOpen = () => {
        setNtNo(props.itemNo)
            setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
        setNtNo(null);
    }

    const deleteNotification = () => {
        call("/notification", "DELETE",  ntNo).then((response) => {
            console.log("찍테", ntNo)
            console.log(response.data);
            window.location.reload()
        });
        handleClose();
    }
    React.useEffect(() => {
            handleOpen();
    }, [props.itemNo]);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    알림을 삭제하시겠어요? 삭제된 알림은 다시 볼 수 없어요!
                </Typography>
                <Button onClick={deleteNotification}>네!</Button>
                <Button onClick={handleClose}>아니요!</Button>
            </Box>
        </Modal>
    )
}
export default NotificationModal;