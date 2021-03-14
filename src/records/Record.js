import React from "react";
// import "font-awesome/css/font-awesome.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import Icon, {isCurrentDay} from "../util/MyUtil";
import Modal from "../modal/Modal";
import FoodRecordInfo from "../modal/records/record_info/FoodRecordInfo";

export default function Record(props) {
    let [isModalOpen, setModalIsOpen] = React.useState(false);
    let [modalChild, setModalChild] = React.useState();
    let [modalTitle, setModalTitle] = React.useState();
    let [recordDto, setRecordDto] = React.useState({url: '', record: {}});

    return (
        <td className={`recordTd ${props.isSunday ? ' tdSundayBorder' : ''} ${isCurrentDay(props.monthDay)}`}>
            {props.value.FoodRecord ? <span onClick={openFoodInfo}>{getRecordLength(props.value.FoodRecord)}<Icon type="food"/></span> : ''}
            {props.value.WaterRecord ? <span>{getRecordLength(props.value.WaterRecord)}<Icon type="water"/></span> : ''}
            {props.value.GymRecord ? <span>{getRecordLength(props.value.GymRecord)}<Icon type="gym"/></span> : ''}
            {props.value.WeightRecord ? <span>{getRecordLength(props.value.WeightRecord)}<Icon type="weight"/></span> : ''}
            {props.value.BodyResponseRecord ? <span>{getRecordLength(props.value.BodyResponseRecord)}<Icon type="bodyResponse"/></span> : ''}
            <Modal title={modalTitle} isOpen={isModalOpen} onClose={openCloseModal}>
                {modalChild}
            </Modal>
        </td>
    )

    function getRecordLength(record) {
        return record.length > 1 ? record.length : '';
    }

    function openFoodInfo() {
        openCloseModal('Food info. (kCal | proteins/carbs/fats)', <FoodRecordInfo record={props.value.FoodRecord} setRecordDto={setRecordDto}/>);
    }

    function openCloseModal(modalTitle, modalChild) {
        setModalTitle(modalTitle);
        setModalChild(modalChild);
        setModalIsOpen(!isModalOpen);
    }
}

function parseRecords(records) {
    if(Object.keys(records).length) {
        // console.log(records);
        // console.log("FoodRecord: ", records.FoodRecord);
        // console.log("WaterRecord: ", records.WaterRecord);
        // console.log("BodyResponseRecord: ", records.BodyResponseRecord);
        // console.log("GymRecord: ", records.GymRecord);
        // console.log("WeightRecord: ", records.WeightRecord);
        return Object.keys(records).length
    }
    return "";
}