import GovPerfLogo from '@/components/ui/Icons/GovPerfLogo';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// TODO: Needs implementation

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <GovPerfLogo className="h-52 w-52" />
        <h1>Gov Perf</h1>
      </div>

      <nav className="w-full flex flex-row gap-5 items-center justify-center bg-neutral-1 p-4">
        <Link to="/about">About</Link>
        <Link to="/initiatives">Initiatives</Link>
        <Link to="/parliament">Parliament</Link>
        <Link to="/docs">Docs</Link>
      </nav>
    </>
  );
};

export default LandingPage;
