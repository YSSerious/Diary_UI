import React, {useEffect} from "react";
import Record from "./Record";
import {isCurrentTimeLine} from "../util/MyUtil";

export default function RecordRow(props){

    const [isCurrentTL, setCurrentTimeLine] = React.useState('');

    useEffect(() => {
        setCurrentTimeLine(isCurrentTimeLine(props.timeLine));
    }, []);

    return (
        <tr>
            <td className={`firstTrElement ${isCurrentTL}`}>{props.timeLine}</td>
            {
                props.month.generalInfos.map((value, i) =>
                <Record key={i}
                        isSunday={value.weekDay === "SUNDAY"}
                        value={getDayRecords(value.monthDay, getTimeLineValues(props))}
                        monthDay={value.monthDay}
                        isCurrentTimeLine={isCurrentTL}/>)
            }
        </tr>
    )


}

function getDayRecords(dayNumber, timeLineValues){
    const dayRecords = timeLineValues.filter(value => value.dayNumber === dayNumber).map(value => value.records);
    return dayRecords.length ? dayRecords[0] : {};
}

function getTimeLineValues(props){
    const timeLineValuesArray = (props.month.timeLines || []).filter(value => value.name === props.timeLine).map(value => value.monthDays);
    return timeLineValuesArray.length ? timeLineValuesArray[0] : [];
}