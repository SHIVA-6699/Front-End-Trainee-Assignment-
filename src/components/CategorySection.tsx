import { Plus, Sparkles } from 'lucide-react';
import { Category } from '../types/dashboard';
import { WidgetCard } from './WidgetCard';
import { useDashboard } from '../context/DashboardContext';

interface CategorySectionProps {
  category: Category;
  layoutType?: 'grid' | 'list';
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, layoutType = 'grid' }) => {
  const { removeWidget } = useDashboard();

  const handleAddWidget = () => {
    const event = new CustomEvent('openAddWidget', { detail: { categoryId: category.id } });
    window.dispatchEvent(event);
  };

  const gridCols = layoutType === 'grid' 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
    : 'grid-cols-1';

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
          {category.widgets.length} widget{category.widgets.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className={`grid ${gridCols} gap-6`}>
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={removeWidget}
          />
        ))}
        {/* Add Widget Placeholder */}
        <button
          onClick={handleAddWidget}
          className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary-400 hover:from-primary-50 hover:via-primary-50/50 hover:to-primary-100 transition-all group min-h-[240px] shadow-sm hover:shadow-lg"
        >
          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-gray-300 group-hover:border-primary-400 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-primary-600 flex items-center justify-center mb-4 transition-all shadow-md group-hover:shadow-xl transform group-hover:scale-110">
            <Plus className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <span className="text-gray-600 group-hover:text-primary-600 font-semibold text-lg">Add Widget</span>
          <span className="text-xs text-gray-400 group-hover:text-primary-500 mt-1">Click to add a new widget</span>
        </button>
      </div>
    </div>
  );
};
