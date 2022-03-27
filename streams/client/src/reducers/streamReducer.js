
import { 
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM
} from "../actions/types"
import _ from "lodash";



export default (state= {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            const fetchedDataInObject = _.mapKeys(action.payload, "id")
            return {...state, ...fetchedDataInObject} 
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            // For delete we'd set the payload as the id of the stream.
            return _.omit(state, action.payload)
        default:
            return state;
        
    }
}