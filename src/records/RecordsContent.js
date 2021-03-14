import RecordTable from "./RecordTable";
import React from "react";

export default function RecordsContent(props) {
    return (
        <div>
            {
                props.months.length ?
                props.months.map((month, i) =>
                    <div key={i}>
                        <RecordTable year={props.year} month={month} timeLines={props.timeLines} index={i}/>
                    </div>) :
                    <h1>We Dont have any records =(</h1>
            }
        </div>
    );
}