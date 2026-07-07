import 'react-native-gesture-handler';
import { ReactNode, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CalendarDays, ChartColumn, ChartLine, CirclePlus, FileText } from 'lucide-react-native';
import { SettingsMenu } from './src/components';
import { CheckInScreen, DailyScreen, MonthlyScreen, ReportScreen, WeeklyScreen } from './src/screens';
import { colors } from './src/theme';
import { useEnergyStore } from './src/store/useEnergyStore';
import { getAverage, getAdaptiveReminderTime, roundToSingle } from './src/utils/energy';

type TabIconProps = {
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

const AppTabShell = ({ children }: { children: (onOpenSettings: () => void) => ReactNode }) => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const entries = useEnergyStore((state) => state.entries);
  const preferences = useEnergyStore((state) => state.preferences);
  const toggleReminders = useEnergyStore((state) => state.toggleReminders);
  const toggleAdaptiveReminders = useEnergyStore((state) => state.toggleAdaptiveReminders);
  const toggleSuggestions = useEnergyStore((state) => state.toggleSuggestions);
  const toggleWearableIntegration = useEnergyStore((state) => state.toggleWearableIntegration);
  const resetToSampleData = useEnergyStore((state) => state.resetToSampleData);
  const clearAllEntries = useEnergyStore((state) => state.clearAllEntries);

  const average = roundToSingle(getAverage(entries)).toFixed(1);
  const recommendedTime = preferences.adaptiveReminders ? getAdaptiveReminderTime(entries) : undefined;

  return (
    <>
      {children(() => setSettingsVisible(true))}
      <SettingsMenu
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        preferences={preferences}
        entryCount={entries.length}
        average={average}
        recommendedTime={recommendedTime}
        onToggleReminders={toggleReminders}
        onToggleAdaptiveReminders={toggleAdaptiveReminders}
        onToggleSuggestions={toggleSuggestions}
        onToggleWearableIntegration={toggleWearableIntegration}
        onReset={resetToSampleData}
        onClear={clearAllEntries}
      />
    </>
  );
};

const CheckInTab = () => <AppTabShell>{(onOpenSettings) => <CheckInScreen onOpenSettings={onOpenSettings} />}</AppTabShell>;

const DailyTab = () => <AppTabShell>{(onOpenSettings) => <DailyScreen onOpenSettings={onOpenSettings} />}</AppTabShell>;

const WeeklyTab = () => <AppTabShell>{(onOpenSettings) => <WeeklyScreen onOpenSettings={onOpenSettings} />}</AppTabShell>;

const MonthlyTab = () => <AppTabShell>{(onOpenSettings) => <MonthlyScreen onOpenSettings={onOpenSettings} />}</AppTabShell>;

const ReportTab = () => <AppTabShell>{(onOpenSettings) => <ReportScreen onOpenSettings={onOpenSettings} />}</AppTabShell>;

const tabIcon = (Icon: any) => ({ color, size }: TabIconProps) => <Icon color={color} size={size} />;

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#64748B',
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 4,
            },
            tabBarStyle: {
              height: 72,
              paddingTop: 8,
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
          }}
        >
          <Tab.Screen name="Check-In" component={CheckInTab} options={{ tabBarIcon: tabIcon(CirclePlus) }} />
          <Tab.Screen name="Daily" component={DailyTab} options={{ tabBarIcon: tabIcon(CalendarDays) }} />
          <Tab.Screen name="Weekly" component={WeeklyTab} options={{ tabBarIcon: tabIcon(ChartLine) }} />
          <Tab.Screen name="Monthly" component={MonthlyTab} options={{ tabBarIcon: tabIcon(ChartColumn) }} />
          <Tab.Screen name="Report" component={ReportTab} options={{ tabBarIcon: tabIcon(FileText) }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
