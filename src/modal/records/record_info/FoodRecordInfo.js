import React, {useEffect} from "react";
import './FoodRecordInfo.css'
import Icon, {getFoodRecordInfosTotalString} from "../../../util/MyUtil";
import RecordService from "../../../services/RecordService";

export default function FoodRecordInfo(props) {
    let [foodDayTimeLineInfo, setFoodDayTimeLineInfo] = React.useState([]);
    const dateOptions = {hour: 'numeric', minute: 'numeric', hour12: false};

    useEffect(() => {
        RecordService.getFoodDayTimeLineInfo(props.records, setFoodDayTimeLineInfo);
    }, []);

    return (
        <div>
            <h2 className="subHeader nutritionAlign">Total: {foodDayTimeLineInfo.length > 0 ? getFoodDayTimeLineTotalValues() : ''}</h2>
            {
                foodDayTimeLineInfo.map((value, i) =>

                    <table key={i}>
                        <thead>
                        <tr>
                            <th colSpan="3" className="foodRecordSubHeader">
                                {
                                    <span className="foodInfoHeader">
                                            <span><i
                                                className="bi-watch fa-lg"/> {new Date(value.zonedDateTime).toLocaleString(undefined, dateOptions)}</span>
                                            <span className="foodInfoHeaderSeparator">/</span>
                                            <span>{getFoodRecordInfosTotalString(getFoodRecordInfosTotalValues(value.foodRecordInfos))}</span>
                                        </span>
                                }
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {value.foodRecordInfos.map((recordValue, i) =>
                            <tr key={i}>
                                <td className="paddingFirstTd"><Icon type="foodHealthy" foodHealthy={recordValue.foodHealthy}/></td>
                                <td>{recordValue.foodName}</td>
                                <td>{getFoodRecordInfosTotalString(recordValue)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )
            }
        </div>
    );

    function getFoodDayTimeLineTotalValues() {
        return getFoodRecordInfosTotalString(
            getFoodRecordInfosTotalValues(foodDayTimeLineInfo.map(el => getFoodRecordInfosTotalValues(el.foodRecordInfos)))
        );
    }

    function getFoodRecordInfosTotalValues(foodRecordInfos) {
        return summarizeNutritious(foodRecordInfos.map(value => {
            return {
                kilocalories: value.kilocalories,
                proteins: value.proteins,
                carbohydrates: value.carbohydrates,
                fats: value.fats
            }
        }))
    }

    function summarizeNutritious(recordsWithNutritious) {
        return recordsWithNutritious.reduce((a, b) => {
            for (let k in b) {
                if (b.hasOwnProperty(k))
                    a[k] = (a[k] || 0) + b[k];
            }
            return a;
        });
    }
}