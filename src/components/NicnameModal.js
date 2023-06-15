import { Button, TextField } from "@mui/material";
import React from "react";

const NicnameModal = (props) => {
  const { open, close } = props;

  const editEventHandler = () => {
    const updatedItem = {};
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div>
          <TextField
            style={{ width: "400px" }}
            id="outlined-required-name"
            label="이름"
            // defaultValue={item.name}
            // value={name}
            // onChange={handleNameChange}
            variant="outlined"
          ></TextField>
          <footer>
            <Button variant="contained" onClick={editEventHandler}>
              완료
            </Button>
            <Button variant="contained" onClick={close}>
              취소
            </Button>
          </footer>
        </div>
      ) : null}
    </div>
  );
};

export default NicnameModal;
