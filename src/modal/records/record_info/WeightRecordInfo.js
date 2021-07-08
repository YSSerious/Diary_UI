import React, {useEffect} from "react";
import RecordService from "../../../services/RecordService";
import {getCurrentMonthName} from "../../../util/MyUtil";

export default function WeightRecordInfo(props) {

    useEffect(() => {
        const recordDate = new Date(props.records[0].zoneDateTime);
        RecordService.getMonthWeightChartData(recordDate.getFullYear(), getCurrentMonthName(recordDate));
    }, []);

    return (
        <div>
            <h2 className="subHeader nutritionAlign">Weight: {props.records[0].volume} kg</h2>
        </div>
    );
}