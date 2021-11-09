const axios = require('axios');

export function actionGetAllCountries(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries`)
        .then(response =>{
            console.log(response.data);
            dispatch({ // lanzo el dispatch al reducer
                type: "GET_COUNTRIES",
                payload: response.data, // la info esta en data
            })
        })        
    }
}

export function getActivities(){    
    return function(dispatch){
        return axios.get(`http://localhost:3001/activity`)
        .then(response =>{
            console.log(response.data);
            dispatch({
                type: "GET_ACTIVITIES",
                payload: response.data,
            })
        })
        
    }
}

export function getCountryByName(name){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries?name=${name}`)
        .then(response =>{
            dispatch({
                type: "GET_COUNTRY_BY_NAME",
                payload: response.data,
            })
        })
    }
}

export function getCountryOrderBy(order){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries`)
        .then(response =>{
            dispatch({
                type: "ORDER_BY",
                payload: order,
            })
        })
    }
}

export function getCountryByPopulation(order){
    return { type: "ORDER_POPULATION", payload: order, }
}

export function getCountryByContinent(order){
    return { type: "FILTER_BY_CONTINENT", payload: order}
}

export function getCountryByActivity(activity){
    return { type: "FILTER_BY_ACTIVITY", payload: activity}
}