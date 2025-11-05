import { Search, Plus, RefreshCw, LayoutGrid, Bell, User, Home, ChevronDown, LogOut, Settings, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onAddWidgetClick: () => void;
  onRefresh: () => void;
  onLayoutChange?: (layout: 'grid' | 'list') => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddWidgetClick, onRefresh, onLayoutChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [layoutType, setLayoutType] = useState<'grid' | 'list'>('grid');
  const timeFilterRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const timeFilters = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 2 days', value: '2d' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Custom Range', value: 'custom' },
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState('2d');

  const notifications = [
    { id: 1, title: 'New widget added', message: 'Widget "Cloud Accounts" was added to CSPM Dashboard', time: '2m ago', unread: true },
    { id: 2, title: 'Security alert', message: 'Critical vulnerability detected in Image Registry', time: '15m ago', unread: true },
    { id: 3, title: 'Dashboard updated', message: 'Your dashboard layout has been saved', time: '1h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeFilterRef.current && !timeFilterRef.current.contains(event.target as Node)) {
        setTimeFilterOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(searchQuery);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, onSearch]);

  const handleLayoutToggle = () => {
    const newLayout = layoutType === 'grid' ? 'list' : 'grid';
    setLayoutType(newLayout);
    if (onLayoutChange) {
      onLayoutChange(newLayout);
    }
    const event = new CustomEvent('layoutChange', { detail: { layout: newLayout } });
    window.dispatchEvent(event);
  };

  const handleBreadcrumbClick = (path: string) => {
    if (path === 'home') {
      // Navigate to home - you can add routing logic here
      console.log('Navigate to Home');
    }
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-6 py-4 shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleBreadcrumbClick('home')}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Home</span>
          </button>
          <span className="text-gray-300">/</span>
          <button
            onClick={() => handleBreadcrumbClick('dashboard')}
            className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors"
          >
            Dashboard V2
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddWidgetClick}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Add Widget</span>
          </button>
          
          <button
            onClick={onRefresh}
            className="p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all transform hover:rotate-180 duration-500"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleLayoutToggle}
            className={`p-2.5 rounded-xl transition-all ${
              layoutType === 'grid'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
            title={`Switch to ${layoutType === 'grid' ? 'List' : 'Grid'} Layout`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-xs text-gray-600 mt-1">{unreadCount} unread</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-primary-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-1"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Time Filter Dropdown */}
          <div className="relative" ref={timeFilterRef}>
            <button
              onClick={() => setTimeFilterOpen(!timeFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer bg-white shadow-sm"
            >
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">
                {timeFilters.find(f => f.value === selectedTimeFilter)?.label || 'Last 2 days'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${timeFilterOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {timeFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="py-2">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setSelectedTimeFilter(filter.value);
                        setTimeFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        selectedTimeFilter === filter.value
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
