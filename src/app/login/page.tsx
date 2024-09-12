"use client";

import React from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import Link from "next/link";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

const LoginPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // 縦方向の中央揃え
            marginTop: 4,
            padding: 4,
            boxShadow: 1,
            borderRadius: 2,
            width: "100%",  // 親コンテナの幅を固定
            maxWidth: "400px",  // ボタンが同じ幅になるように固定
            margin: "0 auto",  // 横方向の中央揃え
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 3, color: "#ff0033", textAlign: "center" }}>
            ログイン
          </Typography>
          <TextField
            label="Eメール"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="メールアドレスを入力してください。"
            sx={{ mb: 2 }}  // マージンを少し追加
          />
          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            placeholder="パスワードを入力してください。"
            sx={{ mb: 2 }}  // マージンを少し追加
          />
          {/* サインインボタン */}
          <CustomButton text="サインイン" colorType="primary" />
          {/* 新規登録はこちらボタン */}
            <CustomButton text="新規登録はこちら" colorType="secondary" />
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
