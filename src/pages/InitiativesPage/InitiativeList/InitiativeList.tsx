import useInitiatives from '@/services/initiatives/useInitiatives';
import { Button, Table, TextField } from '@radix-ui/themes';
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
            <Accordion.Trigger>
              <Button>{'> Details'}</Button>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="grid grid-cols-3 text-sm">
              <li>
                <span className="text-neutral-11">total: </span>
                <span className="font-bold">{metadata.total}</span>
              </li>
              {Object.entries(metadata?.totalByFase ?? {}).map(
                ([key, value]) => {
                  return metadata.fasesList ? (
                    <li key={key}>
                      <span className="text-neutral-11">{`${metadata.fasesList[key]}:`}</span>
                      <span className="font-bold">{value}</span>
                    </li>
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

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fase</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredInitiatives.length === 0 ? (
            <p className="text-gray-500">
              No initiatives found matching your filter.
            </p>
          ) : (
            filteredInitiatives.map((initiative) => {
              return (
                <Table.Row key={initiative.IniId}>
                  <Table.RowHeaderCell>{initiative.IniNr}</Table.RowHeaderCell>
                  <Table.Cell>{initiative.latestEvent.Fase.trim()}</Table.Cell>
                  <Table.Cell>{initiative.IniTitulo}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/initiatives/${initiative.IniId}/details`}
                      className="block text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default InitiativeList;
