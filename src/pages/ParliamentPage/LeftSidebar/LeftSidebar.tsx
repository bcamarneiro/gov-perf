import GovPerfLogo from '@/components/ui/Icons/GovPerfLogo';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import { useAppSettingsStore } from '@store/useAppSettingsStore';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  const { leftSidebarExpanded } = useAppSettingsStore();

  return (
    <Sidebar position="left" isExpanded={leftSidebarExpanded}>
      <div
        data-testid="sidebar-header"
        className="flex flex-row items-center justify-between bg-neutral-1 border-b border-b-neutral-4 pb-2-5 font-sans"
      >
        <div
          className={
            'flex flex-row gap-1.5 h-full items-center w-full justify-base'
          }
        >
          <GovPerfLogo />
          <Link to="/" className="text-lg">
            Gov Perf
          </Link>
        </div>
      </div>
    </Sidebar>
  );
};

export default LeftSidebar;
