"use client";

import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
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

import { feedback } from "../../api/request";
import axios from 'axios';
import { useRouter } from 'next/navigation';

// ユーザーへのフィードバックデータの型
type UserFeedback = {
  id: string;
  proactivity: number;
  logicality: number;
  leadership: number;
  cooperation: number;
  expression: number;
  consideration: number;
  comment: string;
};

// 全体のフィードバックデータの型
type FeedbackData = {
  sessionId: string; // セッションID
  senderId: string;  // フィードバックを送る自分のユーザーID
  users: Record<string, UserFeedback>; // ユーザーIDをキーとするフィードバックのオブジェクト
};

const SurveyPage = () => {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({}); // フィードバックコメント用
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState<string[]>([]); // 自分以外のメンバーのID
  const [userNames, setUserNames] = useState<string[]>([]); // 自分以外のメンバーの名前
  const [sessionId, setSessionId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUserIds = localStorage.getItem('userIds'); //自分以外のメンバーのID
    const storedUserNames = localStorage.getItem('userNames');
    const storedUserId = localStorage.getItem('userId'); // ログイン中の自分のID
    const storedSessionId = localStorage.getItem('sessionId');

    if (storedUserIds) {
      setUserIds(JSON.parse(storedUserIds)); // 文字列から配列に変換
    } else {
      setUserIds([
        "dd3c4e5e-4942-4364-b619-a094925791b0",
        "444fa44f-f4b1-4dff-b40a-977e16c7e8c8",
        "32eda27e-97c6-4cf0-a8d3-49cc60d460de",
        "fd8014d4-347b-4423-beba-6607780cc354"
      ]);
    }

    if (storedUserNames) {
      setUserNames(JSON.parse(storedUserNames)); // 文字列から配列に変換
    } else {
      setUserNames([
        "kazuki",
        "jun",
        "yusuke",
        "やまさきんぐ"
      ]);
    }

    if (storedUserId) {
      setUserId(storedUserId); // 自分のユーザーID
    } else {
      setUserId("695e087c-3ead-4b64-8747-679647a5be0d");
    }

    if (storedSessionId) {
      setSessionId(storedSessionId); // sessionIdはそのまま使用
    } else {
      setSessionId("81bd6782-1248-4b53-8b4c-bb213c6809541");
    }
  }, []);

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

  const handleCommentChange = (user: string, comment: string) => {
    setComments((prev) => ({ ...prev, [user]: comment }));
  };

  const userQuestions = [
    { question: '積極性', description: '自ら進んで物事に取り組む姿勢がある。' },
    { question: '論理的思考', description: '筋道を立てて物事を考えている。' },
    { question: 'リーダーシップ', description: 'チームをまとめ、方向性を示し、目標達成に向けてメンバーを導いている。' },
    { question: '協調性', description: 'チームメンバーと協力し合いながら、目標に向かって進めている。' },
    { question: '発信力', description: '自分の意見を伝えている。' },
    { question: '他のメンバーへの気配り', description: 'チームの雰囲気やメンバーの状況に敏感であり、他者のサポートや配慮を適切に行なっている。' },
  ];

  const handleSubmit = async () => {
    const feedbackData: FeedbackData = {
      sessionId,
      senderId: userId,
      users: userIds.reduce<Record<string, UserFeedback>>((acc, userId, index) => {
        const userName = userNames[index];
        const userFeedback: UserFeedback = {
          id: userId,
          proactivity: ratings[`${userName}-0`] || 0,
          logicality: ratings[`${userName}-1`] || 0,
          leadership: ratings[`${userName}-2`] || 0,
          cooperation: ratings[`${userName}-3`] || 0,
          expression: ratings[`${userName}-4`] || 0,
          consideration: ratings[`${userName}-5`] || 0,
          comment: comments[userName] || '',
        };
        acc[userId] = userFeedback;
        return acc;
      }, {}),
    };
    console.log(feedbackData);
    console.log(feedbackData['users']);
    try {
      const response = await feedback(feedbackData);
      console.log(response);
      alert('フィードバックを送信しました！');
      router.push('/m');

    } catch (error) {
      console.error('フィードバックの送信に失敗しました。', error);
      alert('フィードバックの送信に失敗しました。');
    }
  };

  return (
    <RecoilRoot>
      <Header />

      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            color: '#F00033',
            fontWeight: 'bold',
            textAlign: 'center',
            mt: 4,
          }}
        >
          他のメンバーのフィードバックを記入しましょう！
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {userNames.map((userName, index) => (
            <Box key={userName}>
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mr: 1,
                    color: '#333',
                  }}
                >
                  {userName}さん
                </Typography>
                <IconButton onClick={() => toggleUserForm(userName)}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              {expandedUsers[userName] && (
                <>
                  {userQuestions.map((item, questionIndex) => (
                    <Box key={questionIndex} sx={{ mb: 4, textAlign: 'center' }}>
                      <Accordion
                        expanded={expandedPanels.includes(questionIndex)}
                        onChange={() => togglePanel(questionIndex)}
                        sx={{
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          '&:before': {
                            display: 'none',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${questionIndex}-content`}
                          id={`panel${questionIndex}-header`}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              textAlign: 'center',
                              color: '#333',
                            }}
                          >
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        {item.description && (
                          <AccordionDetails>
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 1,
                                fontSize: '1rem',
                                textAlign: 'center',
                                color: '#333',
                              }}
                            >
                              {item.description}
                            </Typography>
                          </AccordionDetails>
                        )}
                      </Accordion>

                      <RadioGroup
                        row
                        value={ratings[`${userName}-${questionIndex}`] || ''}
                        onChange={(e) => handleRatingChange(userName, questionIndex, parseInt(e.target.value))}
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
                              mx: 4,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                color: '#333',
                              }}
                            >
                              {value}
                            </Typography>
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label=""
                              sx={{ margin: 0 }}
                            />
                          </Box>
                        ))}
                                            </RadioGroup>
                    </Box>
                  ))}

                  {/* フィードバック入力（ひとことコメント） */}
                  <TextField
                    fullWidth
                    label={`フィードバック（ひとこと）`}
                    variant="outlined"
                    multiline
                    rows={3}
                    value={comments[userName] || ''}
                    onChange={(e) => handleCommentChange(userName, e.target.value)}
                    sx={{
                      mt: 4,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#333',
                      },
                    }}
                  />
                </>
              )}
            </Box>
          ))}

          {/* 送信ボタン */}
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
              onClick={handleSubmit}
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
