import { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { CategorySection } from './CategorySection';
import { AddWidgetModal } from './AddWidgetModal';

export const Dashboard: React.FC = () => {
  const { categories } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [layoutType, setLayoutType] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleOpenAddWidget = (event: CustomEvent) => {
      setSelectedCategoryId(event.detail.categoryId);
      setIsModalOpen(true);
    };

    const handleOpenAddWidgetFromHeader = () => {
      setSelectedCategoryId(undefined);
      setIsModalOpen(true);
    };

    const handleLayoutChange = (event: CustomEvent) => {
      setLayoutType(event.detail.layout);
    };

    const handleSearch = (event: CustomEvent) => {
      setSearchQuery(event.detail.query.toLowerCase());
    };

    window.addEventListener('openAddWidget', handleOpenAddWidget as EventListener);
    window.addEventListener('openAddWidgetFromHeader', handleOpenAddWidgetFromHeader as EventListener);
    window.addEventListener('layoutChange', handleLayoutChange as EventListener);
    window.addEventListener('dashboardSearch', handleSearch as EventListener);
    
    return () => {
      window.removeEventListener('openAddWidget', handleOpenAddWidget as EventListener);
      window.removeEventListener('openAddWidgetFromHeader', handleOpenAddWidgetFromHeader as EventListener);
      window.removeEventListener('layoutChange', handleLayoutChange as EventListener);
      window.removeEventListener('dashboardSearch', handleSearch as EventListener);
    };
  }, []);

  const filteredCategories = categories.map(category => {
    if (!searchQuery) return category;
    
    const filteredWidgets = category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery) ||
      widget.text.toLowerCase().includes(searchQuery)
    );
    
    return { ...category, widgets: filteredWidgets };
  }).filter(category => category.widgets.length > 0 || !searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                CNAPP Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Manage and customize your dashboard widgets</p>
            </div>
            {searchQuery && (
              <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                {filteredCategories.reduce((sum, cat) => sum + cat.widgets.length, 0)} results found
              </div>
            )}
          </div>
        </div>
        
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No widgets found</h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategorySection 
              key={category.id} 
              category={category} 
              layoutType={layoutType}
            />
          ))
        )}
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategoryId={selectedCategoryId}
      />
    </div>
  );
};
