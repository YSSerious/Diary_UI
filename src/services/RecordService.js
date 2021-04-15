import serverUrl from "./ServiceConstants";
import authHeader from "./AuthHeader";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const RecordService = {

    getYearRecords: function (year, setMonths) {
        fetch(serverUrl + 'food/getRecords?year=' + year, {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setMonths(data);
            });
    },

    getTimeLInes: function (setTimeLines) {
        fetch(serverUrl + 'food/getTimeLInes', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setTimeLines(data)
            });
    },

    createRecord: function (recordDto, userId, openCloseModal, setReloadRecordsFlag, reloadRecordsFlag) {
        recordDto.record.user = {id: userId};
        fetch(serverUrl + 'food/' + recordDto.url, {
            method: 'POST',
            headers: {...defaultHeaders, ...authHeader()},
            body: JSON.stringify(recordDto.record)
        }).then(response => {
            openCloseModal();
            setReloadRecordsFlag(!reloadRecordsFlag);
        }).catch(error => {
            console.log("ERROR: ", error);
        });
    },

    getFoodCatalog: function (setFoodCatalog) {
        fetch(serverUrl + 'food/getFoodCatalog', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setFoodCatalog(data);
            });
    },

    getBodyResponseValues: function (setBodyResponseValues) {
        fetch(serverUrl + 'food/getBodyResponseValues', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setBodyResponseValues(data);
            });
    },

    getDayInfoData: function (year, month, day, setDayInfo) {
        fetch(serverUrl + 'food/getDayInfo?year=' + year + '&month=' + month + '&day=' + day, {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setDayInfo(data);
            });
    },

    getFoodDayTimeLineInfo: function (foodRecords, setFoodDayTimeLineInfo) {
        fetch(serverUrl + 'food/getFoodDayTimeLineInfo', {
            method: 'POST',
            headers: {...defaultHeaders, ...authHeader()},
            body: JSON.stringify(foodRecords.map(r => r.id))
        }).then(response => response.json())
            .then(data => {
                setFoodDayTimeLineInfo(data);
            });
    },

    getMonthChartData: function (year, month, setChartCaloriesData, setChartWeightData, setChartWaterData) {
        fetch(serverUrl + 'food/getMonthInfo?year=' + year + '&month=' + month, {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setChartCaloriesData([
                    {
                        label: 'Calories',
                        data: data.filter(dayInfo => dayInfo.food.kilocalories !== 0.0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.food.kilocalories}
                        })
                    },
                    {
                        label: 'Proteins',
                        data: data.filter(dayInfo => dayInfo.food.proteins !== 0.0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.food.proteins}
                        })
                    },
                    {
                        label: 'Fats',
                        data: data.filter(dayInfo => dayInfo.food.fats !== 0.0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.food.fats}
                        })
                    },
                    {
                        label: 'Carbohydrates',
                        data: data.filter(dayInfo => dayInfo.food.carbohydrates !== 0.0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.food.carbohydrates}
                        })
                    }
                ]);

                setChartWeightData([
                    {
                        label: 'Weight',
                        data: data.filter(dayInfo => dayInfo.weight.volume !== 0.0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.weight.volume}
                        })
                    }
                ]);

                setChartWaterData([
                    {
                        label: 'Water',
                        data: data.filter(dayInfo => dayInfo.water.volume !== 0).map(dayInfo => {
                            return {x: dayInfo.dayNumber, y: dayInfo.water.volume}
                        })
                    }
                ]);
            });
    }
}

export default RecordService;