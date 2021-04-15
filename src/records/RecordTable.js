import React from "react";
import RecordRow from "./RecordRow";
import './RecordTable.css'
import Modal from "../modal/Modal";
import DayInfoModal from "../modal/records/day_info/DayInfoModal";
import Collapsible from "react-collapsible";
import {isCurrentDay} from "../util/MyUtil";
import ChartsModal from "../modal/records/ChartsModal";

export default function RecordTable(props) {
    let [isDayInfoModalOpen, setIsDayInfoModalOpen] = React.useState(false);
    let [dayInfoModalTitle, setDayInfoModalTitle] = React.useState();

    let [isChartsModalOpen, setIsChartsModalOpen] = React.useState(false);
    let [day, setDay] = React.useState();

    return (
        <Collapsible trigger={props.month.name} open={isMonthOpen(props.month.name)}>
            <table className="monthTable">
                <thead>
                <tr>
                    <th className="recordTh" onClick={() => openCloseChartsModal()}/>
                    {props.month.generalInfos.map((value, i) =>
                        <th key={i} className={`recordTh ${isCurrentDay(value.monthDay)}`} onClick={
                            () => openCloseDayInfoModal(props.month.name + ' | ' + value.weekDay + ' / ' + value.monthDay, value.monthDay)}>
                            {value.monthDay}
                            <br/>{value.weekDay}
                        </th>)}
                </tr>
                </thead>
                <tbody>
                {props.timeLines.map((value, i) => <RecordRow key={i} timeLine={value} month={props.month}/>)}
                </tbody>
            </table>
            <Modal title={dayInfoModalTitle} isOpen={isDayInfoModalOpen} onClose={openCloseDayInfoModal}>
                <DayInfoModal year={props.year} month={props.month.name} day={day}/>
            </Modal>
            <Modal title={props.month.name +" " + props.year} isOpen={isChartsModalOpen} onClose={openCloseChartsModal} weight="1000px">
                <ChartsModal year={props.year} month={props.month.name}/>
            </Modal>
        </Collapsible>
    )

    function openCloseChartsModal() {
        setIsChartsModalOpen(!isChartsModalOpen);
    }

    function openCloseDayInfoModal(modalTitle, day) {
        setDayInfoModalTitle(modalTitle);
        setIsDayInfoModalOpen(!isDayInfoModalOpen);
        setDay(day)
    }

    function isMonthOpen(month) {
        return getCurrentMonthName().toLowerCase() === month.toLowerCase()
    }

    function getCurrentMonthName(){
        return new Date().toLocaleString('default', { month: 'long' });
    }
}