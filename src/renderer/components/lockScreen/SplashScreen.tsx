import React, { useEffect, useRef, useState } from 'react';
import './LockScreen.scss';
import { setLocked, setSleeping } from '../../store/reducers/settings';
import {
  setEditable,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setLockScreenType,
  setOptionsMenuShown,
  setSplashScreenWrapperHideInfo,
  setWidgets,
} from '../../store/reducers/lock';
import { setTerminalWindowActive } from '../../store/reducers/terminalwindow';
import Avatar from '../Avatar';
import useCountdown from '../../hooks/useCountdown';
import { setHeaderActive, setHeaderHide } from '../../store/reducers/header';
import { setDockActive, setDockHide } from '../../store/reducers/dock';
import { pushItem, clearItem } from '../../store/reducers/shutdown';
import LogoD from '../../../../assets/images/logo-d.svg';
import ActMenu, { ActMenuSelector } from '../utils/menu/index';
import {
  setAllowSwitchWorkspace,
  setWallpaperActive,
} from '../../store/reducers/wallpaper';
import useTime from '../../hooks/useTime';
import { useTranslation } from 'react-i18next';
import { setDesktopBodyActive } from '../../store/reducers/desktopbody';
import {
  setDesktopBlackScr,
  setDesktopHideCursor,
  setDesktopPoweroff,
} from '../../store/reducers/desktop';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SplashScreenItem from './SplashScreenItem';

