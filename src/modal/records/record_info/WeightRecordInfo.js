import React, {useEffect} from "react";
import RecordService from "../../../services/RecordService";

export default function WeightRecordInfo(props) {

    useEffect(() => {
        RecordService.getMonthWeightChartData(props);
    }, []);

    return (
        <div>
            <h2 className="subHeader nutritionAlign">Weight: {props.records[0].volume} kg</h2>
        </div>
    );
}