import React from 'react';
import Collapsible from "react-collapsible";
import './FoodCategory.css'
import FoodRow from "./FoodRow";

export default function FoodCategory(props) {
    return (
        <div>
            <Collapsible trigger={props.foodCategoryName}>
                    {
                        props.foods.map((value, i) =>
                            <FoodRow food={value} key={i} addFoodVolume={props.addFoodVolume}/>
                        )
                    }
            </Collapsible>
        </div>
    );
}