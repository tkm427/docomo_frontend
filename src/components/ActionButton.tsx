"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { endSession } from "../api/request";
type ActionButtonProps = {
  zoomUrl: string;
  sessionId: string;
};

export default function ActionButton({
  zoomUrl,
  sessionId,
}: ActionButtonProps) {
  const router = useRouter();
  const handleButtonClick = () => {
    window.open(zoomUrl, "_blank"); // 別タブでzoomUrlを開く
  };
  const handleEndButtonClick = async () => {
    const response = await endSession(sessionId); // セッションを終了する
    router.push("/"); // アンケートページに遷移
  };
  return (
    <Box
      sx={{
        mt: 4,
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#F00033",
          color: "white",
          height: 50,
          mb: 2,
          fontSize: "18px",
        }}
        onClick={handleButtonClick} // ボタンクリックでURLに遷移
      >
        参加する
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          color: "#F00033",
          borderColor: "#F00033",
          height: 50,
          fontSize: "18px",
        }}
        onClick={() => handleEndButtonClick()}
      >
        アンケートへ
      </Button>
    </Box>
  );
}
