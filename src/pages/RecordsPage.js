import React, {useEffect} from "react";
import RecordService from "../services/RecordService";
import RecordsContent from "../records/RecordsContent";

export default function RecordsPage(props){
    let [timeLines, setTimeLines] = React.useState([]);
    let [months, setMonths] = React.useState([]);

    useEffect(() => {
        RecordService.getYearRecords(props.year, setMonths);
    }, [props.year, props.reloadRecordsFlag]);

    useEffect(() => {
        RecordService.getTimeLInes(setTimeLines);
    }, []);

    return (
        <div>
            <RecordsContent months={months} timeLines={timeLines} year={props.year}/>
        </div>
    );
}