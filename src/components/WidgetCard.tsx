import { X, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Widget } from '../types/dashboard';

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ widget, categoryId, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 relative group hover:border-primary-200 hover:-translate-y-1">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <button
        onClick={() => onRemove(categoryId, widget.id)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-10 shadow-md hover:shadow-lg transform hover:scale-110"
        title="Remove widget"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {widget.name}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-2.5 py-1 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 text-xs font-semibold rounded-full">
              Active
            </span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{widget.text}</p>
      
      {/* Decorative element based on widget type */}
      {widget.type === 'donut' && (
        <div className="mt-6 flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * 0.7}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">2</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
          </div>
        </div>
      )}
      {widget.type === 'bar' && (
        <div className="mt-6 space-y-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">Risk Assessment</span>
            </div>
            <TrendingUp className="w-4 h-4 text-red-500" />
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Critical
                </span>
                <span className="font-bold">9</span>
              </div>
              <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full shadow-lg" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  High
                </span>
                <span className="font-bold">150</span>
              </div>
              <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-gray-600">Monitoring active</span>
            </div>
          </div>
        </div>
      )}
      {widget.type === 'default' && (
        <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-sm font-medium">Widget Data</p>
              <p className="text-xs text-gray-500">Custom content</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
