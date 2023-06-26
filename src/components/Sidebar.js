import "../css/Sidebar.css";
import FullCalendars from "./FullCalendars";
import Category from "./Category";
import {Button, Fab, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import BasicMenu from "./BasicMenu";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";
import { useEffect } from "react";
const Sidebar = (
  { visible, aspectRatio, height, contentHeight, onCategoryChange },
  props
) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const language = memberData.language;

        i18n.changeLanguage(language);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    return (
        <div>
            {visible && (
                <div className="slide-out">
                    <BasicMenu />
                    <FullCalendars
                        headerToolbar={headerToolbar}
                        heigth={height}
                        contentHeight={contentHeight}
                        aspectRatio={aspectRatio}
                    />
                    <form>
                        <TextField
                            label={t("search")}
                            variant="outlined"
                            size="small"
                        />
                    </form>
                    <Category onCategoryChange={onCategoryChange}/>
                </div>
                )}
        </div>
      )}
    </div>
  );
};
export default Sidebar;
