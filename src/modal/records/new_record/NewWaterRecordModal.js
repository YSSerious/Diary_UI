import React from "react";

export default function NewWaterRecordModal(props) {

    return (
        <div>
            <p>Water Record(Volume In Milliliters)</p>
            <input type="number" onChange={setRecord} style={{font: 'icon'}}/>
        </div>
    );

    function setRecord(event){
        props.setRecordDto({
            url: "createWaterRecord",
            record: {
                volume: event.target.value
            }
        })
    }
}