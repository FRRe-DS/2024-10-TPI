import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getQRToken } from "./action";

function QRCode({ id }: { id: number }) {
  const [url, setUrl] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function generateUrl() {
      if (typeof window !== "undefined") {
        try {
          const currentUrl = window.location.origin;
          const token = (await getQRToken()).qr_token;
          console.log("Token:", token);
          const newUrl = `${currentUrl}/Esculturas/${id}/${token}`;
          if (isMounted) {
            setUrl(newUrl);
          }
        } catch (error) {
          console.error("Error generating URL:", error);
        }
      }
    }
    generateUrl();
    const interval = setInterval(() => {
      generateUrl();
    }, 600000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    }; // Cleanup on component unmount
  }, []);

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: isFullScreen ? "100vh" : "auto",
        width: isFullScreen ? "100vw" : "auto",
        position: isFullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        backgroundColor: isFullScreen ? "rgba(0, 0, 0, 1)" : "transparent",
        cursor: "pointer",
        zIndex: "auto",
      }}
    >
      <div id="qr">
        {url && <QRCodeSVG value={url} size={isFullScreen ? 800 : 400} />}
      </div>
    </div>
  );
}

export default QRCode;
