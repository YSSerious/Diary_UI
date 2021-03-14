import React, {useEffect} from "react";
import BodyResponseSelect from "./BodyResponseSelect";

export default function NewBodyResponseRecordModal(props) {

    let [recordObject, setRecordObject] = React.useState({
        generalState: 'GOOD',
        nose: 'GOOD',
        eyes: 'GOOD',
        chin: 'GOOD',
        forehead: 'GOOD',
        zoneDateTime: new Date().toISOString()
    });
    let [bodyResponseValues, setBodyResponseValues] = React.useState([]);

    useEffect(() => {
        setRecord(recordObject);
        getBodyResponseValues();
    }, []);

    return (
        <div>
            <BodyResponseSelect title={"General state"} value={recordObject.generalState} onChange={generalStateOnChange} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            <BodyResponseSelect title={"Nose"} value={recordObject.nose} onChange={noseOnChange} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            <BodyResponseSelect title={"Eyes"} value={recordObject.eyes} onChange={eyesOnChange} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            <BodyResponseSelect title={"Chin"} value={recordObject.chin} onChange={chinOnChange} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
            <BodyResponseSelect title={"Forehead"} value={recordObject.forehead} onChange={foreheadOnChange} recordObject={recordObject} bodyResponseValues={bodyResponseValues}/>
        </div>
    );

    function generalStateOnChange(event){
        // const bodyResponseValue = event.target.getAttribute('name');
        const obj = {...recordObject, generalState: event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function noseOnChange(event){
        const obj = {...recordObject, nose:event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function eyesOnChange(event){
        const obj = {...recordObject, eyes:event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function chinOnChange(event){
        const obj = {...recordObject, chin:event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function foreheadOnChange(event){
        const obj = {...recordObject, forehead:event.target.value};
        setRecordObject(obj);
        setRecord(obj);
    }

    function setRecord(recordObj){
        props.setRecordDto({
            url: "createBodyResponseRecord",
            record: recordObj
        })
    }

    function getBodyResponseValues() {
        fetch('http://localhost:8080/food/getBodyResponseValues')
            .then(response => response.json())
            .then(data => {
                setBodyResponseValues(data);
            });
    }
}