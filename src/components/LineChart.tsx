import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Chart.jsの設定
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ラインチャートのコンポーネント
type LineChartProps = {
  data: any;
  options?: any;
};


const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return (
    <div style={{ width: '80%', maxWidth: '500px', margin: '0 auto' }}> {/* 横幅を80%に設定 */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
