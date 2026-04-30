import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";
import type { Training } from '../types';
import _ from "lodash";
import { Box, Stack } from '@mui/system';
import { fetchTraining } from './api';

type ChartData = {
    chartActivity: string;
    trainingDuration: number;
}

type ChartData2 = {
    trainingPerson: string;
    trainingDuration: number;
}

export default function Statistic() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [horizontalChartData, setHorizontalChartData] = useState<ChartData2[]>([]);
    const fetchData = () => {
        fetchTraining()
            .then((data: Training[]) => {
                //Activity Statistics chart
                const groupedData = _.groupBy(data, 'activity');
                const dataset: ChartData[] = _.map(groupedData, (items, key) => ({
                    chartActivity: key,
                    trainingDuration: _.sumBy(items, (t) => Number(t.duration))
                }));
                setChartData(dataset);

                //Customer Training Volume chart
                const groupedData2 = _.groupBy(data, (t) => {
                    return t.customer ? `${t.customer.firstname} ${t.customer.lastname}` : 'Unknown';
                });
                const dataset2: ChartData2[] = _.map(groupedData2, (items, key) => ({
                    trainingPerson: key,
                    trainingDuration: _.sumBy(items, (t) => Number(t.duration))
                }));
                setHorizontalChartData(dataset2);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const commonSeries = [{ dataKey: 'trainingDuration', label: 'Total Minutes', color: '#1976d2' }];


    return (
        <Box style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box style={{ width: '100%' }}>
                <Stack spacing={3}>
                    <h4 style={{ textAlign: 'center' }}>Activity Statistics</h4>
                    <BarChart
                        dataset={chartData}
                        xAxis={[{ scaleType: 'band', dataKey: 'chartActivity' }]}
                        yAxis={[{ label: 'Duration (min)' }]}
                        series={commonSeries}
                        height={350}
                    />
                    <h4 style={{ textAlign: 'center' }}>Customer Training Volume</h4>
                    <BarChart
                        layout="horizontal"
                        dataset={horizontalChartData}
                        yAxis={[{ scaleType: 'band', dataKey: 'trainingPerson' }]}
                        xAxis={[{ label: 'Duration (min)' }]}
                        series={commonSeries}
                        height={350}
                    />
                </Stack>
            </Box>
        </Box>

    );
}