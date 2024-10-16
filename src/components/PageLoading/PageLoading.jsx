import React from "react";
import { PulseLoader } from "react-spinners";
import { themeColor } from "@/theme/color";

function PageLoading() {
  const componentStyles = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={componentStyles}>
      <PulseLoader color={themeColor.primary} loading={true} size={18} speedMultiplier={0.7} />
    </div>
  );
}

export default PageLoading;
