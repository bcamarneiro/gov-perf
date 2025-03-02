import useInitiatives from '@/services/initiatives/useInitiatives';
import { TextField } from '@radix-ui/themes';
import { Accordion } from 'radix-ui';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InitiativeList = () => {
  const { initiatives, metadata } = useInitiatives();
  console.log('🚀 ~ InitiativeList ~ metadata:', metadata);
  const [filterText, setFilterText] = useState('');
  const [filteredInitiatives, setFilteredInitiatives] = useState(initiatives);

  useEffect(() => {
    // Filter initiatives based on the search text
    const filtered = initiatives.filter((initiative) =>
      initiative.IniTitulo.toLowerCase().includes(filterText.toLowerCase()),
    );
    setFilteredInitiatives(filtered);
  }, [filterText, initiatives]);

  return (
    <div className="w-full h-full flex flex-col p-5 justify-baseline overflow-y-auto overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Initiatives List</h1>

      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="details">
          <Accordion.Header>
            <Accordion.Trigger>{'> Details'}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="grid grid-cols-3">
              <li>{`total: ${metadata.total}`}</li>
              {Object.entries(metadata?.totalByFase ?? {}).map(
                ([key, value]) => {
                  return metadata.fasesList ? (
                    <li key={key}>{`${metadata.fasesList[key]}: ${value}`}</li>
                  ) : null;
                },
              )}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <div className="relative my-4">
        <TextField.Root
          placeholder="Search the initiatives…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        >
          <TextField.Slot>
            <FaSearch height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      {filteredInitiatives.length === 0 ? (
        <p className="text-gray-500">
          No initiatives found matching your filter.
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredInitiatives.map((initiative) => {
            return (
              <li key={initiative.IniId} className="flex flex-row gap-1.5">
                <span>{initiative.latestEvent.Fase.trim()}</span>
                <Link
                  to={`/initiatives/${initiative.IniId}/details`}
                  className="block text-blue-600 hover:underline"
                >
                  {`- ${initiative.IniTitulo}`}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default InitiativeList;
