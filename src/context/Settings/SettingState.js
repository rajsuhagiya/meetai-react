import { useState } from "react";
import SettingContext from "./SettingContext";
import { toast } from "react-toastify";

const UserState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const settingInitial = [];

  const [setting, setSetting] = useState({
    id: "",
    botName: "",
  });

  const getSetting = async () => {
    const response = await fetch(`${host}/api/setting/getsetting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setSetting(json.data);
  };

  const updateSetting = async (id, botName) => {
    console.log(id);
    const response = await fetch(`${host}/api/setting/updatesetting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, botName }),
    });
    const setting = await response.json();
    if (setting.status === 200) {
      toast.success(setting.success);
    }
    setSetting(setting);
  };

  return (
    <>
      <SettingContext.Provider value={{ setting, getSetting, updateSetting }}>
        {props.children}
      </SettingContext.Provider>
    </>
  );
};

export default UserState;
