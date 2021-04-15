import React, {useEffect} from "react";
import "./FoodRow.css"
import FoodCategory from "../../../collapse/FoodCategory";
import RecordService from "../../../services/RecordService";

export default function NewFoodRecordModal(props) {
    let [foodCatalog, setFoodCatalog] = React.useState([]);
    let [recordObject, setRecordObject] = React.useState({foodVolumes: [], zoneDateTime: new Date().toISOString()});

    useEffect(() => {
        RecordService.getFoodCatalog(setFoodCatalog);
        setRecord(recordObject);
    }, []);

    return (
        <div>
            <p>FOOD</p>
            <div className="modalContentScroll">
                {
                    Object.keys(foodCatalog).map((value, i) =>
                        <div key={i}>
                            <FoodCategory foodCategoryName={value} foods={foodCatalog[value]} addFoodVolume={addFoodVolume}/>
                        </div>
                    )
                }
            </div>
            {JSON.stringify(recordObject.foodVolumes)}
        </div>
    );

    function addFoodVolume(foodId, volume){
        const obj = {...recordObject, foodVolumes: [...recordObject.foodVolumes, {food: {id: foodId}, volume: volume}]};
        setRecordObject(obj);
        setRecord(obj);
    }

    function setRecord(recordObj){
        props.setRecordDto({
            url: "createFoodRecord",
            record: recordObj
        })
    }
}