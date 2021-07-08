import React, {useEffect} from "react";

export default function NewWeightRecordModal(props) {

    useEffect(() => {
        props.setRecordDto({
            url: "",
            record: {}
        });
    }, []);

    return (
        <div>
            <p>Weight Record(Volume In Kilograms)</p>
            <input type="number" onChange={setRecord} style={{font: 'icon'}}/>
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