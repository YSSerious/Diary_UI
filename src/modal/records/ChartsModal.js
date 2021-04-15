import React, {useEffect} from "react";
import {Chart} from 'react-charts';
import RecordService from "../../services/RecordService";

export default function ChartsModal(props) {
    let [chartCaloriesData, setChartCaloriesData] = React.useState([]);
    let [chartWaterData, setChartWaterData] = React.useState([]);
    let [chartWeightData, setChartWeightData] = React.useState([]);

    const caloriesData = React.useMemo(
        () => chartCaloriesData, [chartCaloriesData]
    )

    const waterData = React.useMemo(
        () => chartWaterData, [chartWaterData]
    )

    const weightData = React.useMemo(
        () => chartWeightData, [chartWeightData]
    )

    const axes = React.useMemo(
        () => [
            {primary: true, position: 'bottom', type: 'linear', show: true},
            {position: 'left', type: 'linear', show: true}
        ], []
    )

    const chartStyle = {
        width: '960px',
        height: '200px',
        margin: '0 0 15px 0'
    }

    useEffect(() => {
        RecordService.getMonthChartData(props.year, props.month, setChartCaloriesData, setChartWeightData, setChartWaterData);
    }, []);

    return (
        <div>
            <div style={chartStyle}>
                <span>KCalories</span>
                <Chart data={caloriesData} axes={axes} tooltip/>
            </div>
            <div style={chartStyle}>
                <span>Weight</span>
                <Chart data={weightData} axes={axes} tooltip/>
            </div>
            <div style={chartStyle}>
                <span>Water</span>
                <Chart data={waterData} axes={axes} tooltip/>
            </div>
        </div>
    );
}