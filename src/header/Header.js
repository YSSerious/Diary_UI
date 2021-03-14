import React from "react";
import NewFoodRecordModal from "../modal/records/new_record/NewFoodRecordModal";
import NewWaterRecordModal from "../modal/records/new_record/NewWaterRecordModal";
import NewGymRecordModal from "../modal/records/new_record/NewGymRecordModal";
import NewBodyResponseRecordModal from "../modal/records/new_record/NewBodyResponseRecordModal";
import NewWeightRecordModal from "../modal/records/new_record/NewWeightRecordModal";
import Modal from "../modal/Modal";
import Icon from "../util/MyUtil";

export default function Header(props) {
    let [isModalOpen, setModalIsOpen] = React.useState(false);
    let [modalChild, setModalChild] = React.useState();
    let [modalTitle, setModalTitle] = React.useState();
    let [recordDto, setRecordDto] = React.useState({url: '', record: {}});

    return(
        <div>
            <select value={props.year} onChange={selectYear}>
                <option value={2021}>{2021}</option>
                <option value={2022}>{2022}</option>
                <option value={2023}>{2023}</option>
            </select>
            <button onClick={createFoodRecord}><Icon type="food"/> Add Food Record</button>
            <button onClick={createWaterRecord}><Icon type="water"/> Add Water Record</button>
            <button onClick={createGymRecord}><Icon type="gym"/> Add Gym Record</button>
            <button onClick={createWeightRecord}><Icon type="weight"/> Add Weight Record</button>
            <button onClick={createBodyResponseRecord}><Icon type="bodyResponse"/> Add BodyResponse Record</button>
            <Modal title={modalTitle} isOpen={isModalOpen} onClose={openCloseModal} onSubmit={createRecord}>
                {modalChild}
            </Modal>
        </div>
    );

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

    function createRecord() {
        fetch('http://localhost:8080/food/' + recordDto.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordDto.record)
        }).then(r => {
            openCloseModal();
        }).catch(error => {
            console.log("ERROR: ", error);
        });
    }

    function selectYear(event){
        props.setYear(event.target.value);
    }
}