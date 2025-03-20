import { Spinner } from '@/components/Spinner';
import { useInitiatives } from '@/services/initiatives/useInitiatives';
import { formatDate } from '@/utils/dateUtils';
import { Table } from '@radix-ui/themes';
import debounce from 'lodash/debounce';
import { Accordion } from 'radix-ui';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InitiativeList = () => {
  const { initiatives, metadata, isLoading, isError, error } = useInitiatives();
  const [filterText, setFilterText] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [debouncedFilterText, setDebouncedFilterText] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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
    return initiatives.filter((initiative) => {
      const matchesSearch = initiative.IniTitulo.toLowerCase().includes(
        debouncedFilterText.toLowerCase(),
      );
      const matchesPhase = selectedPhase
        ? initiative.latestEvent.Fase === selectedPhase
        : true;
      return matchesSearch && matchesPhase;
    });
  }, [initiatives, debouncedFilterText, selectedPhase]);

  const toggleRow = (initiativeId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(initiativeId)) {
        newSet.delete(initiativeId);
      } else {
        newSet.add(initiativeId);
      }
      return newSet;
    });
  };

  // Get unique phases for filter
  const phases = useMemo(() => {
    const phaseSet = new Set<string>();
    for (const initiative of initiatives) {
      if (initiative.latestEvent.Fase) {
        phaseSet.add(initiative.latestEvent.Fase);
      }
    }
    return Array.from(phaseSet);
  }, [initiatives]);

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
    <div className="w-full h-full flex flex-col p-5 overflow-hidden">
      <div className="flex-none">
        <h1 className="text-2xl font-bold mb-4">Initiatives List</h1>

        <Accordion.Root type="single" collapsible className="mb-6">
          <Accordion.Item
            value="details"
            className="border rounded-lg overflow-hidden"
          >
            <Accordion.Header className="bg-neutral-2">
              <Accordion.Trigger className="w-full flex items-center justify-between p-4 hover:bg-neutral-3 transition-colors">
                <span className="font-medium text-neutral-12">
                  Statistics Overview
                </span>
                <FaChevronDown className="text-neutral-11 transition-transform ui-expanded:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="p-4 bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-2 p-4 rounded-lg">
                  <span className="text-neutral-11 text-sm">
                    Total Initiatives
                  </span>
                  <p className="text-2xl font-bold mt-1">{metadata.total}</p>
                </div>
                {Object.entries(metadata?.totalByFase ?? {}).map(
                  ([key, value]) => {
                    return metadata.fasesList ? (
                      <div key={key} className="bg-neutral-2 p-4 rounded-lg">
                        <span className="text-neutral-11 text-sm">
                          {metadata.fasesList[key]}
                        </span>
                        <p className="text-2xl font-bold mt-1">{value}</p>
                      </div>
                    ) : null;
                  },
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search initiatives..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-neutral-6 bg-neutral-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              aria-label="Search initiatives"
            />
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-11"
              aria-hidden="true"
            />
          </div>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-6 bg-neutral-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            aria-label="Filter by phase"
          >
            <option value="">All Phases</option>
            {phases.map((phase) => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table.Root>
              <Table.Header>
                <Table.Row className="bg-neutral-2">
                  <Table.ColumnHeaderCell scope="col" className="w-12" />
                  <Table.ColumnHeaderCell scope="col">#</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell scope="col">
                    Phase
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell scope="col">
                    Title
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell scope="col" className="w-24">
                    Actions
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {filteredInitiatives.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      className="text-center py-8 text-neutral-11"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FaSearch className="w-6 h-6" aria-hidden="true" />
                        <p>
                          {debouncedFilterText || selectedPhase
                            ? 'No initiatives found matching your criteria.'
                            : 'No initiatives available.'}
                        </p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredInitiatives.map((initiative) => {
                    const isExpanded = expandedRows.has(initiative.IniId);
                    return (
                      <>
                        <Table.Row
                          key={initiative.IniId}
                          className="hover:bg-neutral-1 transition-colors cursor-pointer"
                          onClick={() => toggleRow(initiative.IniId)}
                        >
                          <Table.Cell className="w-12">
                            {isExpanded ? (
                              <FaChevronDown className="text-neutral-11" />
                            ) : (
                              <FaChevronRight className="text-neutral-11" />
                            )}
                          </Table.Cell>
                          <Table.RowHeaderCell>
                            {initiative.IniNr}
                          </Table.RowHeaderCell>
                          <Table.Cell>
                            <span className="inline-flex px-2 py-1 rounded-full text-sm bg-neutral-2">
                              {initiative.latestEvent.Fase?.trim()}
                            </span>
                          </Table.Cell>
                          <Table.Cell>{initiative.IniTitulo}</Table.Cell>
                          <Table.Cell>
                            <Link
                              to={`/initiatives/${initiative.IniId}/details`}
                              className="inline-block px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:underline rounded transition-colors"
                              aria-label={`View details for initiative ${initiative.IniTitulo}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Details
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                        {isExpanded && (
                          <Table.Row className="bg-neutral-1">
                            <Table.Cell colSpan={5} className="p-4">
                              <div className="space-y-4">
                                {initiative.description && (
                                  <div>
                                    <h4 className="font-medium text-sm text-neutral-11 mb-1">
                                      Description
                                    </h4>
                                    <p className="text-neutral-12">
                                      {initiative.description}
                                    </p>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div>
                                    <h4 className="font-medium text-sm text-neutral-11 mb-1">
                                      Type
                                    </h4>
                                    <p className="text-neutral-12">
                                      {initiative.IniTipo === 'P'
                                        ? 'Proposta de Lei'
                                        : initiative.IniTipo}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-neutral-11 mb-1">
                                      Latest Update
                                    </h4>
                                    <p className="text-neutral-12">
                                      {formatDate(
                                        typeof initiative.latestEvent
                                          .DataFase === 'string'
                                          ? initiative.latestEvent.DataFase
                                          : initiative.latestEvent.DataFase.toISOString(),
                                      )}
                                    </p>
                                  </div>
                                  {initiative.latestEvent.Responsavel && (
                                    <div>
                                      <h4 className="font-medium text-sm text-neutral-11 mb-1">
                                        Current Responsible
                                      </h4>
                                      <p className="text-neutral-12">
                                        {initiative.latestEvent.Responsavel}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {initiative.latestEvent.Observacoes && (
                                  <div>
                                    <h4 className="font-medium text-sm text-neutral-11 mb-1">
                                      Latest Observations
                                    </h4>
                                    <p className="text-neutral-12">
                                      {initiative.latestEvent.Observacoes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </>
                    );
                  })
                )}
              </Table.Body>
            </Table.Root>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiativeList;
