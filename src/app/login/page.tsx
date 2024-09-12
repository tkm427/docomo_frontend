"use client";

import React, { useState } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { login } from "../../api/request";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      console.log(response.userId);
      localStorage.setItem("userId", response.userId);
      router.push("/m");
    } else {
      alert("ログインに失敗しました。");
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          mt: 10, // 画面上部からの距離を増やしてフォームを下に移動
          mb: 6,
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
            justifyContent: "center",
            padding: 6, // パディングをさらに増やす
            boxShadow: 1,
            borderRadius: 2,
            width: "100%",
            maxWidth: "450px", // 幅を少し広げる
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: 4,
              color: "#ff0033",
              textAlign: "center",
              fontSize: "2.2rem",
              fontWeight: "bold",
            }} // フォントサイズをさらに大きく
          >
            ログイン
          </Typography>
          <TextField
            label="Eメール"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="メールアドレスを入力してください。"
            sx={{ mb: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            placeholder="パスワードを入力してください。"
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton
            text="サインイン"
            colorType="primary"
            onClick={handleLogin}
          />
          <CustomButton
            text="新規登録はこちら"
            colorType="secondary"
            onClick={() => router.push("/register")}
          />
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
