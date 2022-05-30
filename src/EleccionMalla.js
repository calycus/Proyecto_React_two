import {
    Card, Divider, Collapse,
    Typography, Accordion, AccordionSummary,
    AccordionDetails, ListItemButton, ListItemText, Button, ListItemIcon
} from '@mui/material';

import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter, Link, Route, useNavigate } from 'react-router-dom';

//store
import {
    selectArrayFacultades, selectIdFacultad, selectIdEscuela,
    setLocalIdEscuela, setLocalIdMalla, setLocalIdFacultad,
    toggleExpanded, traerFacultadesAsync
} from './store/EleccionMallaStore';

//iconos
import { ExpandMore, AssuredWorkload, ArrowForward } from '@mui/icons-material';

//dependencias CSS
import './css/EleccionMalla.css';

//control de apertura y cierra de los card de acordiones

export default function CardCareerChoice(props) {
    const theme = useTheme()
    let navigate = useNavigate();
    const facultades = useSelector(selectArrayFacultades);
    const idEscuela = useSelector(selectIdEscuela);
    const idFacultad = useSelector(selectIdFacultad);
    const dispatch = useDispatch();
    const [expandedPanel, setExpandedPanel] = useState(false);

    useEffect(() => {
        dispatch(traerFacultadesAsync());
    }, []);

    function setLocalVariables(id_escuela) {
        dispatch(setLocalIdEscuela(id_escuela))
        /* dispatch(setLocalIdMalla(id_malla))
        dispatch(setLocalIdFacultad(id_facultad)) */
    }

    function handleClick() {
        navigate("/index", { replace: true });
    }

    return (
        <Box>
            <div className='titulo' >
                Seleccione una Malla para Continuar
            </div>
            {/* <Button onClick={() => veridlocal()}>VER</Button> */}
            <Button onClick={() => handleClick()}>VER</Button>
            <div className='grid-mallas'>
                {
                    facultades.map((facultad, index) =>
                        <Card className='card-facultad' key={index}>
                            <div>
                                <Container>
                                    <div className='card-container' onClick={() => dispatch(toggleExpanded(index))} >
                                        <img style={{ minWidth: '90px', maxWidth: '90px' }} src={'facultades/fac_' + facultad.id + '.svg'} />
                                        <div className='div-name-facultad' style={{ color: theme.palette.primary.main }}>
                                            {facultad.nombre}
                                        </div>
                                    </div>

                                    <Collapse in={facultad.fac_expandida} timeout="auto" unmountOnExit>
                                        <Divider sx={{ margin: 1 }} />
                                        {facultad.escuelas.map((escuela, index) =>
                                            <Accordion expanded sx={{ boxShadow: 'none' }} key={index}>
                                                <Accordion
                                                    expanded={expandedPanel === index}
                                                    onChange={(e, expanded) => setExpandedPanel(expanded ? index : false)}
                                                    sx={{ boxShadow: 'none' }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMore />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <AssuredWorkload style={{ paddingRight: '10px' }} />
                                                        {escuela.nombre}
                                                    </AccordionSummary>
                                                    <AccordionDetails >
                                                        {escuela.mallas.map((malla, index) =>

                                                            <AccordionDetails key={index} style={{ cursor: 'pointer' }} onClick={() => setLocalVariables(escuela.id)}>
                                                                <div className='div-select-malla'>
                                                                    {malla.nombre}
                                                                    <ArrowForward className='arrowFoward-class' />
                                                                </div>
                                                            </AccordionDetails>

                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Accordion>)
                                        }
                                    </Collapse>
                                </Container>
                            </div>
                        </Card>)
                }
            </div>
        </Box >
    )
}
