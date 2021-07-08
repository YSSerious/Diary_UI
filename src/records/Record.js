import React from "react";
// import "font-awesome/css/font-awesome.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import Icon, {isCurrentDay} from "../util/MyUtil";
import Modal from "../modal/Modal";
import FoodRecordInfo from "../modal/records/record_info/FoodRecordInfo";
import WeightRecordInfo from "../modal/records/record_info/WeightRecordInfo";

export default function Record(props) {
    let [isModalOpen, setModalIsOpen] = React.useState(false);
    let [modalChild, setModalChild] = React.useState();
    let [modalTitle, setModalTitle] = React.useState();

    return (
        <td className={`recordTd ${props.isSunday ? ' tdSundayBorder' : ''} ${isCurrentDay(props.monthDay)} ${props.isCurrentTimeLine}`}>
            {props.value.FoodRecord ? <span onClick={openFoodInfo}>{getRecordLength(props.value.FoodRecord)}<Icon type="food"/></span> : ''}
            {props.value.WaterRecord ? <span>{getRecordLength(props.value.WaterRecord)}<Icon type="water"/></span> : ''}
            {props.value.GymRecord ? <span>{getRecordLength(props.value.GymRecord)}<Icon type="gym"/></span> : ''}
            {props.value.WeightRecord ? <span onClick={openWeightInfo}>{getRecordLength(props.value.WeightRecord)}<Icon type="weight" volume={getRecordsVolume(props.value.WeightRecord)}/></span> : ''}
            {props.value.BodyResponseRecord ? <span>{getRecordLength(props.value.BodyResponseRecord)}<Icon type="bodyResponse"/></span> : ''}
            {props.value.PillRecord ? <span>{getRecordLength(props.value.PillRecord)}<Icon type="pill"/></span> : ''}
            <Modal title={modalTitle} isOpen={isModalOpen} onClose={openCloseModal}>
                {modalChild}
            </Modal>
        </td>
    )

    function getRecordsVolume(records) {
        return records.map(v => v.volume).join(", ");
    }

    function getRecordLength(record) {
        return record.length > 1 ? record.length : '';
    }

    function openFoodInfo() {
        openCloseModal('Food info. (kCal | proteins/carbs/fats)', <FoodRecordInfo records={props.value.FoodRecord}/>);
    }

    function openWeightInfo() {
        openCloseModal('Weight info.', <WeightRecordInfo records={props.value.WeightRecord}/>);
    }

    function openCloseModal(modalTitle, modalChild) {
        setModalTitle(modalTitle);
        setModalChild(modalChild);
        setModalIsOpen(!isModalOpen);
    }
}