import React, {useEffect} from "react";
import {getFoodRecordInfosTotalString} from "../../../util/MyUtil";
import './DayInfoModal.css'

export default function DayInfoModal(props) {
    let [dayInfo, setDayInfo] = React.useState(
        {
            food: {
                kilocalories: 0,
                proteins: 0,
                carbohydrates: 0,
                fats: 0
            },
            water: {
               volume: 0
            },
            bodyResponse: {

            }
        }
        );

    useEffect(() => {
        getRecords();
    }, []);

    return (
        <div>
            <div>
                <h2 className="headerMargin"><span className="foodInfoHeader">Food (kCal | proteins/carbs/fats)</span></h2>
                <h3 className="subHeader">Total: {getFoodRecordInfosTotalString(dayInfo.food)}</h3>
            </div>
            <div>
                <h2 className="headerMargin"><span className="waterInfoHeader">Water</span></h2>
                <h3 className="subHeader">Total: {dayInfo.water.volume + ' ml'}</h3>
            </div>
        </div>
    );

    function getRecords() {
        fetch('http://localhost:8080/food/getDayInfo?year=' + props.year + '&month=' + props.month + '&day=' + props.day)
            .then(response => response.json())
            .then(data => {
                setDayInfo(data);
            });
    }
}