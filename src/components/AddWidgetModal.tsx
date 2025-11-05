import { X, Search, Check } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategoryId?: string;
}

const CATEGORY_TABS = [
  { id: 'cspm-executive', label: 'CSPM' },
  { id: 'cwpp', label: 'CWPP' },
  { id: 'registry-scan', label: 'Image' },
  { id: 'ticket', label: 'Ticket' },
];

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  defaultCategoryId,
}) => {
  const { availableWidgets, toggleWidgetInCategory, isWidgetInCategory, addCustomWidget } = useDashboard();
  const [activeTab, setActiveTab] = useState(defaultCategoryId || 'cspm-executive');
  const [searchQuery, setSearchQuery] = useState('');
  const [customWidgetName, setCustomWidgetName] = useState('');
  const [customWidgetText, setCustomWidgetText] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    if (defaultCategoryId) {
      setActiveTab(defaultCategoryId);
    }
  }, [defaultCategoryId]);

  const filteredWidgets = useMemo(() => {
    let widgets = availableWidgets;
    
    // Filter by category if no search query
    if (!searchQuery.trim()) {
      widgets = widgets.filter((widget) => {
        return !widget.category || widget.category === activeTab;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      widgets = widgets.filter((widget) => {
        return widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          widget.text.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
    
    return widgets;
  }, [availableWidgets, searchQuery, activeTab]);

  const handleToggleWidget = (widgetId: string) => {
    toggleWidgetInCategory(activeTab, widgetId);
  };

  const handleAddCustomWidget = () => {
    if (customWidgetName.trim() && customWidgetText.trim()) {
      addCustomWidget(activeTab, customWidgetName.trim(), customWidgetText.trim());
      setCustomWidgetName('');
      setCustomWidgetText('');
      setShowCustomForm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50" onClick={onClose}>
      <div
        className="bg-white h-full w-full max-w-md shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add Widget</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Personalise your dashboard by adding the following widget
          </p>

          {/* Category Tabs */}
          <div className="flex space-x-1 border-b border-gray-200">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="p-6">
          {/* Custom Widget Form */}
          {showCustomForm ? (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Custom Widget</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Widget Name
                  </label>
                  <input
                    type="text"
                    value={customWidgetName}
                    onChange={(e) => setCustomWidgetName(e.target.value)}
                    placeholder="Enter widget name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Widget Text
                  </label>
                  <textarea
                    value={customWidgetText}
                    onChange={(e) => setCustomWidgetText(e.target.value)}
                    placeholder="Enter widget content"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddCustomWidget}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Add Widget
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomForm(false);
                      setCustomWidgetName('');
                      setCustomWidgetText('');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCustomForm(true)}
              className="w-full mb-6 px-4 py-3 bg-primary-50 text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors font-medium"
            >
              + Create Custom Widget
            </button>
          )}

          {/* Widget List */}
          <div className="space-y-2">
            {filteredWidgets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No widgets found</p>
              </div>
            ) : (
              filteredWidgets.map((widget) => {
                const isChecked = isWidgetInCategory(activeTab, widget.id);
                return (
                  <label
                    key={widget.id}
                    onClick={() => handleToggleWidget(widget.id)}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      isChecked
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isChecked
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{widget.name}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{widget.text}</p>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

