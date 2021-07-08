import serverUrl, {authHeaderName} from "./ServiceConstants";
import authHeader from "./AuthHeader";
import {getCurrentMonthName} from "../util/MyUtil";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const user = JSON.parse(localStorage.getItem(authHeaderName));

const RecordService = {

    getYearRecords: function (year, setMonths) {
        if(user) {
            fetch(serverUrl + 'food/getYearRecords?year=' + year + '&userId=' + user.id,{
                headers: authHeader()
            })
                .then(response => {
                    if(response.status === 401) {

                    }
                    return response.json();
                })
                .then(data => {
                    setMonths(data);
                });
        }
    },

    getMonthRecords: function (year, month, months, setMonths) {
        fetch(serverUrl + 'food/getMonthRecords?year=' + year + '&month=' + month + '&userId=' + user.id, {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                setMonths(
                    months.map(month => {
                        if (month.diaryMonth.name === data.name) {
                            return {diaryMonth: data, modalOpen: true}
                        }
                        return month;
                    })
                )
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

    createRecord: function (recordDto, openCloseModal, year, months, setMonths) {
        recordDto.record.user = {id: user.id};
        recordDto.record.zoneDateTime = recordDto.record.zoneDateTime ? recordDto.record.zoneDateTime : new Date().toISOString();
        fetch(serverUrl + 'food/' + recordDto.url, {
            method: 'POST',
            headers: {...defaultHeaders, ...authHeader()},
            body: JSON.stringify(recordDto.record)
        }).then(response => response.json())
            .then(response => {
                openCloseModal();
                this.getMonthRecords(year, getCurrentMonthName(recordDto.record.zoneDateTime), months, setMonths);
            }).catch(error => {
            console.log("ERROR: ", error);
        });
    },

    getFoodCatalog: function () {
        return fetch(serverUrl + 'food/getFoodCatalog', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                return data;
            });
    },

    getPillCatalog: function () {
        return fetch(serverUrl + 'food/getPillCatalog', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                return data;
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

    getMonthWeightChartData: function (weightRecordId) {
        fetch(serverUrl + 'food/getMonthWeightChartData?weightRecordId=' + weightRecordId, {
            headers: authHeader()
        }).then(response => response.json())
            .then(data => {

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