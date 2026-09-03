import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './LanguageChart.css';

// Custom color palette matching the dark/orange dashboard theme
const COLORS = ['#ff6b00', '#2ea44f', '#0969da', '#a371f7', '#d97706', '#ec4899', '#8b5cf6'];

export default function LanguageChart({ repos }) {
  if (!repos || repos.length === 0) return null;

  // Aggregate languages from repositories count
  const languageCounts = repos.reduce((acc, repo) => {
    const lang = repo.language || 'Other / Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  // Format data for Recharts [{ name: 'JavaScript', value: 5 }]
  const data = Object.entries(languageCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="chart-card">
      <h3>Language Distribution</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="rgba(0, 0, 0, 0.4)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e1e1e', 
                borderColor: '#333', 
                borderRadius: '8px', 
                color: '#fff' 
              }}
              formatter={(value) => [`${value} repos`, 'Count']}
            />
            <Legend 
              formatter={(value) => <span style={{ color: '#ccc', fontSize: '0.85rem' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}