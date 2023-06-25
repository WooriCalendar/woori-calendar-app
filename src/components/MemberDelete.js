import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteMember from "./DeleteMember";

const MemberDelete = (props) => {
  const { open, close } = props;
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>would you like to delete this account?</div>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={openModal}
            >
              secession
            </Button>
            <DeleteMember open={modalOpen} close={closeModal} />
            <Button variant="contained" onClick={close}>
              Cancel
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default MemberDelete;
