import { Bar, ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  options: string[];
  distribution: number[];
  numberOfSubmits: number;
}

const ResultChart: React.FC<Props> = props => {
  const numberOfSubmits = props?.numberOfSubmits;
  const chartData = props?.options?.map((option, index) => {
    const numberOfSelection = props?.distribution ? props.distribution[index] : 0;
    return {
      "選択肢": option,
      "人数": numberOfSelection || 0
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
      <ComposedChart
        layout="vertical"
        data={chartData} 
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis
        type="number"
        domain={[0, numberOfSubmits]}
        hide={true}
        />
        <YAxis 
          type="category"
          dataKey="選択肢"  
          axisLine={false}
          interval={0}
          tickLine={false}
        />
        <Tooltip /> 
        <Bar
          dataKey="人数"
          fill="#00c1e8"
        />
      </ComposedChart>
      </ResponsiveContainer>
    </div>)
};

export default ResultChart;