import { DashboardProvider } from './context/DashboardContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  const handleAddWidgetClick = () => {
    const event = new CustomEvent('openAddWidgetFromHeader');
    window.dispatchEvent(event);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLayoutChange = (layout: 'grid' | 'list') => {
    const event = new CustomEvent('layoutChange', { detail: { layout } });
    window.dispatchEvent(event);
  };

  const handleSearch = (query: string) => {
    const event = new CustomEvent('dashboardSearch', { detail: { query } });
    window.dispatchEvent(event);
  };

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onAddWidgetClick={handleAddWidgetClick} 
          onRefresh={handleRefresh}
          onLayoutChange={handleLayoutChange}
          onSearch={handleSearch}
        />
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;
