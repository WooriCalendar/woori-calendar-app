import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";

const NotificationModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [ntNo, setNtNo] = useState("");
  const [open, setOpen] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false); // 추가: 삭제 여부 상태
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const memberLanguage = memberData.language; // 멤버 데이터에서 언어 값을 추출
        setLanguage(memberLanguage); // 언어 값을 상태에 설정
        i18n.changeLanguage(memberLanguage); // 언어 값을 i18n에 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    loadData();
  }, [i18n]);

  const handleOpen = () => {
    setNtNo(props.itemNo);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNtNo(null);
  };

  const deleteNotification = () => {
    call("/notification", "DELETE", ntNo).then((response) => {
      window.location.reload();
    });
    handleClose();
  };
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
          {t(
            "Do you want to delete notification? If deleted, it is not possible to check it!"
          )}
        </Typography>
        <Button onClick={deleteNotification}>{t("Yes!")}</Button>
        <Button onClick={handleClose}>{t("No")}</Button>
      </Box>
    </Modal>
  );
};
export default NotificationModal;
