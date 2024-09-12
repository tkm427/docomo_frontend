"use client";

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
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../../components/Header';

const SurveyPage = () => {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({
    userA: false,
    userB: false,
    userC: false,
    userD: false,
  });
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});

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

  const handleRatingChange = (user: string, questionIndex: number, value: number) => {
    setRatings((prev) => ({ ...prev, [`${user}-${questionIndex}`]: value }));
  };

  const userQuestions = [
    { question: '積極性', description: '自ら進んで物事に取り組む姿勢がある。' },
    { question: '論理的思考', description: '筋道を立てて物事を考えている。' },
    { question: 'リーダーシップ', description: 'チームをまとめ、方向性を示し、目標達成に向けてメンバーを導いている。' },
    { question: '協調性', description: 'チームメンバーと協力し合いながら、目標に向かって進めている。' },
    { question: '発信力', description: '自分の意見を伝えている。' },
    { question: '他のメンバーへの気配り', description: 'チームの雰囲気やメンバーの状況に敏感であり、他者のサポートや配慮を適切に行なっている。' },
  ];

  return (
    <RecoilRoot>
      <Header />

      <Container maxWidth="md">
        {/* タイトルの追加 */}
        <Typography
          variant="h4"
          sx={{
            color: '#F00033',  // 赤色に設定
            fontWeight: 'bold', // 太字に設定
            textAlign: 'center', // 中央揃えに設定
            mt: 4,  // 上部に余白を追加
          }}
        >
          他のメンバーのフィードバックを記入しましょう！
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {['A', 'B', 'C', 'D'].map((user) => (
            <Box key={user}>
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold', textAlign: 'center', mr: 1, color: '#333', // 文字を濃く設定
                  }}
                >
                  ユーザー{user}
                </Typography>
                <IconButton onClick={() => toggleUserForm(`user${user}`)}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              {expandedUsers[`user${user}`] && (
                <>
                  {userQuestions.map((item, index) => (
                    <Box key={index} sx={{ mb: 4, textAlign: 'center' }}>
                      <Accordion
                        expanded={expandedPanels.includes(index)}
                        onChange={() => togglePanel(index)}
                        sx={{
                          boxShadow: 'none',  // ボックスシャドウを削除
                          backgroundColor: 'transparent',  // 背景色を透明に
                          '&:before': {
                            display: 'none',  // デフォルトの枠線を非表示に
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                        >
                          <FormLabel component="legend" sx={{ width: '100%', textAlign: 'center' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem',
                                textAlign: 'center',
                                color: '#333',  // 文字を濃く設定
                              }}
                            >
                              {item.question}
                            </Typography>
                          </FormLabel>
                        </AccordionSummary>
                        {item.description && (
                          <AccordionDetails>
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 1,
                                fontSize: '1rem',
                                textAlign: 'center',
                                color: '#333', // 文字を濃く設定
                              }}
                            >
                              {item.description}
                            </Typography>
                          </AccordionDetails>
                        )}
                      </Accordion>

                      {/* ラジオボタンの位置を揃え、間隔を広げる */}
                      <RadioGroup
                        row
                        value={ratings[`${user}-${index}`] || ''}
                        onChange={(e) => handleRatingChange(user, index, parseInt(e.target.value))}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mt: 2,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Box
                            key={value}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              mx: 4,  // 間隔をさらに広げる
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                color: '#333', // 文字を濃く設定
                              }}
                            >
                              {value}
                            </Typography>
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label=""
                              sx={{ margin: 0 }}  // ラベルのマージンを削除して中央に揃える
                            />
                          </Box>
                        ))}
                      </RadioGroup>
                    </Box>
                  ))}

                  {/* フィードバック入力（枠線を再表示） */}
                  <TextField
                    fullWidth
                    label={`フィードバック（ひとこと）`}
                    variant="outlined"  // 枠線を表示するためにvariantをoutlinedに変更
                    multiline
                    rows={3}
                    sx={{
                      mt: 4,
                      fontSize: '1rem',
                      fontWeight: 'bold',  // 文字を太く設定
                      color: '#333',  // 文字を濃く設定
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#333',  // 文字を濃く設定
                      },
                    }}
                  />
                </>
              )}
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F00033',
                color: '#fff',
                width: '50%',
                padding: '10px 0',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#d0002b',
                },
              }}
            >
              送信
            </Button>
          </Box>
        </Paper>
      </Container>
    </RecoilRoot>
  );
};

export default SurveyPage;
