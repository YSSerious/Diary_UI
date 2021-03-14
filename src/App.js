import './App.css';
import React, {useEffect} from "react";
import RecordsContent from "./records/RecordsContent";
import Header from "./header/Header";

function App() {
    let [year, setYear] = React.useState(new Date().getFullYear());
    let [timeLines, setTimeLines] = React.useState([]);
    let [months, setMonths] = React.useState([]);

    useEffect(() => {
        getRecords();
    }, [year]);

    useEffect(() => {
        getTimeLInes();
    }, []);

    return (
        <div>
            <Header setYear={setYear} year={year}/>
            <RecordsContent months={months} timeLines={timeLines} year={year}/>
        </div>
    );

    function getRecords() {
        fetch('http://localhost:8080/food/getRecords?year=' + year)
            .then(response => response.json())
            .then(data => {
                setMonths(data);
            });
    }

    function getTimeLInes() {
        fetch('http://localhost:8080/food/getTimeLInes')
            .then(response => response.json())
            .then(data => {
                setTimeLines(data)
            });
    }
}

export default App;
