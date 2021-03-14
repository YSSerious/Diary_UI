import React from "react";

export default function BodyResponseSelect(props){
    return (
        <div>
            <p>{props.title}</p>
            <select value={props.value} onChange={props.onChange} name="generalState">
                {props.bodyResponseValues.map((value, i) => <option value={value} key={i}>{value}</option>)}
            </select>
        </div>
    );
}