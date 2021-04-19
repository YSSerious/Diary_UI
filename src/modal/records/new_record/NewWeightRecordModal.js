import React from "react";

export default function NewWeightRecordModal(props) {
    return (
        <div>
            <p>Weight Record(Volume In Kilograms)</p>
            <input type="number" onChange={setRecord}/>
        </div>
    );
    function setRecord(event){
        props.setRecordDto({
            url: "createWeightRecord",
            record: {
                volume: event.target.value
            }
        })
    }
}