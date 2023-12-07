import Wallpaper from './components/Wallpaper';
import './Desktop.scss';
import TerminalWindow from './components/utils/window/TerminalDesktop';
import LockScreen from './components/lockScreen/LockScreen';
import StartMenu from './components/startMenu/StartMenu';
import Header from './components/Header';
import Dock from './components/dock/Dock';
import DesktopBody from './DesktopBody';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Snapshot from './components/Snapshot';
import Modal from './components/Modal';
import {
  setBatteryCharging,
  setBatteryLevel,
  setDataDisk,
  setGraphics,
  setHostname,
  setKernel,
  setPlatform,
  setProcessor,
  setSpaceDisk,
  setSpaceMemory,
  setTotalDisk,
  setTotalMemory,
  setUsedDisk,
  setUsedMemory,
  setVersion,
} from './store/reducers/system';
import { useBattery } from 'react-use';
import { useEffect } from 'react';
import { setTouchbarActive } from './store/reducers/touchbar';
import { setBluetoothList, setLocked } from './store/reducers/settings';
import axios from 'axios';
import { initializeData } from './store/reducers/weather';
import Setup from './components/Setup';
import si from 'systeminformation';

const Desktop = () => {
  const dispatch = useAppDispatch();
  const fontFamily = useAppSelector((state) => state.settings.fontFamily);
  const themeLight = useAppSelector((state) => state.settings.themeLight);
  const boldText = useAppSelector((state) => state.settings.boldText);
  const animationsReduced = useAppSelector(
    (state) => state.settings.animationsReduced,
  );
  const colorInverted = useAppSelector((state) => state.settings.colorInverted);
  const nightShift = useAppSelector((state) => state.desktop.nightShift);
  const hideCursor = useAppSelector((state) => state.desktop.hideCursor);
  const blackScr = useAppSelector((state) => state.desktop.blackScr);
  const poweroff = useAppSelector((state) => state.desktop.poweroff);
  const batteryState = useBattery();
  const batteryLevel = batteryState.level * 100;

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 76) {
      e.preventDefault();
      dispatch(setLocked(true));
    }
  });

  async function getHostname() {
    const hostname = await si.osInfo().then((data) => data.hostname);
    dispatch(setHostname(hostname));
  }

  async function getKernel() {
    const kernelType = await si.osInfo().then((data) => data.platform);
    const kernelVer = await si.osInfo().then((data) => data.kernel);
    const archName = await si.osInfo().then((data) => data.arch);
    dispatch(setKernel(`${kernelType} ${kernelVer} ${archName}`));
  }

  async function getSystemVersion() {
    const version = await si.osInfo().then((data) => data.release);
    dispatch(setVersion(version));
  }

  async function getPlatform() {
    const platformName = await si.osInfo().then((data) => data.platform);
    dispatch(setPlatform(platformName));
  }

  async function getProcessor() {
    const manufacturer = await si.cpu().then((data) => data.manufacturer);
    const brand = await si.cpu().then((data) => data.brand);
    dispatch(setProcessor(`${manufacturer} ${brand}`));
  }

  async function getGraphics() {
    const graphics = await si
      .graphics()
      .then((data) => data.displays.map((i) => i.model)[0]);
    dispatch(setGraphics(graphics));
  }

  async function getMemory() {
    const totalSize = (
      (await si.mem().then((data) => data.total)) / Math.pow(1024, 3)
    ).toFixed();
    const usedSize = (
      (await si.mem().then((data) => data.used)) / Math.pow(1024, 3)
    ).toFixed();
    const freeSize = (
      (await si.mem().then((data) => data.free)) / Math.pow(1024, 3)
    ).toFixed();
    dispatch(setTotalMemory(totalSize));
    dispatch(setUsedMemory(usedSize));
    dispatch(setSpaceMemory(freeSize));
  }

  async function getDisks() {
    const diskData = await si.blockDevices().then((data) => data);
    console.log(diskData);
    const totalSize = (
      (await si.fsSize().then((data) => data.map((i) => i.size)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    const usedSize = (
      (await si.fsSize().then((data) => data.map((i) => i.used)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    const freeSize = (
      (await si.fsSize().then((data) => data.map((i) => i.available)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    dispatch(setDataDisk(diskData));
    dispatch(setTotalDisk(totalSize));
    dispatch(setUsedDisk(usedSize));
    dispatch(setSpaceDisk(freeSize));
  }

  async function getBluetoothList() {
    const bluetoothDevices = await si.bluetoothDevices().then((data) => data);
    dispatch(setBluetoothList(bluetoothDevices));
  }

  async function getWifiList() {
    const wifiDevices = await si.wifiNetworks().then((data) => data);
    console.log(wifiDevices);
  }

  dispatch(setBatteryLevel(batteryLevel ? batteryLevel.toLocaleString() : '-'));

  if (batteryState.charging) {
    dispatch(setBatteryCharging(true));
  } else {
    dispatch(setBatteryCharging(false));
  }

  function isMobile() {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4),
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${pos.coords.latitude},${pos.coords.longitude}?unitGroup=metric&key=JQQKA7B32A5DBBNY28V9RC423&contentType=json`;
      axios(url).then((response) => dispatch(initializeData(response.data)));
    });
  }

  useEffect(() => {
    getHostname();
    getKernel();
    getSystemVersion();
    getPlatform();
    getMemory();
    getProcessor();
    getGraphics();
    getDisks();
    getBluetoothList();
    getWifiList()
    dispatch(setTouchbarActive(true));
    getWeatherData();
  }, []);

  return (
    <>
      {isMobile() ? (
        <div className="error OptimisticDisplay">
          <p>
            Sorry, in order to use the operating system, please switch to the
            desktop.
          </p>
          <p>
            Or use BreezeOS Mobile instead:{' '}
            <a href="https://bit.ly/breezeos-mobile">
              https://bit.ly/breezeos-mobile
            </a>
          </p>
        </div>
      ) : (
        <>
          <div
            className={`Desktop ${fontFamily} ${boldText && 'isBold'} ${
              themeLight && 'lightMode'
            } ${nightShift && 'nightShift'} ${hideCursor && 'hideCursor'} ${
              blackScr && 'blackscr'
            } ${animationsReduced && 'animdisabled'} ${
              colorInverted && 'inverted'
            } ${poweroff && 'poweroff'}`}
            onContextMenu={(e) => e.preventDefault()}
            id="Desktop"
          >
            <TerminalWindow />
            {!localStorage.getItem('setupDisabled') ? (
              <Setup />
            ) : (
              <>
                <Snapshot />
                <LockScreen />
                <StartMenu />
                <Modal />
                <Header />
                <Wallpaper />
                <DesktopBody />
                <Dock />
              </>
            )}
          </div>
          <div id="brightness"></div>
        </>
      )}
    </>
  );
};

export default Desktop;
