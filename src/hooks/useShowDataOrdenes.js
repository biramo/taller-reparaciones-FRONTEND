//Controla la visibilidad de los datos de clientes/tecnicos/dispositivos
import { useReducer } from "react"
import { ACTIONS } from "../constants/ActionsUseShowDataOrdenes"

export function useShowDataOrdenes(){


    const initialState={
        clientes:false,
        tecnicos:false,
        dispositivos:false,

    }
    function reducer(state,action){
        switch(action.type){
            case ACTIONS.TOGGLE_CLIENTES:
                    return {
                        ...state,
                        clientes:!state.clientes,
                    }
                
            
            case ACTIONS.TOGGLE_TECNICOS:
                return{
                    ...state,
                    tecnicos:!state.tecnicos
                }
            case ACTIONS.TOGGLE_DISPOSITIVOS:
            
            return{
                ...state,
                dispositivos:!state.dispositivos
            }

            default:
                return
                    state
                
            }
        }

        

    const [state,dispatch]=useReducer(reducer,initialState)

    
    return{
            state,dispatch
        }
    }
