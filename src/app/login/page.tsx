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
            justifyContent: "center",
            marginTop: 4,
            padding: 4,
            boxShadow: 1,
            borderRadius: 2,
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: 3, color: "#ff0033", textAlign: "center" }}
          >
            ログイン
          </Typography>
          <TextField
            label="Eメール"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="メールアドレスを入力してください。"
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
