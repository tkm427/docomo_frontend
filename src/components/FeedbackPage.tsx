"use client";

import React from 'react';
import Header from './Header';
import FeedbackMessage from './FeedbackMessage';
import RadarChart from './RadarChart';
import LineChart from './LineChart';

const feedbackData = [
  { label: '積極性', value: 4 },
  { label: '論理的思考', value: 3 },
  { label: 'リーダーシップ', value: 2 },
  { label: '協調性', value: 4 },
  { label: '発言力', value: 3 },
  { label: 'チームメンバーへの気配り', value: 5 },
];

const radarData = {
  labels: feedbackData.map((item) => item.label),
  datasets: [
    {
      label: 'フィードバック',
      data: feedbackData.map((item) => item.value),
      backgroundColor: 'rgba(240, 0, 51, 0.2)',
      borderColor: '#F00033',
      borderWidth: 2,
    },
  ],
};

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


const lineData = {
  labels: ['1回目', '2回目', '3回目', '4回目', '5回目', '6回目'],
  datasets: [
    {
      label: '平均評価',
      data: [2.5, 2.8, 3.0, 3.2, 3.5, 3.8],
      borderColor: '#F00033',
      backgroundColor: 'rgba(240, 0, 51, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
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


const FeedbackPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={styles.subtitleContainer}>
        <h2 style={styles.subtitle}>フィードバック</h2>
      </div>

      <p style={styles.date}>2024/9/11の結果</p>

      <FeedbackMessage feedbackData={feedbackData} />

      <div style={styles.chartContainer}>
        <div style={styles.chartItem}>
        <h3 style={styles.chartTitle}>前回との比較</h3>
          <RadarChart data={radarData} options={radarOptions} />
        </div>

        <div style={styles.chartItem}>
        <h3 style={styles.chartTitle}>平均評価の推移</h3>
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
    justifyContent: "space-around", // 水平方向の配置
    // alignItems: "center", // 垂直方向の配置を中央に揃える
    alignItems: "flex-start",
    gap: '20px',                // チャート間の隙間
    marginBottom: '40px',
    margin: '0 auto',           // コンテナ自体を画面中央に配置
  },
  
  chartItem: {
    width: "50%",
    textAlign: "center",
    h3: {
      fontSize: "6rem",  // 文字サイズを大きく
      fontWeight: "bold",  // 太字で強調
    },
  },
  chartTitle: {
    fontSize: "1.7rem",
    fontWeight: "bold",
    marginBottom: "20px", // タイトルの下にスペースを追加
    marginTop: "30px", // タイトルの上にスペースを追加（これで下に移動する）
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
