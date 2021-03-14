import React from "react";
import './MyUtils.css'

export default function Icon(props){
    const icons = {
        food: <i className="bi-egg-fried fa-lg foodIconColor" title="Food Record"/>,
        water: <i className="bi-droplet-half fa-lg waterIconColor" title="Water Record"/>,
        gym: <i className="bi-trophy fa-lg gymIconColor" title="Gym Record"/>,
        weight: <i className="bi-star-fill fa-lg weightIconColor" title="Weight Record"/>,
        bodyResponse: <i className="bi-person-fill fa-lg brIconColor" title="Body Response Record"/>,
        foodHealthy: <i className={`bi-diamond-fill ${props.foodHealthyColor}`} title={props.foodHealthyTitle}/>
    };
    return(
        icons[props.type]
    );
}

export function getFoodRecordInfosTotalString(record) {
    return record.kilocalories.toFixed(2) + " | " +
        record.proteins.toFixed(2) + "/" +
        record.carbohydrates.toFixed(2) + "/" +
        record.fats.toFixed(2);
}

export function getFoodHealthyColorClass(foodHealthy) {
    const map = {
        'GOOD': 'goodFH',
        'NORMAL': 'normalFH',
        'NOT_GOOD': 'ngoodFH',
        'BAD': 'badFH',
        'DRINK': 'drinkFH'
    };
    return map[foodHealthy];
}

export function isCurrentDay(day) {
    return new Date().getUTCDate() === day ? 'currentDay' : '';
}