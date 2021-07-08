import React, {useEffect} from "react";

export default function NewGymRecordModal(props) {

    useEffect(() => {
        props.setRecordDto({
            url: "",
            record: {}
        });
        setRecord();
    }, []);

    return (
        <div>
            <p>Gym Record</p>
        </div>
    );

    function setRecord(){
        props.setRecordDto({
            url: "createGymRecord",
            record: {
                zoneDateTime: new Date().toISOString()
            }
        })
    }
}