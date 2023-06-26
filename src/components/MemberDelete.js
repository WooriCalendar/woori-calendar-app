import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DeleteMember from "./DeleteMember";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService.js";

const MemberDelete = (props) => {
  const { open, close } = props;
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>{t("would you like to delete this account?")}</div>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={openModal}
            >
              {t("Secession")}
            </Button>
            <DeleteMember open={modalOpen} close={closeModal} />
            <Button variant="contained" onClick={close}>
              {t("Cancel")}
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default MemberDelete;
