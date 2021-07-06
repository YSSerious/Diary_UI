import React from "react";
import './MyUtils.css'

export default function Icon(props) {
    const icons = {
        food: <i className="bi-egg-fried fa-lg foodIconColor" title="Food Record"/>,
        water: <i className="bi-droplet-half fa-lg waterIconColor" title="Water Record"/>,
        gym: <i className="bi-trophy fa-lg gymIconColor" title="Gym Record"/>,
        weight: <i className="bi-star-fill fa-lg weightIconColor" title={getITitle("Weight Record", props.volume)}/>,
        bodyResponse: <i className="bi-person-fill fa-lg brIconColor" title="Body Response Record"/>,
        foodHealthy: <i className={`bi-diamond-fill`} style={{color: getFoodHealthyColorClass(props.foodHealthy)}}
                        title={props.foodHealthy}/>,
        pill: <i className="bi-eyedropper fa-lg pillIconColor" title="Pill Record"/>,
    };
    return (
        icons[props.type]
    );

    function getITitle(commonTitle, volume) {
        return commonTitle + (volume ? ": " + volume : "");
    }
}

export function getFoodRecordInfosTotalString(record) {
    return record.kilocalories.toFixed(2) + " | " +
        record.proteins.toFixed(2) + "/" +
        record.carbohydrates.toFixed(2) + "/" +
        record.fats.toFixed(2);
}

export function getFoodHealthyColorClass(foodHealthy) {
    const map = {
        'GOOD': '#83d70a',
        'NORMAL': '#33d0bf',
        'NOT_GOOD': '#a40be5',
        'BAD': 'darkred',
        'DRINK': 'dodgerblue'
    };
    return map[foodHealthy];
}

export function isCurrentDay(day) {
    return new Date().getDate() === day ? 'currentRecord' : '';
}

export function isCurrentTimeLine(timeLine) {
    const currentHours = new Date().getHours();
    const timeLineHours = parseInt(timeLine.substring(0, 2));
    return ((currentHours === timeLineHours) || (currentHours === timeLineHours + 1)) ? 'currentRecord' : '';
}

export function getCurrentMonthName(date) {
    return (new Date(date) || new Date()).toLocaleString('default', {month: 'long'});
}
