import React, {useEffect} from "react";
import "./FoodRow.css"
import FoodCategory from "../../../collapse/FoodCategory";

export default function NewFoodRecordModal(props) {
    let [foodCatalog, setFoodCatalog] = React.useState([]);
    let [recordObject, setRecordObject] = React.useState({foodVolumes: [], zoneDateTime: new Date().toISOString()});

    useEffect(() => {
        getFoodCatalog();
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

    function addFoodVolume(event){
        const id = event.target.id;
        const volume = document.getElementById(id+'-input').value;
        const obj = {...recordObject, foodVolumes: [...recordObject.foodVolumes, {food: {id: id}, volume: volume}]};
        setRecordObject(obj);
        setRecord(obj);
    }

    function setRecord(recordObj){
        props.setRecordDto({
            url: "createFoodRecord",
            record: recordObj
        })
    }

    function getFoodCatalog() {
        fetch('http://localhost:8080/food/getFoodCatalog')
            .then(response => response.json())
            .then(data => {
                setFoodCatalog(data);
            });
    }
}