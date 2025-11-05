import React, { createContext, useContext, useState, useCallback } from 'react';
import { Category, Widget, DashboardContextType } from '../types/dashboard';
import dashboardData from '../data/dashboardData.json';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(dashboardData.categories);
  const [availableWidgets] = useState<Widget[]>(dashboardData.availableWidgets);

  const addWidget = useCallback((categoryId: string, widget: Widget) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          // Check if widget already exists
          const widgetExists = category.widgets.some((w) => w.id === widget.id);
          if (!widgetExists) {
            return {
              ...category,
              widgets: [...category.widgets, widget],
            };
          }
        }
        return category;
      })
    );
  }, []);

  const removeWidget = useCallback((categoryId: string, widgetId: string) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter((w) => w.id !== widgetId),
          };
        }
        return category;
      })
    );
  }, []);

  const addCustomWidget = useCallback((categoryId: string, name: string, text: string) => {
    const newWidget: Widget = {
      id: `custom-${Date.now()}`,
      name,
      text,
      type: 'default',
    };
    addWidget(categoryId, newWidget);
  }, [addWidget]);

  const toggleWidgetInCategory = useCallback(
    (categoryId: string, widgetId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return;

      const widgetExists = category.widgets.some((w) => w.id === widgetId);
      const widget = availableWidgets.find((w) => w.id === widgetId);

      if (widgetExists) {
        removeWidget(categoryId, widgetId);
      } else if (widget) {
        addWidget(categoryId, widget);
      }
    },
    [categories, availableWidgets, addWidget, removeWidget]
  );

  const isWidgetInCategory = useCallback(
    (categoryId: string, widgetId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      return category?.widgets.some((w) => w.id === widgetId) ?? false;
    },
    [categories]
  );

  return (
    <DashboardContext.Provider
      value={{
        categories,
        availableWidgets,
        addWidget,
        removeWidget,
        addCustomWidget,
        toggleWidgetInCategory,
        isWidgetInCategory,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

