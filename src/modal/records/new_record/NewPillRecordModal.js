import React, {useEffect} from "react";
import RecordService from "../../../services/RecordService";
import PillRow from "./PillRow";

export default function NewPillRecordModal(props) {

    let [pillCatalog, setPillCatalog] = React.useState([]);
    let [recordObject, setRecordObject] = React.useState({pillVolumes: []});

    useEffect(() => {
        RecordService.getPillCatalog()
            .then(data => setPillCatalog(data));
        setRecord(recordObject);
    }, []);

    return (
        <div>
            <p>PillS</p>
            <div>
                {
                    pillCatalog.map((value, i) =>
                        <div key={i}>
                            <PillRow pill={value} addPillVolume={addPillVolume}/>
                        </div>
                    )
                }
            </div>
            {JSON.stringify(recordObject.pillVolumes)}
        </div>
    );

    function addPillVolume(pillId, volume){
        const obj = {...recordObject, pillVolumes: [...recordObject.pillVolumes, {pill: {id: pillId}, volume: volume}]};
        setRecordObject(obj);
        setRecord(obj);
    }

    function setRecord(recordObj){
        props.setRecordDto({
            url: "createPillRecord",
            record: recordObj
        })
    }
}