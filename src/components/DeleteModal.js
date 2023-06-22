import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { call } from "../service/ApiService";

const DeleteModal = (props) => {
  const { open, close } = props;
  // const [shar, setSahre] = useEffect("");

  // useEffect(() => {
  //   call("/share", "GET", null).then((response) => {
  //     setSahre(response);
  //     console.log("asdasdasd112", response);
  //   });
  //   // call("/share", "DELETE", null).then((response) => {});
  // }, []);
  const deleteButton = () => {
    // call("/calendar", "DELETE", null).then(() => {});
  };
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>Remove calendar?</div>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={deleteButton}
            >
              Completion
            </Button>
            <Button variant="contained" onClick={close}>
              취소
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default DeleteModal;
