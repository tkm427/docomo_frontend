"use client";

import React, { useEffect } from 'react';
import Header from './Header';
import FeedbackMessage from './FeedbackMessage';
import RadarChart from './RadarChart';
import LineChart from './LineChart';
import FeedbackList from './FeedbackList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { comment } from 'postcss';

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
  const latestDate = Object.keys(feedbackData).sort().pop(); // 日付を降順にソートして最新の日付を取得
  const getLatestFeedbackData = (feedbackData: { [key: string]: any[] }) => {
    // 最新の日付のフィードバックデータを取得
    return feedbackData[latestDate!] || []; // 最新日付のデータを取得
  };
  
  // 最新のフィードバックデータを取得
  const feedbackForRadar = getLatestFeedbackData(feedbackData);

  useEffect(() => {
    console.log(feedbackForRadar);
  }, [feedbackForRadar]);
  

  type Averages = {
    proactivity: number;
    logicality: number;
    leadership: number;
    cooperation: number;
    expression: number;
    consideration: number;
    [key: string]: number;
  };

  
  // 各フィードバック項目の平均値を計算
  const calculateAverageFeedback = (feedbackArray: Feedback[]) => {
    const totalFeedback = feedbackArray.length;
    const averages: Averages = {
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

  // 各日付ごとのデータを使用してラベルと平均値を作成
const labels = Object.keys(feedbackData).sort((a, b) => {
  return new Date(a).getTime() - new Date(b).getTime(); // 日付を早い順にソート
});

// 各日付ごとのフィードバックをそのまま返す
const feedbackAveragesPerDay = labels.map((date) => {
  const feedbackArray = feedbackData[date];
  const averageFeedback = calculateAverageFeedback(feedbackArray);

  // 同じ日付のコメントをリストとして収集
  const commentList = feedbackArray
    .map(feedback => feedback.comment); // 各フィードバックのコメントを配列に収集

  // 各項目ごとの平均値を返すオブジェクト
  return {
    averageProactivity: averageFeedback.proactivity,     // 積極性の平均値
    averageLogicality: averageFeedback.logicality,       // 論理的思考の平均値
    averageLeadership: averageFeedback.leadership,       // リーダーシップの平均値
    averageCooperation: averageFeedback.cooperation,     // 協調性の平均値
    averageExpression: averageFeedback.expression,       // 発言力の平均値
    averageConsideration: averageFeedback.consideration, // 気配りの平均値
    commentList: commentList                              // 同じ日付のコメントのリスト
  };
});



useEffect(() => {
  console.log(feedbackAveragesPerDay);
}, [feedbackAveragesPerDay]);
useEffect(() => {
  console.log(labels);
}, [labels]);

const data = labels.map((date) => {
  const feedbackArray = feedbackData[date];
  const averageFeedback = calculateAverageFeedback(feedbackArray);

  // 全項目の平均値の平均を求める
  const totalAverage =
    (averageFeedback.proactivity +
      averageFeedback.logicality +
      averageFeedback.leadership +
      averageFeedback.cooperation +
      averageFeedback.expression +
      averageFeedback.consideration) /
    6;

  return totalAverage; // 各日付ごとの平均値
});
  
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
  // radarData から FeedbackMessage に渡すデータを変換
  const feedbackDataForMessage = radarData.labels.map((label, index) => ({
    label,
    value: radarData.datasets[0].data[index],
  }));

  // Line chart data の例
  const lineData = {
    labels,
    datasets: [
      {
        label: '平均評価',
        data,
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

      {latestDate && <p style={styles.date}>{latestDate.replace(/-/g, '/')}の結果</p>}

      <FeedbackMessage feedbackData={feedbackDataForMessage} />
      <div style={styles.chartContainer}>
        <div style={styles.chartItem}>
          {/* <h3>前回との比較</h3> */}
          <RadarChart data={radarData} options={radarOptions} />
        </div>

        <div style={styles.chartItem}>
          {/* <h3>平均評価の推移</h3> */}
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
        <FeedbackList feedbackAveragesPerDay={feedbackAveragesPerDay} labels={labels}/>
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