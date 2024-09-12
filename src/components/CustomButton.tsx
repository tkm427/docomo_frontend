import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  colorType?: "primary" | "secondary"; // 'colorType'プロパティで配色を制御
  href?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  colorType = "primary",
  href,
}) => {
  return (
    <Button
      variant="contained"  // すべてのボタンを 'contained' に統一
      fullWidth
      onClick={onClick}
      href={href}
      sx={{
        backgroundColor: colorType === "primary" ? "#ff0033" : "#fff",  // ボタンの背景色を調整
        color: colorType === "primary" ? "#fff" : "#ff0033",  // テキストの色を調整
        borderColor: "#ff0033",
        marginTop: 2,
        marginBottom: 2,
        padding: "12px 0",  // ボタンの高さを調整
        fontSize: "16px",  // フォントサイズを固定
        borderRadius: "8px",  // 角を統一
        border: colorType === "secondary" ? "2px solid #ff0033" : "none",  // 新規登録ボタンの枠線
        "&:hover": {
          backgroundColor: colorType === "primary" ? "#e6002e" : "#fff",  // ホバー時の背景色を調整
          borderColor: "#e6002e",
          color: colorType === "primary" ? "#fff" : "#e6002e",  // ホバー時のテキスト色を調整
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
