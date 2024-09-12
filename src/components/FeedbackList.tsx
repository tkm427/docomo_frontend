import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FeedbackData = {
  date: string;
  thema: string;
  label: string;
  value: number;
  comments: string[];
};

type FeedbackListProps = {
  feedbackDataList: FeedbackData[];
};

// 日付ごとにグループ化
const groupFeedbackByDate = (feedbackDataList: FeedbackData[]) => {
  return feedbackDataList.reduce((acc: { [key: string]: FeedbackData[] }, feedback) => {
    const { date } = feedback;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(feedback);
    return acc;
  }, {});
};

// 平均点数を計算する関数
const calculateAverage = (feedbacks: FeedbackData[]) => {
  if (!feedbacks || feedbacks.length === 0) return 0;
  const total = feedbacks.reduce((acc, feedback) => acc + feedback.value, 0);
  return total / feedbacks.length;
};

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbackDataList }) => {
  const groupedFeedback = groupFeedbackByDate(feedbackDataList);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>  {/* 背景を灰色に設定 */}
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        過去のフィードバック一覧
      </Typography>

      {/* 日付ごとに折りたたみリスト表示 */}
      {Object.keys(groupedFeedback).map((date) => (
        <Accordion key={date} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', mx: 2 }}>
              {/* 左側の表示（日時） */}
              <Typography variant="h6">{date}</Typography>

              {/* 中央の表示（お題） */}
              <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
                {groupedFeedback[date]?.[0]?.thema || 'お題なし'}
              </Typography>

              {/* 右側の表示（点数） */}
              <Typography sx={{ textAlign: 'right' }}>
                {calculateAverage(groupedFeedback[date] || []).toFixed(1)} / 5.0
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ flex: '5', mr: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, ml: 2, textAlign: 'left' }}>  {/* 左詰めに変更 */}
                  評価
                </Typography>
                <Box
                  sx={{
                    display: 'grid', // グリッドレイアウトを使用
                    gridTemplateColumns: 'repeat(2, 1fr)', // 2列に設定
                    gap: '8px', // 要素間の隙間を設定
                  }}
                >
                  {groupedFeedback[date]?.map((feedback, index) => (
                    <Chip
                      key={index}
                      label={`${feedback.label}: ${feedback.value}`}
                      sx={{
                        backgroundColor: '#FF7043',
                        color: 'white',
                        fontWeight: 'bold',
                        // fontSize: feedback.label === 'チームメンバーへの気配り' ? '8px' : '12px', // 文字が長い場合、フォントサイズを小さく
                        fontSize: '12px',
                        padding: '5px',
                        width: '100%', // 各チップの幅を親要素に合わせる
                        minHeight: '30px', // 全てのChipの高さを統一
                        whiteSpace: 'normal', // テキストの折り返しを許可
                        wordBreak: 'break-word', // 単語が長すぎる場合、折り返しを行う
                      }}
                    />
                  )) || <Typography>フィードバックがありません</Typography>}
                </Box>
              </Box>

              <Box sx={{ flex: '5', ml: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, ml: 2, textAlign: 'left' }}>  {/* 左詰めに変更 */}
                  コメント
                </Typography>
                <ul>
                  {groupedFeedback[date]?.[0]?.comments?.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  )) || <Typography>コメントがありません</Typography>}
                </ul>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FeedbackList;
