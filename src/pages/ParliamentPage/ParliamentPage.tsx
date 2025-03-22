import { Spinner } from '@/components/Spinner';
import Button from '@/components/ui/Button/Button';
import ChevronBack from '@/components/ui/Icons/ChevronBack';
import { useParliament } from '@/services/parliament/useParliament';
import { Table } from '@radix-ui/themes';
import { useAppSettingsStore } from '@store/useAppSettingsStore';
import { useMemo, useState } from 'react';
import { FaSearch, FaUserTie } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import './ParliamentPage.css';

const ParliamentPage: React.FC = () => {
  const { parliament, metadata, isLoading, isError, error } = useParliament();
  const [filterText, setFilterText] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedParty, setSelectedParty] = useState<string>('');
  const { leftSidebarExpanded, setLeftSidebarExpanded } = useAppSettingsStore();

  // Memoize filtered MPs
  const filteredMPs = useMemo(() => {
    return parliament.Deputados.filter((mp) => {
      const matchesSearch =
        mp.DepNomeCompleto.toLowerCase().includes(filterText.toLowerCase()) ||
        mp.DepNomeParlamentar.toLowerCase().includes(filterText.toLowerCase());
      const matchesDistrict = selectedDistrict
        ? mp.DepCPDes === selectedDistrict
        : true;
      const matchesParty = selectedParty
        ? mp.DepGP[mp.DepGP.length - 1]?.gpSigla === selectedParty
        : true;
      return matchesSearch && matchesDistrict && matchesParty;
    });
  }, [parliament.Deputados, filterText, selectedDistrict, selectedParty]);

  // Get unique parties for filter
  const parties = useMemo(() => {
    const partySet = new Set<string>();
    for (const mp of parliament.Deputados) {
      const currentParty = mp.DepGP[mp.DepGP.length - 1]?.gpSigla;
      if (currentParty) {
        partySet.add(currentParty);
      }
    }
    return Array.from(partySet).sort();
  }, [parliament.Deputados]);

  // Get districts for filter
  const districts = useMemo(() => {
    return parliament.CirculosEleitorais.sort((a, b) =>
      a.cpDes.localeCompare(b.cpDes),
    );
  }, [parliament.CirculosEleitorais]);

  // Generate chart data
  const partyChartData = useMemo(() => {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEEAD',
      '#D4A5A5',
      '#9B59B6',
      '#3498DB',
      '#E67E22',
      '#2ECC71',
    ];

    return Object.entries(metadata.totalByParty).map(
      ([party, count], index) => ({
        title: party,
        value: count,
        color: colors[index % colors.length],
      }),
    );
  }, [metadata.totalByParty]);

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-bold mb-2">
            Error loading parliament data
          </h2>
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
    <div className="flex flex-row w-full h-full">
      <LeftSidebar />

      <div className="w-full flex flex-col">
        <nav className="flex flex-row gap-2 py-2-5 px-3 justify-between">
          <Button
            variant="neutral"
            onClick={() => setLeftSidebarExpanded(!leftSidebarExpanded)}
          >
            <span className={`${!leftSidebarExpanded && 'rotate-180'}`}>
              <ChevronBack />
            </span>
          </Button>

          <div className="h-[32px] grow flex flex-row items-center gap-3">
            <Link to="/parliament">Parliament</Link>
          </div>
        </nav>

        <main className="w-full h-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParliamentPage;
