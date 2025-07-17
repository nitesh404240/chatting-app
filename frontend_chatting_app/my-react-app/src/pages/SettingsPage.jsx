import React from "react";

const SettingsPage = ({ theme, settheme }) => {
  function handelclick() {
    if (theme === "dark") {
      settheme("sun");
    } else {
      settheme("dark");
    }
  }

  return (
    <div className="mt-60">
      <button type="button" onClick={handelclick}>
        change theme
      </button>
    </div>
  );
};

export default SettingsPage;
