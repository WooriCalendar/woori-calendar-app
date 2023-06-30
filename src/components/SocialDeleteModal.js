import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";

const SocialDeleteModal = (props) => {
  const { open, close } = props;
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response.email);
      // console.log("모달의모달의모달", response.email);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

  const submit = (e) => {
    e.preventDefault();

    call("/member", "DELETE", { member }).then((resp) => {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location = "/login";
      // console.log("삭제삭제삭제삭제", member);
    });
  };
  return (
    <div
      className={open ? "openModal modal" : "modal"}
      style={{ textAlign: "center" }}
    >
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "30px" }}>
              <span>{t("would you like to delete this account?")}</span>
            </div>
            <Button
              variant="outlined"
              color="error"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={submit}
            >
              {t("Secession")}
            </Button>
            <Button variant="outlined" onClick={close}>
              {t("Cancel")}
            </Button>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </div>
  );
};

export default SocialDeleteModal;
