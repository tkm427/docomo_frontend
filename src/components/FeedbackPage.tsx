"use client";

import React from 'react';
import Header from './Header';
import FeedbackMessage from './FeedbackMessage';
import RadarChart from './RadarChart';
import LineChart from './LineChart';
import FeedbackList from './FeedbackList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// <<<<<<< feature/feedback
// const feedbackData = [
//   { label: '積極性', value: 4 },
//   { label: '論理的思考', value: 3 },
//   { label: 'リーダーシップ', value: 2 },
//   { label: '協調性', value: 4 },
//   { label: '発言力', value: 3 },
//   { label: 'チームメンバーへの気配り', value: 5 },
// ];


const feedbackDataList = [
  { date: '2024/9/11', thema: 'お題1', label: '積極性', value: 4 },
  { date: '2024/9/11', thema: 'お題1', label: '論理的思考', value: 3 },
  { date: '2024/9/11', thema: 'お題1', label: 'リーダーシップ', value: 2 },
  { date: '2024/9/11', thema: 'お題1', label: '協調性', value: 4 },
  { date: '2024/9/11', thema: 'お題1', label: '発言力', value: 3 },
  { date: '2024/9/11', thema: 'お題1', label: 'チームメンバーへの気配り', value: 5 },
  { date: '2024/9/12', thema: 'お題2', label: '積極性', value: 3 },
  { date: '2024/9/12', thema: 'お題2', label: '論理的思考', value: 4 },
  { date: '2024/9/12', thema: 'お題2', label: 'リーダーシップ', value: 3 },
  { date: '2024/9/12', thema: 'お題2', label: '協調性', value: 5 },
  { date: '2024/9/12', thema: 'お題2', label: '発言力', value: 2 },
  { date: '2024/9/12', thema: 'お題2', label: 'チームメンバーへの気配り', value: 4 },
  { date: '2024/9/13', thema: 'お題3', label: '積極性', value: 3 },
  { date: '2024/9/13', thema: 'お題3', label: '論理的思考', value: 4 },
  { date: '2024/9/13', thema: 'お題3', label: 'リーダーシップ', value: 3 },
  { date: '2024/9/13', thema: 'お題3', label: '協調性', value: 5 },
  { date: '2024/9/13', thema: 'お題3', label: '発言力', value: 2 },
  { date: '2024/9/13', thema: 'お題3', label: 'チームメンバーへの気配り', value: 4 },
  { date: '2024/9/14', thema: 'お題4', label: '積極性', value: 3 },
  { date: '2024/9/14', thema: 'お題4', label: '論理的思考', value: 4 },
  { date: '2024/9/14', thema: 'お題4', label: 'リーダーシップ', value: 3 },
  { date: '2024/9/14', thema: 'お題4', label: '協調性', value: 5 },
  { date: '2024/9/14', thema: 'お題4', label: '発言力', value: 2 },
  { date: '2024/9/14', thema: 'お題4', label: 'チームメンバーへの気配り', value: 4 },
];

// const radarData = {
//   labels: feedbackData.map((item) => item.label),
//   datasets: [
//     {
//       label: 'フィードバック',
//       data: feedbackData.map((item) => item.value),
//       backgroundColor: 'rgba(240, 0, 51, 0.2)',
//       borderColor: '#F00033',
//       borderWidth: 2,
//     },
//   ],
// };
// =======
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
      <CheckCircleOutlineIcon
        style={{ 
          color: '#F00033', 
          marginRight: '8px', 
          verticalAlign: 'middle',  // アイコンをテキストの中央に揃える
          fontSize: '1.2em'         // テキストの大きさに合わせてアイコンのサイズを調整
        }} 
      />
      <span style={{ verticalAlign: 'middle' }}>いい調子ですね！これからも頑張りましょう！</span>

      </div>

      <div style={styles.listContainer}>
        <FeedbackList feedbackDataList={feedbackDataList} />
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
  listContainer: {
    textAlign: 'center' as 'center',
    margin: '100px',
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
    alignItems: "center", // 垂直方向の配置を中央に揃える
    // alignItems: "flex-start",
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
