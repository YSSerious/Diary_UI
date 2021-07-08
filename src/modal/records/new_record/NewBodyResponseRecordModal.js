import React, {useEffect} from "react";
import BodyResponseSelect from "./BodyResponseSelect";
import RecordService from "../../../services/RecordService";

export default function NewBodyResponseRecordModal(props) {

    let [recordObject, setRecordObject] = React.useState({
        generalState: 'GOOD',
        nose: 'GOOD',
        eyes: 'GOOD',
        chin: 'GOOD',
        forehead: 'GOOD',
        note: ''
    });
    let [bodyResponseValues, setBodyResponseValues] = React.useState([]);

    useEffect(() => {
        props.setRecordDto({
            url: "",
            record: {}
        });
        setRecord(recordObject);
        RecordService.getBodyResponseValues(setBodyResponseValues);
    }, []);

    return (
        <div>
            <div style={{display: "flex"}}>
                <BodyResponseSelect title={"General state"} value={recordObject.generalState} onChange={(event) => {stateOnChange(event, 'generalState')}} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
                <BodyResponseSelect title={"Nose"} value={recordObject.nose} onChange={(event) => {stateOnChange(event, 'nose')}} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
                <BodyResponseSelect title={"Eyes"} value={recordObject.eyes} onChange={(event) => {stateOnChange(event, 'eyes')}} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
                <BodyResponseSelect title={"Chin"} value={recordObject.chin} onChange={(event) => {stateOnChange(event, 'chin')}} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            </div>
            <div style={{display: "flex"}}>
                <BodyResponseSelect title={"Forehead"} value={recordObject.forehead} onChange={(event) => {stateOnChange(event, 'forehead')}} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            </div>
            <div>
                <p>Note</p>
                <textarea style={{width: '-webkit-fill-available'}} value={recordObject.note} onChange={(event) => {stateOnChange(event, 'note')}}/>
            </div>
        </div>
    );

    function stateOnChange(event, property){
        const obj = {...recordObject, [property] : event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function setRecord(recordObj){
        props.setRecordDto({
            url: "createBodyResponseRecord",
            record: recordObj
        })
    }
}