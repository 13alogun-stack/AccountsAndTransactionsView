import PrimaryExploration from '../imports/PrimaryExploration/PrimaryExploration';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-[#f5f5f5] cursor-none">
      <CustomCursor />
      <PrimaryExploration />
    </div>
  );
}