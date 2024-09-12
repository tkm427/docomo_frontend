// src/app/survey/page.tsx
"use client"; // クライアントコンポーネントとして指定

import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../../components/Header'; // Headerコンポーネントのインポート

const SurveyPage = () => {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({
    userA: false,
    userB: false,
    userC: false,
    userD: false,
  });
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);

  const toggleUserForm = (userKey: string) => {
    setExpandedUsers((prev) => ({ ...prev, [userKey]: !prev[userKey] }));
  };

  const togglePanel = (panelIndex: number) => {
    setExpandedPanels((prevExpandedPanels) =>
      prevExpandedPanels.includes(panelIndex)
        ? prevExpandedPanels.filter((index) => index !== panelIndex)
        : [...prevExpandedPanels, panelIndex]
    );
  };

  const userQuestions = [
    { question: '積極性', description: '自ら進んで物事に取り組む姿勢がある。' },
    { question: '論理的思考', description: '筋道を立てて物事を考えている。' },
    { question: 'リーダーシップ', description: 'チームをまとめ、方向性を示し、目標達成に向けてメンバーを導いている。' },
    { question: '協調性' , description: 'チームメンバーと協力し合いながら、目標に向かって進めている。'},
    { question: '発信力', description: '自分の意見を伝えている。' },
    { question: '他のメンバーへの気配り', description: 'チームの雰囲気やメンバーの状況に敏感であり、他者のサポートや配慮を適切に行なっている。' },
  ];

  return (
    <RecoilRoot>
      {/* ヘッダーコンポーネントを埋め込み */}
      <Header />

      <Container maxWidth="md">
        {/* アンケートフォーム */}
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {['A', 'B', 'C', 'D'].map((user) => (
            <Box key={user}>
              {/* ユーザーのトグルと評価フォーム */}
              <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  ユーザー{user}
                </Typography>
                <IconButton onClick={() => toggleUserForm(`user${user}`)}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              {/* ユーザーの評価フォーム（トグル可能） */}
              {expandedUsers[`user${user}`] && (
                <>
                  {/* 質問リスト */}
                  {userQuestions.map((item, index) => (
                    <Box key={index} sx={{ mb: 4, textAlign: 'center' }}>
                      <Accordion
                        expanded={expandedPanels.includes(index)}
                        onChange={() => togglePanel(index)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                        >
                          <FormLabel component="legend">
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                              {item.question}
                            </Typography>
                          </FormLabel>
                        </AccordionSummary>
                        {item.description && (
                          <AccordionDetails>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              sx={{ mb: 1, fontSize: '1rem' }}
                            >
                              {item.description}
                            </Typography>
                          </AccordionDetails>
                        )}
                      </Accordion>

                      {/* 評価フォーム（常に表示） */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mt: 2,
                        }}
                      >
                        {/* 数字をラジオボタンの上に表示 */}
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Box
                            key={value}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              mx: 1,
                            }}
                          >
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {value}
                            </Typography>
                            <Radio value={value} name={`rating-${user}-${index}`} />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}

                  {/* フィードバック入力（各評価フォームの下に配置） */}
                  <TextField
                    fullWidth
                    label={`フィードバック（ひとこと） - ユーザー${user}`}
                    variant="outlined"
                    multiline
                    rows={3}
                    sx={{ mt: 4, fontSize: '1rem' }}
                    InputLabelProps={{ sx: { fontSize: '1.1rem', fontWeight: 'bold' } }}
                  />
                </>
              )}
            </Box>
          ))}
        </Paper>
      </Container>
    </RecoilRoot>
  );
};

export default SurveyPage;
