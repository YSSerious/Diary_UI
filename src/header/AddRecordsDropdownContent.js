import React from "react";
import NewFoodRecordModal from "../modal/records/new_record/NewFoodRecordModal";
import NewGymRecordModal from "../modal/records/new_record/NewGymRecordModal";
import NewWaterRecordModal from "../modal/records/new_record/NewWaterRecordModal";
import NewBodyResponseRecordModal from "../modal/records/new_record/NewBodyResponseRecordModal";
import NewWeightRecordModal from "../modal/records/new_record/NewWeightRecordModal";
import Icon from "../util/MyUtil";
import RecordService from "../services/RecordService";
import Modal from "../modal/Modal";
import {TextField} from "@material-ui/core";
import NewPillRecordModal from "../modal/records/new_record/NewPillRecordModal";

export default function AddRecordsDropdownContent(props) {

    let [isModalOpen, setModalIsOpen] = React.useState(false);
    let [modalChild, setModalChild] = React.useState();
    let [modalTitle, setModalTitle] = React.useState();
    let [recordDto, setRecordDto] = React.useState({url: '', record: {}});

    return (
        <>
            <div className="add-records-dropdown-content">
                <a>
                    <select value={props.year} onChange={selectYear}>
                        <option value={2021}>{2021}</option>
                        <option value={2022}>{2022}</option>
                        <option value={2023}>{2023}</option>
                    </select>
                </a>
                <a onClick={createFoodRecord}><Icon type="food"/> Add Food Record</a>
                <a onClick={createWaterRecord}><Icon type="water"/> Add Water Record</a>
                <a onClick={createGymRecord}><Icon type="gym"/> Add Gym Record</a>
                <a onClick={createWeightRecord}><Icon type="weight"/> Add Weight Record</a>
                <a onClick={createBodyResponseRecord}><Icon type="bodyResponse"/> Add BodyResponse Record</a>
                <a onClick={createPillRecord}><Icon type="pill"/> Add Pill Record</a>
            </div>
            <Modal title={modalTitle} isOpen={isModalOpen} onClose={openCloseModal}
                   onSubmit={() => RecordService.createRecord(recordDto, openCloseModal, props.year, props.months, props.setMonths)}>
                {modalChild}
                <br/>
                <form noValidate>
                    <TextField
                        id="date"
                        label="Record date"
                        type="datetime-local"
                        onChange={onDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </Modal>
        </>
    );

    function onDateChange(event) {
        setRecordDto({...recordDto, record: {...recordDto.record, zoneDateTime: new Date(event.target.value).toISOString()}});
    }

    function openCloseModal(modalTitle, modalChild) {
        setModalTitle(modalTitle);
        setModalChild(modalChild);
        setModalIsOpen(!isModalOpen);
    }

    function createFoodRecord() {
        openCloseModal('Add new Food Record', <NewFoodRecordModal setRecordDto={setRecordDto}/>);
    }

    function createGymRecord() {
        openCloseModal('Add new Gym Record', <NewGymRecordModal setRecordDto={setRecordDto}/>);
    }

    function createWaterRecord() {
        openCloseModal('Add new Water Record', <NewWaterRecordModal setRecordDto={setRecordDto}/>);
    }

    function createBodyResponseRecord() {
        openCloseModal('Add new Body Response Record', <NewBodyResponseRecordModal setRecordDto={setRecordDto}/>);
    }

    function createWeightRecord() {
        openCloseModal('Add new Weight Record', <NewWeightRecordModal setRecordDto={setRecordDto}/>);
    }

    function createPillRecord() {
        openCloseModal('Add new Pill Record', <NewPillRecordModal setRecordDto={setRecordDto}/>);
    }

    function selectYear(event) {
        props.setYear(event.target.value);
    }
}