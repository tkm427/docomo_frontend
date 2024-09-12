import React from 'react';

type FeedbackData = {
  label: string;
  value: number;
};

type FeedbackMessageProps = {
  feedbackData: FeedbackData[];
};

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ feedbackData }) => {
  // 一番高い評価を取得する
  const highestFeedback = feedbackData.reduce((prev, current) => (current.value > prev.value ? current : prev));

  // ラベルに応じてメッセージを決定する
  const getMessageByLabel = (label: string): string => {
    switch (label) {
      case '積極性':
        return '行動力抜群のムードメーカー！';
      case '論理的思考':
        return '的確な分析マン！';
      case 'リーダーシップ':
        return '頼れるリーダー役！';
      case '協調性':
        return 'チームワークの要！';
      case '発言力':
        return '説得力のあるアイデアマン！';
      case 'チームメンバーへの気配り':
        return 'チームの頼れるサポーター！';
      default:
        return '評価が見つかりません';
    }
  };

  // 平均値を計算する
  const averageValue = (feedbackData.reduce((sum, item) => sum + item.value, 0) / feedbackData.length).toFixed(1);

  return (
    <div style={styles.resultBox}>
      <h3 style={styles.resultMessage}>{getMessageByLabel(highestFeedback.label)}</h3>
      <p style={styles.resultScore}>{averageValue}/5.0</p>
    </div>
  );
};

// スタイル設定
const styles = {
  resultBox: {
    display: 'flex',        // 横並びに配置
    justifyContent: 'center', // 中央寄せ
    alignItems: 'center',    // 縦方向の中央揃え
    gap: '10px', 
    backgroundColor: 'white',
    width: '60%', // 横幅を60%に設定
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
    margin: '0 auto', // 横方向に中央寄せ
    marginBottom: '30px',
  },
  resultMessage: {
    fontSize: '24px',
    color: '#F00033',
    fontWeight: 'bold' as 'bold',
  },
  resultScore: {
    fontSize: '30px',
    color: '#F00033',
    fontWeight: 'bold' as 'bold',},
};

export default FeedbackMessage;
