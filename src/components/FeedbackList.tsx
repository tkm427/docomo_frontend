import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FeedbackData = {
  averageProactivity: number;
  averageLogicality: number;
  averageLeadership: number;
  averageCooperation: number;
  averageExpression: number;
  averageConsideration: number;
  commentList: string[];
};

type FeedbackListProps = {
  feedbackAveragesPerDay: FeedbackData[]; // 平均フィードバックデータ
  labels: string[];                      // 日付ラベル
};

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbackAveragesPerDay, labels }) => {
  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>  
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        過去のフィードバック一覧
      </Typography>

      {/* 日付ごとのフィードバックをAccordion形式で表示 */}
      {labels.map((date, index) => (
        <Accordion key={date} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', mx: 2, marginLeft:5,  marginRight:5,}}>
              {/* 日付表示 */}
              <Typography variant="h6">{date}</Typography>
              
              {/* 点数表示 */}
              <Typography sx={{ textAlign: 'right' }}>
                点数: {(
                  (feedbackAveragesPerDay[index].averageProactivity +
                    feedbackAveragesPerDay[index].averageLogicality +
                    feedbackAveragesPerDay[index].averageLeadership +
                    feedbackAveragesPerDay[index].averageCooperation +
                    feedbackAveragesPerDay[index].averageExpression +
                    feedbackAveragesPerDay[index].averageConsideration) / 6
                ).toFixed(1)} / 5.0
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {/* 各評価項目 */}
              <Box sx={{ flex: '5', mr: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, ml: 2, textAlign: 'left' }}>
                  評価
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <Chip label={`積極性: ${feedbackAveragesPerDay[index].averageProactivity.toFixed(1)}`} sx={chipStyle} />
                  <Chip label={`論理的思考: ${feedbackAveragesPerDay[index].averageLogicality.toFixed(1)}`} sx={chipStyle} />
                  <Chip label={`リーダーシップ: ${feedbackAveragesPerDay[index].averageLeadership.toFixed(1)}`} sx={chipStyle} />
                  <Chip label={`協調性: ${feedbackAveragesPerDay[index].averageCooperation.toFixed(1)}`} sx={chipStyle} />
                  <Chip label={`発言力: ${feedbackAveragesPerDay[index].averageExpression.toFixed(1)}`} sx={chipStyle} />
                  <Chip label={`気配り: ${feedbackAveragesPerDay[index].averageConsideration.toFixed(1)}`} sx={chipStyle} />
                </Box>
              </Box>

              {/* コメント表示 */}
              <Box sx={{ flex: '5', ml: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, ml: 2, textAlign: 'left' }}>
                  コメント
                </Typography>
                <ul>
                  {feedbackAveragesPerDay[index].commentList.map((comment, idx) => (
                    <li key={idx}>{comment}</li>
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

// Chipのスタイル
const chipStyle = {
  backgroundColor: '#FF7043',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '5px',
  width: '100%',
  minHeight: '30px',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
};

export default FeedbackList;
