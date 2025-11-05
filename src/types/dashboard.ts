export interface Widget {
  id: string;
  name: string;
  text: string;
  type?: 'donut' | 'bar' | 'default';
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
  availableWidgets: Widget[];
}

export interface DashboardContextType {
  categories: Category[];
  availableWidgets: Widget[];
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  addCustomWidget: (categoryId: string, name: string, text: string) => void;
  toggleWidgetInCategory: (categoryId: string, widgetId: string) => void;
  isWidgetInCategory: (categoryId: string, widgetId: string) => boolean;
}

