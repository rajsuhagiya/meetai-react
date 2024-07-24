import React, { useContext, useEffect, useState } from "react";
import settingContext from "../context/Settings/SettingContext";
import { useFormik } from "formik";
import { BotSchema } from "../schemas";

const Bot = () => {
  const { setting, getSetting, updateSetting } = useContext(settingContext);
  const [settingData, setSettingData] = useState({
    id: "",
    ebotName: "",
  });
  useEffect(() => {
    const fetchSettingData = async () => {
      await getSetting();
    };
    fetchSettingData();
  }, []);
  useEffect(() => {
    if (setting) {
      setSettingData({
        id: setting._id,
        ebotName: setting.botName || "",
      });
    }
  }, [setting]);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await updateSetting(settingData.id, settingData.ebotName);
  //   await getSetting(); // Optional: refetch user data after update
  // };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: settingData,
      validationSchema: BotSchema,
      onSubmit: async (values, action) => {
        await updateSetting(values.id, values.ebotName);
        await getSetting();
        action.resetForm();
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="botName" className="form-label">
            Bot Name
          </label>
          <input
            type="name"
            className="form-control"
            id="botName"
            name="ebotName"
            value={values.ebotName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.ebotName && touched.ebotName ? (
            <small className="form-text text-danger">{errors.ebotName}</small>
          ) : null}
        </div>
        <button type="submit" className="btn btn-theme">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default Bot;
