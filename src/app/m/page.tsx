import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import Header from "../../components/Header"; // 先ほど作成したヘッダーコンポーネントをインポート

const MainPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Image
            src="/conversation.svg"
            alt="ディス活 Logo"
            width={190}
            height={100}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, color: "#ff0033" }}
        >
          今日も頑張ろう！
        </Typography>
        <Box sx={{ width: "100%", mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: "#ff0033",
              "&:hover": { bgcolor: "#d50000" },
            }}
          >
            マッチング開始
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#ff0033",
              borderColor: "#ff0033",
              "&:hover": { borderColor: "#d50000", color: "#d50000" },
            }}
          >
            フィードバック確認
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
