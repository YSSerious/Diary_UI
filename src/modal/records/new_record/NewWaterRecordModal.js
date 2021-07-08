import React, {useEffect} from "react";

export default function NewWaterRecordModal(props) {

    useEffect(() => {
        props.setRecordDto({
            url: "",
            record: {}
        })
    }, []);

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