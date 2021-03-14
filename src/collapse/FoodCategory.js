import React from 'react';
import Collapsible from "react-collapsible";
import './FoodCategory.css'
import {getFoodHealthyColorClass} from "../util/MyUtil";

export default function FoodCategory(props) {

    return (
        <div>
            <Collapsible trigger={props.foodCategoryName}>
                    {
                        props.foods.map((value, i) =>
                            <div className="foodRow" key={i}>
                                <div className={`foodName ${getFoodHealthyColorClass(value.foodHealthy)}`} title={value.foodHealthy}>
                                    {value.name + ", "+ (value.inGrams ? "grams" : "pieces")}
                                </div>
                                <div className="activeFoodPart">
                                    <input type="number" id={value.id+'-input'}/>
                                    <button id={value.id} onClick={props.addFoodVolume}><i className="bi-plus fa-lg" title="Add food"/></button>
                                </div>
                            </div>
                        )
                    }
            </Collapsible>
        </div>
    );
}