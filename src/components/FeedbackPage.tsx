"use client";

import React from 'react';
import Header from './Header';
import FeedbackMessage from './FeedbackMessage';
import RadarChart from './RadarChart';
import LineChart from './LineChart';

interface Feedback {
  proactivity: number;
  logicality: number;
  leadership: number;
  cooperation: number;
  expression: number;
  consideration: number;
  comment: string;
  session_id: string;
  user_id: string;
  id: string;
}

interface FeedbackPageProps {
  feedbackData: { [date: string]: Feedback[] }; // 日付ごとのフィードバックの配列
}

const radarOptions = {
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: {
        stepSize: 1, // 1刻みに設定
      },
    },
  },
};

const lineOptions = {
  scales: {
    x: {
      grid: {
        display: false, // X軸のグリッド線を消す
      },
    },
    y: {
      beginAtZero: true,
      max: 5, // 最大値を設定
      ticks: {
        stepSize: 1, // 1刻みに設定
      },
      grid: {
        display: false, // Y軸のグリッド線を消す
      },
    },
  },
};

const FeedbackPage: React.FC<FeedbackPageProps> = ({ feedbackData }) => {
  const getLatestFeedbackData = (feedbackData: { [key: string]: any[] }) => {
    // 最新の日付のフィードバックデータを取得
    const latestDate = Object.keys(feedbackData).sort().pop(); // 日付を降順にソートして最新の日付を取得
    return feedbackData[latestDate!] || []; // 最新日付のデータを取得
  };
  
  // 最新のフィードバックデータを取得
  const feedbackForRadar = getLatestFeedbackData(feedbackData);
  
  // 各フィードバック項目の平均値を計算
  const calculateAverageFeedback = (feedbackArray: any[]) => {
    const totalFeedback = feedbackArray.length;
    const averages = {
      proactivity: 0,
      logicality: 0,
      leadership: 0,
      cooperation: 0,
      expression: 0,
      consideration: 0,
    };
  
    feedbackArray.forEach((feedback) => {
      averages.proactivity += feedback.proactivity;
      averages.logicality += feedback.logicality;
      averages.leadership += feedback.leadership;
      averages.cooperation += feedback.cooperation;
      averages.expression += feedback.expression;
      averages.consideration += feedback.consideration;
    });
  
    // 各項目の平均を計算
    for (let key in averages) {
      averages[key] = averages[key] / totalFeedback;
    }
  
    return averages;
  };
  
  // 平均フィードバックを計算
  const averageFeedback = calculateAverageFeedback(feedbackForRadar);
  
  // レーダーチャート用のデータを作成
  const radarData = {
    labels: ['積極性', '論理的思考', 'リーダーシップ', '協調性', '発言力', '気配り'],
    datasets: [
      {
        label: 'フィードバック',
        data: [
          averageFeedback.proactivity,
          averageFeedback.logicality,
          averageFeedback.leadership,
          averageFeedback.cooperation,
          averageFeedback.expression,
          averageFeedback.consideration,
        ],
        backgroundColor: 'rgba(240, 0, 51, 0.2)',
        borderColor: '#F00033',
        borderWidth: 2,
      },
    ],
  };

  // Line chart data の例
  const lineData = {
    labels: ['1回目', '2回目', '3回目', '4回目', '5回目', '6回目'],
    datasets: [
      {
        label: '平均評価',
        data: [2.5, 2.8, 3.0, 3.2, 3.5, 3.8], // このデータも動的に設定できます
        borderColor: '#F00033',
        backgroundColor: 'rgba(240, 0, 51, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Header />
      <div style={styles.subtitleContainer}>
        <h2 style={styles.subtitle}>フィードバック</h2>
      </div>

      <p style={styles.date}>2024/9/11の結果</p>

      {/* <FeedbackMessage feedbackData={feedbackData} /> */}

      <div style={styles.chartContainer}>
        <div style={styles.chartItem}>
          <h3>前回との比較</h3>
          <RadarChart data={radarData} options={radarOptions} />
        </div>

        <div style={styles.chartItem}>
          <h3>平均評価の推移</h3>
          <LineChart data={lineData} options={lineOptions} />
        </div>
      </div>

      <div style={styles.messageBox}>
        <span role="img" aria-label="checkmark">✔️</span> いい調子ですね！これからも頑張りましょう！
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  subtitleContainer: {
    textAlign: 'center' as 'center',
    margin: '20px',
  },
  subtitle: {
    textAlign: 'center' as 'center',
    fontSize: '28px',
    marginBottom: '20px',
    color: '#F00033',
    fontWeight: 'bold' as 'bold',
  },
  date: {
    textAlign: 'left' as 'left',
    fontSize: '25px',
    marginLeft: '20vw',
    marginBottom: '10px',
  },
  chartContainer: {
    display: 'flex',
    width: '80%',
    height: '50vh',
    justifyContent: 'center',   // 中央揃えに変更
    gap: '20px',                // チャート間の隙間
    marginBottom: '40px',
    margin: '0 auto',           // コンテナ自体を画面中央に配置
  },
  
  chartItem: {
    flex: 1,
    textAlign: 'center' as 'center',
  },
  messageBox: {
    backgroundColor: '#ffecec',
    color: '#F00033',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center' as 'center',
    fontSize: '16px',
  },
};

export default FeedbackPage;
