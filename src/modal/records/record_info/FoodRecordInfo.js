import React, {useEffect} from "react";
import './FoodRecordInfo.css'
import Icon, {getFoodHealthyColorClass, getFoodRecordInfosTotalString} from "../../../util/MyUtil";

export default function FoodRecordInfo(props) {
    let [foodDayTimeLineInfo, setFoodDayTimeLineInfo] = React.useState([]);
    const dateOptions = {hour: 'numeric', minute: 'numeric', hour12: false};

    useEffect(() => {
        getFoodCatalog();
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
                                <td className="paddingFirstTd"><Icon type="foodHealthy" foodHealthyColor={getFoodHealthyColorClass(recordValue.foodHealthy)} foodHealthyTitle={recordValue.foodHealthy}/></td>
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

    // function getFoodHealthyColorClass(foodHealthy) {
    //     const map = {
    //         'GOOD': 'goodFH',
    //         'NORMAL': 'normalFH',
    //         'NOT_GOOD': 'ngoodFH',
    //         'BAD': 'badFH',
    //         'DRINK': 'drinkFH'
    //     };
    //     return map[foodHealthy];
    // }

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

    function getFoodCatalog() {
        fetch('http://localhost:8080/food/getFoodDayTimeLineInfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.record.map(r => r.id))
        }).then(response => response.json())
            .then(data => {
                setFoodDayTimeLineInfo(data);
            });
    }
}