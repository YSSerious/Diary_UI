import React from "react";

export default function PillRow(props) {

    let [inputValue, setInputValue] = React.useState('');

    return (
        <div className="modalContentScroll">
            {
                <div className="recordRow">
                    <div className={`recordName`}>
                        {props.pill.name + ", " + (props.pill.inGrams ? "grams" : "pieces")}
                    </div>
                    <div className="activeRecordPart">
                        <input className="recordInput" type="number" value={inputValue}
                               onInput={e => setInputValue(e.target.value)}/>
                        <button onClick={addPill}><i className="bi-plus fa-lg" title="Add Pill"/></button>
                    </div>
                </div>
            }

        </div>
    );

    function addPill() {
        if(inputValue.length > 0) {
            props.addPillVolume(props.pill.id, inputValue);
            setInputValue('');
        } else {
            alert('Specify volume!');
        }
    }
}