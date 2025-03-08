import { useInitiatives } from '@/services/initiatives/useInitiatives';
import { Table } from '@radix-ui/themes';
import { Accordion } from 'radix-ui';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { Spinner } from '@/components/Spinner';

const InitiativeList = () => {
  const { initiatives, metadata, isLoading, isError, error } = useInitiatives();
  const [filterText, setFilterText] = useState('');
  const [debouncedFilterText, setDebouncedFilterText] = useState('');

  // Debounce filter text updates
  const debouncedSetFilter = useMemo(
    () => debounce((value: string) => setDebouncedFilterText(value), 300),
    [],
  );

  useEffect(() => {
    debouncedSetFilter(filterText);
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [filterText, debouncedSetFilter]);

  // Memoize filtered initiatives
  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((initiative) =>
      initiative.IniTitulo.toLowerCase().includes(
        debouncedFilterText.toLowerCase(),
      ),
    );
  }, [initiatives, debouncedFilterText]);

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-bold mb-2">Error loading initiatives</h2>
          <p>
            {error instanceof Error
              ? error.message
              : 'An unexpected error occurred'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-5 justify-baseline overflow-y-auto overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Initiatives List</h1>

      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="details">
          <Accordion.Header>
            <Accordion.Trigger>
              <span className="inline-block px-3 py-2 text-sm font-medium bg-neutral-3 text-neutral-12 rounded hover:bg-neutral-4">
                {'> Details'}
              </span>
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
        <input
          type="text"
          placeholder="Search the initiatives…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-4 py-2 rounded border border-neutral-6 bg-neutral-2"
          aria-label="Search initiatives"
        />
        <FaSearch
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-11"
          aria-hidden="true"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell scope="col">#</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell scope="col">Fase</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell scope="col">Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell scope="col">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredInitiatives.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center text-gray-500">
                  {debouncedFilterText
                    ? 'No initiatives found matching your search.'
                    : 'No initiatives available.'}
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredInitiatives.map((initiative) => {
                return (
                  <Table.Row key={initiative.IniId}>
                    <Table.RowHeaderCell>
                      {initiative.IniNr}
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {initiative.latestEvent.Fase?.trim()}
                    </Table.Cell>
                    <Table.Cell>{initiative.IniTitulo}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/initiatives/${initiative.IniId}/details`}
                        className="block text-blue-600 hover:underline"
                        aria-label={`View details for initiative ${initiative.IniTitulo}`}
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
      )}
    </div>
  );
};

export default InitiativeList;
