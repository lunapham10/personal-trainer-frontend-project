import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";
import type { Training } from '../types';
import _ from "lodash";

type ChartData = {
    chartActivity: string;
    trainingDuration: number;
}

export default function Statistic() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const fetchData = () => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching training data")
                return response.json();
            })
            .then((data: Training[]) => {

                const groupedData = _.groupBy(data, 'activity');

                const dataset: ChartData[] = _.map(groupedData, (items, key) => ({
                    chartActivity: key,
                    trainingDuration: _.sumBy(items, (t) => Number(t.duration))
                }));
                setChartData(dataset);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const chartSetting = {
        yAxis: [
            { label: 'Duration (min)' },
        ],
        series: [
            { dataKey: 'trainingDuration', label: 'chartActivity', color: '#1976d2' }
        ],
        height: 400,
    };

    return (
        <div style={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%' }}>
                <h2 style={{ textAlign: 'center' }}>Activity Statistics</h2>
                <BarChart
                    dataset={chartData}
                    xAxis={[{ scaleType: 'band', dataKey: 'chartActivity' }]}
                    {...chartSetting}
                />
            </div>
        </div>
    );
}