export default function SplashScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);
  const lock = useAppSelector((state) => state.lock);
  const optionsMenuShown = useAppSelector(
    (state) => state.lock.optionsMenuShown,
  );
  const allowSwitchWorkspace = useAppSelector(
    (state) => state.wallpaper.allowSwitchWorkspace,
  );
  const wrapperActive = useAppSelector(
    (state) => state.lock.splashScreen.wrapperActive,
  );
  const wrapperHideInfo = useAppSelector(
    (state) => state.lock.splashScreen.wrapperHideInfo,
  );
  const widgets = useAppSelector((state) => state.lock.widgets);
  const isEditable = useAppSelector((state) => state.lock.isEditable);
  const { secondsLeft, start } = useCountdown();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [invalidCount, setInvalidCount] = useState<number>(0);
  const invalidLimit = 8;
  const [fontFamilyMenu, showFontFamilyMenu] = useState<boolean>(false);
  const [fontSizeMenu, showFontSizeMenu] = useState<boolean>(false);
  const [typeMenu, showTypeMenu] = useState<boolean>(false);
  const [widgetsMenuShown, setWidgetsMenuShown] = useState<boolean>(false);
  const [addWidgetMenu, setAddWidgetMenu] = useState<boolean>(false);
  const [isShutdown, setIsShutdown] = useState<boolean>(false);
  const { timeFormat } = useTime();
  const inputFieldRef = useRef<HTMLInputElement>(null);

  function useOutsideFontFamilyMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showFontFamilyMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const fontFamilyMenuRef = useRef(null);
  useOutsideFontFamilyMenu(fontFamilyMenuRef);

  function useOutsideFontSizeMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showFontSizeMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const fontSizeMenuRef = useRef(null);
  useOutsideFontSizeMenu(fontSizeMenuRef);

  function useOutsideTypeMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showTypeMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const typeMenuRef = useRef(null);
  useOutsideTypeMenu(typeMenuRef);

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) dispatch(setOptionsMenuShown(false));
  });

  useEffect(() => {
    if (secondsLeft <= 0) {
      setInvalidCount(0);
    }
  }, [secondsLeft]);

  function login() {
    dispatch(setLocked(false));
    if (settings.user.password !== '') {
      setInvalidCount(0);
      setPasswordValue('');
      inputFieldRef.current?.blur();
    }
    if (allowSwitchWorkspace) {
      dispatch(setAllowSwitchWorkspace(false));
      dispatch(setHeaderHide(false));
      dispatch(setDockHide(false));
    }
  }

  function wrongPassword() {
    setInvalidCount((prev) => prev + 1);
    setPasswordValue('');
  }

  function action(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (passwordValue !== settings.user.password) {
        wrongPassword();
      } else {
        login();
      }
      if (invalidCount === invalidLimit - 1) start(60);
    }
  }

  function sleep() {
    setTimeout(() => dispatch(setSplashScreenWrapperHideInfo(true)), 50);

    setTimeout(() => {
      dispatch(setSleeping(true));
      dispatch(setOptionsMenuShown(false));
    }, 300);

    document.addEventListener('keypress', () => {
      setTimeout(() => {
        dispatch(setSleeping(false));
        dispatch(setSplashScreenWrapperHideInfo(false));
      }, 100);
    });
  }

  function shutdown() {
    setTimeout(() => {
      dispatch(setSplashScreenWrapperHideInfo(true));
      dispatch(setHeaderActive(false));
      dispatch(setDockActive(false));
      dispatch(setDesktopBodyActive(false));
    }, 50);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(true));
      dispatch(setOptionsMenuShown(false));
    }, 800);

    setTimeout(() => {
      dispatch(setTerminalWindowActive(true));
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
    }, 2500);

    setTimeout(
      () => dispatch(pushItem(<pre>Stopped Load/Save Random Seed... OK</pre>)),
      3000,
    );

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Session 1 of localhost... OK</pre>));
      dispatch(pushItem(<pre>Removed slice system-getty.slice... OK</pre>));
      dispatch(pushItem(<pre>Stopped Login Service... OK</pre>));
    }, 3500);

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Initializes Pacman keyring... OK</pre>));
      dispatch(pushItem(<pre>Stopping Breeze Desktop Environment...</pre>));
    }, 3600);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 4000);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setLocked(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>,
        ),
      );
    }, 4800);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setDesktopPoweroff(true));
      dispatch(setWallpaperActive(false));
    }, 13200);
  }

  function restart() {
    shutdown();

    setTimeout(() => dispatch(setDesktopPoweroff(false)), 16500);

    setTimeout(() => {
      dispatch(setDesktopBlackScr(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Reached target Startup... OK</pre>));
    }, 19000);

    setTimeout(() => {
      dispatch(pushItem(<pre>Started Startup... OK</pre>));
    }, 19700);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 20200);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setHeaderActive(false));
      dispatch(setDockActive(false));
      dispatch(setDesktopBodyActive(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>,
        ),
      );
    }, 21500);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
      dispatch(setTerminalWindowActive(false));
      dispatch(setWallpaperActive(true));
      dispatch(setLocked(true));
      dispatch(setSplashScreenWrapperHideInfo(false));
      setIsShutdown(false);
    }, 36000);
  }

  function setEditableTrue() {
    dispatch(setEditable(true));
    dispatch(setOptionsMenuShown(false));
  }

  function removeWidget(index: number) {
    const deleteWidget = widgets?.filter((_element, i) => i !== index);
    dispatch(setWidgets(deleteWidget));
  }

  useEffect(() => {
    if (isShutdown) {
      shutdown();
    }
  }, [isShutdown]);

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '30px 60px 40px 60px',
        }}
      >
        <div
          className={`SplashScreenWrapper ${wrapperActive && 'active'} ${
            wrapperHideInfo && 'hideInfo'
          }`}
        >
          <div className="SplashScreen">
            <div
              className={`SplashScreenInfo ${isEditable && 'editable'}`}
              style={{
                color: lock.foregroundColor,
              }}
              onDoubleClick={optionsMenuShown ? setEditableTrue : undefined}
            >
              <div className={lock.fontFamily}>
                <p
                  className="SplashScreenTime"
                  style={{
                    fontWeight: lock.fontWeight,
                    fontSize: lock.fontSize === 'large' ? '106px' : '96px',
                  }}
                >
                  {timeFormat}
                </p>
              </div>
              <div className="SplashScreenWidgets">
                {widgets.map((i) => (
                  <SplashScreenItem type={i} />
                ))}
              </div>
            </div>
            <div className="SignInWrapper">
              <div style={{ marginBottom: '30px' }}>
                <div className={`SignInInfo ${optionsMenuShown && 'expand'}`}>
                  <Avatar />
                  <p className="SignInName">{settings.user.name}</p>
                </div>
              </div>
              <div
                style={{
                  position: 'relative',
                  height: '72.5px',
                  width: '550px',
                }}
              >
                <div className={`SignInItem ${optionsMenuShown && 'disabled'}`}>
                  <div className="SignIn">
                    {settings.user.password ? (
                      <>
                        {invalidCount === invalidLimit ? (
                          <p>
                            {invalidLimit} {t('lockScreen.locked')}{' '}
                            {secondsLeft}{' '}
                            {secondsLeft === 1
                              ? t('lockScreen.lockedSecond')
                              : t('lockScreen.lockedSeconds')}
                          </p>
                        ) : (
                          <>
                            <div className="SignInPassword">
                              <input
                                type={passwordShown ? 'text' : 'password'}
                                value={passwordValue}
                                placeholder={t(
                                  'lockScreen.passwordPlaceholder',
                                )}
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => setPasswordValue(e.target.value)}
                                onKeyDown={action}
                                ref={inputFieldRef}
                              />
                              {passwordValue.length !== 0 && (
                                <div
                                  className="SignInRevealAndClear"
                                  onClick={() =>
                                    passwordShown
                                      ? setPasswordShown(false)
                                      : setPasswordShown(true)
                                  }
                                >
                                  <i
                                    className={`fa-regular ${
                                      passwordShown ? 'fa-eye-slash' : 'fa-eye'
                                    }`}
                                  />
                                </div>
                              )}
                            </div>
                            <div
                              className={`LoginButton ${
                                passwordValue.length === 0 && 'disabled'
                              }`}
                              onClick={
                                passwordValue !== settings.user.password
                                  ? wrongPassword
                                  : login
                              }
                            >
                              <i className="fa-regular fa-arrow-right SplashScreenIcon" />
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="LoginButton" onClick={login}>
                        <i className="fa-regular fa-arrow-right SplashScreenIcon" />
                      </div>
                    )}
                  </div>
                  {invalidCount !== invalidLimit && (
                    <p
                      className="SignInFailedAttempts"
                      style={{ opacity: invalidCount ? '1' : '0' }}
                    >
                      {invalidCount}{' '}
                      {invalidCount > 1
                        ? t('lockScreen.incorrectPasswordPlural')
                        : t('lockScreen.incorrectPassword')}
                    </p>
                  )}
                </div>
                <div
                  className={`SignInItem ${!optionsMenuShown && 'disabled'}`}
                >
                  <div className="PowerMenu">
                    <div style={{ display: 'flex' }}>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={sleep}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-moon" />
                        </div>
                        <p className="PowerMenuName">
                          {t('lockScreen.interactions.sleep')}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={() => dispatch(setOptionsMenuShown(false))}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-lock" />
                        </div>
                        <p className="PowerMenuName">
                          {t('lockScreen.interactions.lock')}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={() => setIsShutdown(true)}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-power-off" />
                        </div>
                        <p className="PowerMenuName">
                          {t('lockScreen.interactions.shutdown')}
                        </p>
                      </div>
                      <div
                        className="PowerMenuInteractionWrapper"
                        onClick={restart}
                      >
                        <div className="PowerMenuInteraction">
                          <i className="fa-light fa-rotate-left" />
                        </div>
                        <p className="PowerMenuName">
                          {t('lockScreen.interactions.restart')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isEditable && (
            <div
              className={`OptionsButton ${optionsMenuShown && 'active'}`}
              onClick={() => dispatch(setOptionsMenuShown(!optionsMenuShown))}
            >
              <i className="fa-regular fa-ellipsis" />
            </div>
          )}
        </div>
      </div>
      <div className={`EditMenuWrapper ${isEditable && 'active'}`}>
        <div
          style={{
            position: 'relative',
            borderRadius: '18px',
            overflow: 'hidden',
          }}
        >
          <div className={`WidgetsWrapper ${widgetsMenuShown && 'active'}`}>
            <div
              style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                className="InteractionButton"
                onClick={() => setWidgetsMenuShown(false)}
              >
                <i className="fa-regular fa-chevron-left" />
              </div>
              <div
                className="InteractionButton"
                onClick={() => setAddWidgetMenu(!addWidgetMenu)}
              >
                <i
                  className="fa-regular fa-plus"
                  style={{
                    transition: 'all ease 0.2s',
                    rotate: addWidgetMenu ? '45deg' : 'none',
                  }}
                />
              </div>
            </div>
            <div className="WidgetsContainer">
              <div className={`AddWidget ${addWidgetMenu && 'active'}`}>
                <p className="Text">Add Widget</p>
                <div style={{ display: 'flex' }}>
                  <div
                    className="Button"
                    style={{
                      display: widgets.includes('battery') ? 'none' : 'block',
                    }}
                    onClick={() =>
                      dispatch(setWidgets([...widgets, 'battery']))
                    }
                  >
                    <SplashScreenItem type="battery" />
                  </div>
                  <div
                    className="Button"
                    style={{
                      display: widgets.includes('temp') ? 'none' : 'block',
                    }}
                    onClick={() => dispatch(setWidgets([...widgets, 'temp']))}
                  >
                    <SplashScreenItem type="temp" />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                {widgets.map((i, index) => (
                  <div className={`Button ${i === 'date' && 'default'}`}>
                    <div
                      className="CloseButton"
                      onClick={() => removeWidget(index)}
                    >
                      <i className="fa-regular fa-xmark" />
                    </div>
                    <SplashScreenItem type={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="EditMenu">
            <div
              style={{
                marginBottom: '15px',
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <div
                className="InteractionButton"
                onClick={() => dispatch(setEditable(false))}
              >
                <i className="fa-regular fa-xmark" />
              </div>
            </div>
            <div className="EditMenuItem" style={{ margin: 0 }}>
              <p className="EditMenuItemName">
                {t('lockScreen.editMenu.fontFamily')}
              </p>
              <div
                className="EditMenuItemSection"
                onClick={() => showFontFamilyMenu(true)}
              >
                <p style={{ marginRight: '7px' }}>{lock.fontFamily}</p>
                <i className="fa-regular fa-chevron-down" />
              </div>
              <ActMenu
                style={{
                  zIndex: '1',
                  width: '220px',
                  transform: 'translate(224px, 17px)',
                }}
                className={fontFamilyMenu ? 'active' : ''}
                ref={fontFamilyMenuRef}
              >
                {lock.style.map((i) => (
                  <ActMenuSelector
                    title={i.family}
                    onClick={() => {
                      dispatch(setFontFamily(i.family));
                      showFontFamilyMenu(false);
                    }}
                    active={lock.fontFamily === i.family}
                  />
                ))}
              </ActMenu>
            </div>
            <div className="EditMenuItem">
              <p className="EditMenuItemName">
                {t('lockScreen.editMenu.fontSize.name')}
              </p>
              <div
                className="EditMenuItemSection"
                onClick={() => showFontSizeMenu(true)}
              >
                <p style={{ marginRight: '7px' }}>{lock.fontSize}</p>
                <i className="fa-regular fa-chevron-down" />
              </div>
              <ActMenu
                style={{
                  zIndex: '1',
                  width: '220px',
                  transform: 'translate(224px, 17px)',
                }}
                className={fontSizeMenu ? 'active' : ''}
                ref={fontSizeMenuRef}
              >
                <ActMenuSelector
                  title={t('lockScreen.editMenu.fontSize.medium')}
                  onClick={() => {
                    dispatch(setFontSize('medium'));
                    showFontSizeMenu(false);
                  }}
                  active={lock.fontSize === 'medium'}
                />
                <ActMenuSelector
                  title={t('lockScreen.editMenu.fontSize.large')}
                  onClick={() => {
                    dispatch(setFontSize('large'));
                    showFontSizeMenu(false);
                  }}
                  active={lock.fontSize === 'large'}
                />
              </ActMenu>
            </div>
            <div className="EditMenuItem">
              <p className="EditMenuItemName">Type</p>
              <div
                className="EditMenuItemSection"
                onClick={() => showTypeMenu(true)}
              >
                <p style={{ marginRight: '7px', textTransform: 'capitalize' }}>
                  {lock.type}
                </p>
                <i className="fa-regular fa-chevron-down" />
              </div>
              <ActMenu
                style={{
                  zIndex: '1',
                  width: '220px',
                  transform: 'translate(224px, 17px)',
                }}
                className={typeMenu ? 'active' : ''}
                ref={typeMenuRef}
              >
                <ActMenuSelector
                  title="Default"
                  onClick={() => {
                    dispatch(setLockScreenType('default'));
                    showTypeMenu(false);
                  }}
                  active={lock.type === 'default'}
                />
                <ActMenuSelector
                  title="Transparent"
                  onClick={() => {
                    dispatch(setLockScreenType('transparent'));
                    showTypeMenu(false);
                  }}
                  active={lock.type === 'transparent'}
                />
              </ActMenu>
            </div>
            <div
              className="EditMenuItem"
              onClick={() => setWidgetsMenuShown(true)}
            >
              <p className="EditMenuItemName">
                {t('lockScreen.editMenu.widgets')}
              </p>
              <i className="fa-regular fa-chevron-right EditMenuChevron" />
            </div>
            {lock.style.map(
              (i) =>
                lock.fontFamily === i.family && (
                  <div
                    className="EditMenuItem"
                    style={{
                      justifyContent: 'space-around',
                      padding: '0 30px',
                    }}
                  >
                    {i.weight.light && (
                      <div
                        className={`FontWeightBlock ${
                          lock.fontWeight === i.weight.light && 'active'
                        } ${i.family}`}
                        style={{
                          color: lock.foregroundColor,
                        }}
                        onClick={() => dispatch(setFontWeight(i.weight.light!))}
                      >
                        <p style={{ fontWeight: i.weight.light }}>12</p>
                      </div>
                    )}
                    {i.weight.medium && (
                      <div
                        className={`FontWeightBlock ${
                          lock.fontWeight === i.weight.medium && 'active'
                        } ${i.family}`}
                        style={{
                          color: lock.foregroundColor,
                        }}
                        onClick={() =>
                          dispatch(setFontWeight(i.weight.medium!))
                        }
                      >
                        <p style={{ fontWeight: i.weight.medium }}>12</p>
                      </div>
                    )}
                    {i.weight.bold && (
                      <div
                        className={`FontWeightBlock ${
                          lock.fontWeight === i.weight.bold && 'active'
                        } ${i.family}`}
                        style={{
                          color: lock.foregroundColor,
                        }}
                        onClick={() => dispatch(setFontWeight(i.weight.bold!))}
                      >
                        <p style={{ fontWeight: i.weight.bold }}>12</p>
                      </div>
                    )}
                  </div>
                ),
            )}
            <div className="EditMenuItem" style={{ padding: '0 50px' }}>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#e2e2e2' && 'active'
                }`}
                style={{ backgroundColor: '#e2e2e2' }}
                onClick={() => dispatch(setForegroundColor('#e2e2e2'))}
              ></div>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#fef08a' && 'active'
                }`}
                style={{ backgroundColor: '#fef08a' }}
                onClick={() => dispatch(setForegroundColor('#fef08a'))}
              ></div>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#7dd3fc' && 'active'
                }`}
                style={{ backgroundColor: '#7dd3fc' }}
                onClick={() => dispatch(setForegroundColor('#7dd3fc'))}
              ></div>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#f0abfc' && 'active'
                }`}
                style={{ backgroundColor: '#f0abfc' }}
                onClick={() => dispatch(setForegroundColor('#f0abfc'))}
              ></div>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#65ea95' && 'active'
                }`}
                style={{ backgroundColor: '#65ea95' }}
                onClick={() => dispatch(setForegroundColor('#65ea95'))}
              ></div>
              <div
                className={`ColorBlock ${
                  lock.foregroundColor === '#f87171' && 'active'
                }`}
                style={{ backgroundColor: '#f87171' }}
                onClick={() => dispatch(setForegroundColor('#f87171'))}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
