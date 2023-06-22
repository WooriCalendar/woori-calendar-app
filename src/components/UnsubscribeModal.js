import { Button } from "@mui/material";
import React from "react";

const UnsubscribeModal = (props) => {
  const { open, close } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>
                구독 취소하시겠습니까? <br />
                <br />
                더 이상 이 캘린더 및 일정에 액세스할 수 없게 됩니다.
                <br /> 캘린더에 액세스할 수 있는 다른 사용자는 계속 사용할 수
                있습니다.
              </div>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
            >
              확인
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

export default UnsubscribeModal;
