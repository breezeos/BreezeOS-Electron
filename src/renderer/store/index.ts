import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import appearanceReducer from './reducers/appearance';
import headerReducer from './reducers/header';
import desktopReducer from './reducers/desktop';
import desktopBodyReducer from './reducers/desktopbody';
import dockReducer from './reducers/dock';
import panelReducer from './reducers/panel';
import modalReducer from './reducers/modal';
import msgboxReducer from './reducers/msgbox';
import shutdownReducer from './reducers/shutdown';
import systemReducer from './reducers/system';
import settingsReducer from './reducers/settings';
import setupReducer from './reducers/setup';
import startMenuReducer from './reducers/startmenu';
import wifiPasswordReducer from './reducers/wifipassword';
import newWifiReducer from './reducers/newwifi';
import wallpaperReducer from './reducers/wallpaper';
import weatherReducer from "./reducers/weather";
import imgViewReducer from './reducers/imgview';
import videoViewReducer from './reducers/videoview';
import shellReducer from './reducers/shell';
import widgetReducer from './reducers/widget';
import surfaceReducer from './reducers/surface';
import timeReducer from './reducers/time';
import touchbarReducer from './reducers/touchbar';
import terminalWindowReducer from './reducers/terminalwindow';
import vscodeReducer from './reducers/vscode';
import lockReducer from './reducers/lock';
// apps
import appsSettingsReducer from './reducers/apps/settings';
import appsClockReducer from './reducers/apps/clock';
import appsSurfaceReducer from './reducers/apps/surface';
import appsCalendarReducer from './reducers/apps/calendar';
import appsCameraReducer from './reducers/apps/camera';
import appsFilesReducer from './reducers/apps/files';
import appsCalculatorReducer from './reducers/apps/calculator';
import appsTextEditorReducer from './reducers/apps/texteditor';
import appsTerminalReducer from './reducers/apps/terminal';
import appsSoftwareStoreReducer from './reducers/apps/softwarestore';
import appsVscodeReducer from './reducers/apps/vscode';

const reducers = {
  appearance: appearanceReducer,
  header: headerReducer,
  desktop: desktopReducer,
  desktopbody: desktopBodyReducer,
  dock: dockReducer,
  panel: panelReducer,
  modal: modalReducer,
  msgbox: msgboxReducer,
  shutdown: shutdownReducer,
  system: systemReducer,
  settings: settingsReducer,
  setup: setupReducer,
  startmenu: startMenuReducer,
  wifipassword: wifiPasswordReducer,
  newwifi: newWifiReducer,
  wallpaper: wallpaperReducer,
  weather: weatherReducer,
  imgview: imgViewReducer,
  videoview: videoViewReducer,
  shell: shellReducer,
  widget: widgetReducer,
  surface: surfaceReducer,
  time: timeReducer,
  touchbar: touchbarReducer,
  terminalwindow: terminalWindowReducer,
  vscode: vscodeReducer,
  lock: lockReducer,

  // apps
  appsSettings: appsSettingsReducer,
  appsClock: appsClockReducer,
  appsSurface: appsSurfaceReducer,
  appsCalendar: appsCalendarReducer,
  appsCamera: appsCameraReducer,
  appsFiles: appsFilesReducer,
  appsCalculator: appsCalculatorReducer,
  appsTextEditor: appsTextEditorReducer,
  appsTerminal: appsTerminalReducer,
  appsSoftwareStore: appsSoftwareStoreReducer,
  appsVscode: appsVscodeReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
