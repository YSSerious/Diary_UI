import {getFoodHealthyColorClass} from "../util/MyUtil";
import React from "react";

export default function FoodRow(props) {
    let [inputValue, setInputValue] = React.useState('');
    return (
        <div>
            <div className="recordRow">
                <div className={`recordName`} style={{color: getFoodHealthyColorClass(props.food.foodHealthy)}} title={props.food.foodHealthy}>
                    {props.food.name + ", "+ (props.food.inGrams ? "grams" : "pieces")}
                    {props.food.note && <span title={parseFoodNote(props.food.note)}> &#42;</span>}
                </div>
                <div className="activeRecordPart">
                    <input className="recordInput" type="number" value={inputValue} onInput={e => setInputValue(e.target.value)}/>
                    <button onClick={addFood}><i className="bi-plus fa-lg" title="Add food"/></button>
                </div>
            </div>
        </div>
    );

    function parseFoodNote(note){
        return note.split(';').join('\n');
    }

    function addFood(){
        if(inputValue.length > 0) {
            props.addFoodVolume(props.food.id, inputValue);
            setInputValue('');
        } else {
            alert('Specify volume!');
        }
    }
}