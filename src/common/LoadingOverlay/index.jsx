import { Spinner } from "flowbite-react";
import React from "react";

export default function Loader({ visible = false }) {
  return (
    visible && (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#ffffff8f",
          width: "100%",
          zIndex: "1000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <Spinner color="success" size="xl"  />
      </div>
    )
  );
}
