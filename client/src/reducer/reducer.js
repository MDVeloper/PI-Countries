const initialState = {
    backendCountries: [],
    backendFilteredCountries: [],
    backendActivities: [],
  }
  
  function rootReducer ( state = initialState, action){
    switch (action.type) {
        case "GET_COUNTRIES": { // actionGetAllCountries envia el dispatch y llegamos acá
            return{
                ...state, // copiamos data anterior
                backendCountries: action.payload, // tomamos la info que nos dan en payload y la introducimos en el state en la propiedad que vaya.
                backendFilteredCountries: action.payload,
            } // fin del return, ya terminamos de modificar el store.
        } 
        case "GET_ACTIVITIES": { // actionGetAllCountries envia el dispatch y llegamos acá
            return{
                ...state,
                backendActivities: action.payload,
            }
        } 
        case "GET_COUNTRY_BY_NAME": {
            console.log(action.payload);
            return {
                ...state,
                backendFilteredCountries: action.payload,
            }
        }
        case "ORDER_BY": {
            console.log(action.payload);
            if (action.payload === "AZ"){
                return {
                    ...state,
                    backendFilteredCountries: [...state.backendFilteredCountries.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)]
                }
            }
            else {
                return {
                    ...state,
                    backendFilteredCountries: [...state.backendFilteredCountries.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)]
                }
            }
        }
        case "ORDER_POPULATION": {
            if (action.payload === "MAX"){
                //console.log(...state.backendFilteredCountries.sort((a, b) => a.population > b.population ? 1 : -1));
                return {
                    ...state,
                    backendFilteredCountries: [...state.backendFilteredCountries.sort((a, b) => a.population > b.population ? 1 : -1)]
                }
            }
            else {
                //console.log(...state.backendFilteredCountries.sort((a, b) => a.population > b.population ? -1 : 1));
                return {
                    ...state,
                    backendFilteredCountries: [...state.backendFilteredCountries.sort((a, b) => a.population > b.population ? -1 : 1)]
                }
            }
        }
        case "FILTER_BY_CONTINENT": {
            let status = state.backendCountries;
            /*
            let newArray = status.map((country) => {
                return {
                    ...country,
                     continent: country.continent.map((e2) => e2.name),
                }
            })
            */
            let filter = action.payload === "ALL" ? status : status.filter((e) => e.continent.toLowerCase() === action.payload);

            return {
                ...state,
                backendFilteredCountries: filter,
            }
        }
        case "FILTER_BY_ACTIVITY": {
            let status = state.backendCountries;
            
            let newArray = status.map((country) => {
                return {
                    ...country,
                     activities: country.activities.map((e2) => e2.name),
                }
            })
            
            let filter = action.payload === "ALL" ? status : newArray.filter((e) => e.activities.includes(action.payload));

            return {
                ...state,
                backendFilteredCountries: filter,
            }
        }
        default:
          return {...state}
      }
  }
  
  export default rootReducer;