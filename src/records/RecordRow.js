import React from "react";
import Record from "./Record";

export default function RecordRow(props){
    return (
        <tr>
            <td>{props.timeLine}</td>
            {
                props.month.generalInfos.map((value, i) =>
                <Record key={i} isSunday={value.weekDay === "SUNDAY"} value={getDayRecords(value.monthDay, getTimeLineValues(props))} monthDay={value.monthDay}/>)
            }
        </tr>
    )
}

function getDayRecords(dayNumber, timeLineValues){
    const dayRecords = timeLineValues.filter(value => value.dayNumber === dayNumber).map(value => value.records);
    return dayRecords.length ? dayRecords[0] : {};
}

function getTimeLineValues(props){
    const timeLineValuesArray = props.month.timeLines.filter(value => value.name === props.timeLine).map(value => value.monthDays);
    return timeLineValuesArray.length ? timeLineValuesArray[0] : [];
}