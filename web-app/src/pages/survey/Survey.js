import React from 'react';
import { Link} from 'react-router-dom';
import TextHeader from '../../components/TextHeader';
import Card from '../../components/Card';
import '../../styles/Survey.css';
import { faChartPie, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import useTabTitle from '../../custom-hooks/useTabTitle';

function Survey() {
    useTabTitle("BAMX - Encuestas");
    return (
        <>
            <TextHeader text="Encuestas" />
            <div className="Survey">
                <Link to="/bamx/encuestas/registros">
                    <Card icon={faSquarePollHorizontal} title="Registros" />
                </Link>
                <Link to="/bamx/encuestas/graficas">
                    <Card icon={faChartPie} title="Gráficas" />
                </Link>
            </div>
        </>
    );
}

export default Survey;