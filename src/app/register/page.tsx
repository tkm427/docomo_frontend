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
          mt: 12,  // さらに下に配置
          mb: 8,
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
            padding: 6,  // パディングを増やして要素を広くする
            boxShadow: 3,  // 影を強くする
            borderRadius: 4,  // 角をさらに丸める
            width: "100%",
            maxWidth: "500px",  // ボタンが同じ幅になるように幅をさらに広げる
            margin: "0 auto",
          }}
        >
          {/* タイトル */}
          <Typography
            variant="h4"
            sx={{ marginBottom: 5, color: "#ff0033", textAlign: "center", fontSize: '2.5rem', fontWeight: 'bold' }}  // フォントサイズをさらに大きく
          >
            新規登録
          </Typography>

          {/* 入力フィールド */}
          <TextField
            label="名前"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="名前を入力してください。"
            sx={{ mb: 4 }}
            InputProps={{ sx: { fontSize: '1.6rem', height: '70px' } }}  // フォントサイズと高さをさらに大きく
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Eメール"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Eメールを入力してください。"
            sx={{ mb: 4 }}
            InputProps={{ sx: { fontSize: '1.6rem', height: '70px' } }}  // フォントサイズと高さをさらに大きく
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
            sx={{ mb: 4 }}
            InputProps={{ sx: { fontSize: '1.6rem', height: '70px' } }}  // フォントサイズと高さをさらに大きく
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <CustomButton
            text="新規登録"
            colorType="primary"
            onClick={handleRegister}
            sx={{ fontSize: '1.6rem', padding: '16px 0', width: '100%', marginBottom: 2 }}  // ボタンをさらに大きくし、幅を100%に設定
          />
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
