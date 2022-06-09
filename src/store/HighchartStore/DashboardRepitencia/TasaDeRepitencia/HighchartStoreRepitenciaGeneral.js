import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRepitencia',
    initialState: {
        array_Materias_Repitencia: [],
        array_tot_inscripciones: [],
        array_tot_inscripciones_perdidas: [],
        array_tot_inscripciones_pasadas: [],
        array_abreviaturas_periodos: [],
        array_Indices_Repitencia: [],
    },

    reducers: {
        setMateriasRepitencia: (state, action) => {
            // Al ser data.array_materias_mayor_incidencia un Object
            // console.log(typeof data.array_materias_mayor_incidencia);
            // no se lo puede recorrer con un forEach, ya que no es un array
            // Se recorre con el for .. in para pushear los valores de los keys del object en elementos del
            // array state.array_Materias_Repitencia
            state.array_Materias_Repitencia = [];
            for (const value in action.payload.array_materias_mayor_incidencia) {
                //console.log(`${value}: ${data.array_materias_mayor_incidencia[value]}`);
                state.array_Materias_Repitencia.push(action.payload.array_materias_mayor_incidencia[value]);
            }
        },

        setTotalInscripcionesRepitencia: (state, action) => {
            state.array_tot_inscripciones = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones;
            state.array_tot_inscripciones_perdidas = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones_perdidas;
            state.array_tot_inscripciones_pasadas = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones_pasadas;
            /* console.log(data.array_tot_inscripciones_Todo); */
        },

        setIndicesRepitencia: (state, action) => {
            state.array_Indices_Repitencia = action.payload.array_indices;
            /* console.log(data);
            console.log(data.array_indices); */
        },

        setArrayAbreviaturasPeriodoRepitencia: (state, action) => {
            state.array_abreviaturas_periodos = action.payload.array_abreviaturas_periodo;
            /* console.log(data.array_abreviaturas_periodo) */
        },
    }
})

export const traerInfoRepitenciaAsync = (id_Malla, id_Periodos) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/principal/tablas_materias_incidencia/' + id_Malla + "/periodos/" + id_Periodos, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setMateriasRepitencia(res.data.data))
            dispatch(setTotalInscripcionesRepitencia(res.data.data))
            dispatch(setIndicesRepitencia(res.data.data))
            dispatch(setArrayAbreviaturasPeriodoRepitencia(res.data.data))
        })
}


export const { setMateriasRepitencia, setTotalInscripcionesRepitencia,
    setIndicesRepitencia, setArrayAbreviaturasPeriodoRepitencia } = traerInfo.actions;

export const selectArrayMateriasRepitencia = (state) => state.HighchartRepitencia.array_Materias_Repitencia;
export const selectArrayTotalInscripcionesRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones;
export const selectArrayTotalInscripcionesPerdidasRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones_perdidas;
export const selectArrayTotalInscripcionesPasadasRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones_pasadas;
export const selectArrayAbreviaturasPeriodoRepitencia = (state) => state.HighchartRepitencia.array_abreviaturas_periodos;
export const selectArrayIndicesRepitencia = (state) => state.HighchartRepitencia.array_Indices_Repitencia;

export default traerInfo.reducer;