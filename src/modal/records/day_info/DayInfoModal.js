import React, {useEffect} from "react";
import {getFoodRecordInfosTotalString} from "../../../util/MyUtil";
import './DayInfoModal.css'
import RecordService from "../../../services/RecordService";

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
        RecordService.getDayInfoData(props.year, props.month, props.day, setDayInfo);
    }, []);

    return (
        <div>
            <div>
                <h2 className="headerMargin"><span className="foodInfoHeader">Food (kCal | proteins/carbs/fats)</span></h2>
                <h3 className="subHeader">Total: {getFoodRecordInfosTotalString(dayInfo.food)}</h3>
            </div>
            <div>
            </div>
            <div>
                <h2 className="headerMargin"><span className="waterInfoHeader">Water</span></h2>
                <h3 className="subHeader">Total: {dayInfo.water.volume + ' ml'}</h3>
            </div>
        </div>
    );
}