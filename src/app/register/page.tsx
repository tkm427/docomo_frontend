"use client";

import React from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "next/navigation";
import { register } from "../../api/request";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    const response = await register(name, email, password);
    if (response) {
      router.push("/login");
    } else {
      alert("新規登録に失敗しました。");
    }
  };
  return (
    <>
      {/* ヘッダーの表示 */}
      <Header />

      {/* コンテンツ部分 */}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // 垂直方向に中央揃え
            marginTop: 4,
            padding: 4,
            boxShadow: 1,
            borderRadius: 2,
            width: "100%", // 親コンテナの幅を固定
            maxWidth: "400px", // ボタンが同じ幅になるように固定
            margin: "0 auto", // 横方向に中央揃え
          }}
        >
          {/* タイトル */}
          <Typography
            variant="h4"
            sx={{ marginBottom: 3, color: "#ff0033", textAlign: "center" }}
          >
            新規登録
          </Typography>

          {/* 入力フィールド */}
          <TextField
            label="名前"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="入力してください。"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Eメール"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="入力してください。"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            placeholder="入力してください。"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <CustomButton
            text="新規登録"
            colorType="primary"
            onClick={handleRegister}
          />
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
