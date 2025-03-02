import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

type Event = Fase & {
  EvtId: string;
  DataFase: string | Date;
};

type Initiative = {
  IniId: string;
  IniNr: string;
  IniTitulo: string;
  description: string;
  IniTipo: string;
  IniEventos: Event[];
};

type ParsedInitiative = Initiative & {
  latestEvent: Event;
  IniEventos: (Event & { DataFase: Date })[];
};

type Fase = {
  CodigoFase: string;
  Fase: string;
};

type InitiativesListMetadata = {
  total?: number;
  totalByFase?: Record<string, number>;
  fasesList?: Record<string, string>;
};

export const useInitiatives = () => {
  const fetchInitiatives = useCallback(async (): Promise<Initiative[]> => {
    const response = await fetch('/data/XVI/initiatives/1740776147080.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch initiatives: ${response.status}`);
    }

    return response.json();
  }, []);

  const { isError, isFetching, isSuccess, data, error } = useQuery({
    queryKey: ['initiatives'],
    queryFn: fetchInitiatives,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const parsedData = useMemo<ParsedInitiative[]>(() => {
    if (!data) return [];
    return data.map((initiative) => {
      return {
        ...initiative,
        latestEvent: initiative.IniEventos[initiative.IniEventos.length - 1],
        IniEventos: initiative.IniEventos.map((event) => ({
          ...event,
          DataFase: new Date(event.DataFase as string),
        })),
      };
    });
  }, [data]);

  const metadata = useMemo<InitiativesListMetadata>(() => {
    if (!parsedData.length) return {};

    const fasesList: Record<string, string> = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    parsedData.forEach((initiative) => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      initiative.IniEventos.forEach((event) => {
        if (fasesList[event.CodigoFase]) return;

        fasesList[event.CodigoFase] = event.Fase;
      });
    });

    const totalByFase = parsedData.reduce(
      (acc: Record<string, number>, initiative) => {
        const phase = initiative.latestEvent.CodigoFase;
        if (!acc[phase]) {
          acc[phase] = 0;
        }
        acc[phase]++;
        return acc;
      },
      {},
    );

    return {
      total: parsedData.length,
      totalByFase,
      fasesList,
    };
  }, [parsedData]);

  return {
    initiatives: parsedData || [],
    metadata,
    isLoading: isFetching,
    isError,
    isSuccess,
    error,
  };
};

export default useInitiatives;
