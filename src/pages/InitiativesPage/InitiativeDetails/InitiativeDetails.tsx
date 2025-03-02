import useInitiatives from '@/services/initiatives/useInitiatives';
import { useParams } from 'react-router-dom';

const InitiativeDetails = () => {
  const { selectedInitiativeId } = useParams();

  const { initiatives } = useInitiatives();
  const initiative = initiatives.find(
    (initiative) => initiative.IniId === selectedInitiativeId,
  );

  return (
    <div className="w-full h-full flex flex-col p-2-5">
      {initiative && (
        <>
          <h1>{`Initiative #${initiative.IniNr}`}</h1>
          <h2>{initiative.IniTitulo}</h2>

          <h2>Fases</h2>
          <ul>
            {initiative.IniEventos.map((event) => (
              <li
                key={event.EvtId}
              >{`${event.CodigoFase} -${event.Fase}: ${event.DataFase}`}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default InitiativeDetails;
