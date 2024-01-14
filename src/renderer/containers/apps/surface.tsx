import React, { useState, useEffect, useRef } from 'react';
import {
  setActive,
  setHide,
  setPrivate,
} from '../../store/reducers/apps/surface';
import {
  openUrl,
  closeUrl,
  setSearchEngine,
} from '../../store/reducers/surface';
import { setStartMenuActive } from '../../store/reducers/startmenu';
import { setDesktopBodyActive } from '../../store/reducers/desktopbody';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/dock/DockItem';
import './assets/surface.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import { setHeaderHide } from '../../store/reducers/header';
import SurfaceIcon from '../../../../assets/icons/surface.svg';
import SurfacePrivateIcon from '../../../../assets/icons/surface-private.svg';
import Toggle from '../../components/utils/toggle';
import ActMenu, {
  ActMenuSelector,
  ActMenuSeparator,
} from '../../components/utils/menu/index';
import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { WebviewTag } from 'electron';

export const SurfaceApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsSurface.active);
  const isHide = useAppSelector((state) => state.appsSurface.hide);
  const isPrivate = useAppSelector((state) => state.appsSurface.private);
  const dispatch = useAppDispatch();

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 49) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="surface"
      className={`SurfaceApp ${isActive && 'clicked'} ${isHide && 'hide'}`}
      title="Surface"
      icon={SurfaceIcon}
      menu={[
        [
          {
            label: t('apps.surface.newTab'),
            action: () => dispatch(setActive(true)),
          },
          {
            label: isPrivate
              ? t('apps.surface.turnPrivateOff')
              : t('apps.surface.turnPrivateOn'),
            disabled: isActive ? false : true,
            action: () =>
              isPrivate
                ? dispatch(setPrivate(false))
                : dispatch(setPrivate(true)),
          },
        ],
        [
          {
            label: isHide ? t('apps.unhide') : t('apps.hide'),
            disabled: isActive ? false : true,
            action: () =>
              isHide ? dispatch(setHide(false)) : dispatch(setHide(true)),
          },
          {
            label: isActive ? t('apps.quit') : t('apps.open'),
            action: () =>
              isActive ? dispatch(setActive(false)) : dispatch(setActive(true)),
          },
        ],
      ]}
      onClick={() =>
        isHide ? dispatch(setHide(false)) : dispatch(setActive(true))
      }
    />
  );
};

export const SurfaceStartApp = () => {
  const isHide = useAppSelector((state) => state.appsSurface.hide);
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(setStartMenuActive(false));
    dispatch(setHeaderHide(false));
    dispatch(setDesktopBodyActive(true));
    if (isHide) {
      dispatch(setHide(false));
    } else {
      dispatch(setActive(true));
    }
  }

  return (
    <StartApp
      key="surface"
      icon={SurfaceIcon}
      name="Surface"
      onClick={toggle}
    />
  );
};

export default function Surface() {
  const isActive = useAppSelector((state) => state.appsSurface.active);
  const isHide = useAppSelector((state) => state.appsSurface.hide);
  const isPrivate = useAppSelector((state) => state.appsSurface.private);
  const { t } = useTranslation();
  const webviewRef = useRef<WebviewTag>(null);
  const url = useAppSelector((state) => state.surface.url);
  const searchEngine = useAppSelector((state) => state.surface.searchEngine);
  const wifi = useAppSelector((state) => state.settings.wifi);
  const dispatch = useAppDispatch();
  const [splashScreen, setSplashScreen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [histDir, setHistDir] = useState(['', '']);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [supportOpened, setSupportOpened] = useState(false);
  const [searchEngineMenu, showSearchEngineMenu] = useState(false);
  isActive && setTimeout(() => setSplashScreen(false), 5000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) {
      dispatch(closeUrl());
    }

    webviewRef.current?.addEventListener('did-start-loading', () => {
      setIsLoading(true);
    });

    webviewRef.current?.addEventListener('did-stop-loading', () => {
      setIsLoading(false);
    });

    webviewRef.current?.addEventListener('did-navigate-in-page', (e) => {
      setSearchValue(e.url);
    });

    webviewRef.current?.addEventListener('dom-ready', () => {
      setSearchValue(webviewRef.current?.getURL()!);
    });
  }, [isActive]);

  type History = {
    title: string;
    url: string;
  }[];

  const [hist, setHist] = useState<History>([]);

  type Tabs = {
    url: string;
  }[];

  const [tabs, setTabs] = useState<Tabs>([]);

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  const action = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      var qry = searchValue;

      if (isValidURL(qry)) {
        if (!qry.startsWith('http')) {
          qry = 'https://' + qry;
        }
      } else if (qry === '') {
        qry = 'https://breezeos.github.io';
      } else {
        qry =
          searchEngine === 'Bing'
            ? `https://www.bing.com/search?q=${encodeURIComponent(qry)}`
            : searchEngine === 'Google'
            ? `https://www.google.com/search?q=${encodeURIComponent(qry)}`
            : searchEngine === 'DuckDuckGo'
            ? `https://duckduckgo.com/?q=${encodeURIComponent(qry)}`
            : searchEngine === 'Yahoo Search'
            ? `https://search.yahoo.com/search?p=${encodeURIComponent(qry)}`
            : '';
      }

      setSearchValue(qry);
      dispatch(openUrl(qry));
      setHistDir([histDir[0], qry]);
      setHist([{ title: qry, url: qry }, ...hist]);
    }
  };

  function useOutsideSearchEngineMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSearchEngineMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const searchEngineMenuRef = useRef(null);
  useOutsideSearchEngineMenu(searchEngineMenuRef);

  function useOutsideMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuOpened(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  const [min, isMin] = useState(false);

  function close() {
    dispatch(setActive(false));
    setTimeout(() => dispatch(closeUrl()), 300);
  }

  return (
    <div className="SurfaceWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window surface ${isActive && 'active'} ${
            isHide && 'hide'
          } ${min && 'minimize'}`}
        >
          <ActMenu
            style={{ zIndex: '1', top: '30px', right: '300px', width: '200px' }}
            className={menuOpened ? 'active' : ''}
            ref={menuRef}
          >
            <ActMenuSelector
              icon="fa-regular fa-clock-rotate-left"
              title="History"
              onClose={() => setMenuOpened(false)}
            />
            <ActMenuSeparator />
            <ActMenuSelector
              icon="fa-regular fa-gear"
              title="Settings"
              onClick={() => setSettingsOpened(true)}
              onClose={() => setMenuOpened(false)}
            />
          </ActMenu>
          <TopBar title="Surface" onDblClick={() => isMin(!min)}>
            <div className="TabBarWrapper">
              <div className="TabBar">
                <div
                  className="TabBarItem TabSearchItem"
                  style={{ justifyContent: 'space-between' }}
                >
                  <p>
                    {isPrivate
                      ? t('apps.surface.newPrivateTab')
                      : t('apps.surface.newTab')}
                  </p>
                  <div className="CloseButton" onClick={close}>
                    <i className="fa-regular fa-xmark" />
                  </div>
                </div>
              </div>
            </div>
            <div className="TabBar">
              <div
                className={`TabBarItem TabSearchItem ${isLoading && 'loading'}`}
                style={{ width: min ? '610px' : '700px' }}
              >
                <div className="TabBarInteraction">
                  <i
                    className="fa-regular fa-chevron-left"
                    onClick={() => webviewRef.current?.goBack()}
                  />
                  <i
                    className="fa-regular fa-chevron-right"
                    onClick={() => webviewRef.current?.goForward()}
                  />
                  <i
                    className="fa-regular fa-rotate-right"
                    onClick={() => webviewRef.current?.reload()}
                  />
                </div>
                <input
                  className={`TabSearch ${splashScreen && 'disabled'}`}
                  type="text"
                  spellCheck="false"
                  autoComplete="0"
                  placeholder={
                    searchEngine === 'Bing'
                      ? t('apps.surface.searchPlaceholder.bing')
                      : searchEngine === 'Google'
                      ? t('apps.surface.searchPlaceholder.google')
                      : searchEngine === 'DuckDuckGo'
                      ? t('apps.surface.searchPlaceholder.duckduckgo')
                      : searchEngine === 'Yahoo Search'
                      ? t('apps.surface.searchPlaceholder.yahooSearch')
                      : ''
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                  value={searchValue}
                  onKeyDown={action}
                />
              </div>
              <div className="TabBarItem TabSettingsItem">
                <div className="TabBarInteraction">
                  <i
                    className={`fa-regular fa-ellipsis ${
                      menuOpened && 'active'
                    }`}
                    onClick={() => setMenuOpened(!menuOpened)}
                  />
                </div>
                <div className="TabBarInteraction">
                  <i
                    className={`fa-regular fa-circle-question ${
                      supportOpened && 'active'
                    }`}
                    onMouseDown={() => setSupportOpened(!supportOpened)}
                  />
                </div>
              </div>
            </div>
            <div
              className="TopBarInteractionWrapper"
              style={{ display: 'flex' }}
            >
              <TopBarInteraction
                action="hide"
                onHide={() => dispatch(setHide(true))}
              />
              <TopBarInteraction
                action={min ? 'max' : 'min'}
                onMinMax={() => isMin(!min)}
              />
              <TopBarInteraction action="close" onClose={close} />
            </div>
          </TopBar>
          <WindowBody>
            <div className="Surface">
              <div className="SurfaceContentContainer">
                <div className={`Settings ${settingsOpened && 'active'}`}>
                  <div
                    style={{
                      maxWidth: '840px',
                      margin: '0 auto',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                    >
                      <div
                        className="CloseButton"
                        onClick={() => setSettingsOpened(false)}
                      >
                        <i className="fa-light fa-xmark" />
                      </div>
                    </div>
                    <div
                      style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                      }}
                    >
                      <div className="SettingsItem">
                        <p className="SettingsName">
                          {t('apps.surface.settings.privateMode')}
                        </p>
                        <Toggle
                          active={isPrivate}
                          onToggle={() => dispatch(setPrivate(!isPrivate))}
                        />
                      </div>
                      <div className="SettingsItem">
                        <p className="SettingsName">
                          {t('apps.surface.settings.searchEngine')}
                        </p>
                        <div
                          className="SettingsMenuSection"
                          onClick={() => showSearchEngineMenu(true)}
                        >
                          <p style={{ marginRight: '7px' }}>{searchEngine}</p>
                          <i className="fa-regular fa-chevron-down" />
                        </div>
                        <ActMenu
                          style={{
                            zIndex: '1',
                            width: '200px',
                            transform: 'translate(340px, 44px)',
                          }}
                          className={searchEngineMenu ? 'active' : ''}
                          ref={searchEngineMenuRef}
                        >
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Bing"
                            onClick={() => dispatch(setSearchEngine('Bing'))}
                            active={searchEngine === 'Bing'}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Google"
                            onClick={() => dispatch(setSearchEngine('Google'))}
                            active={searchEngine === 'Google'}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="DuckDuckGo"
                            onClick={() =>
                              dispatch(setSearchEngine('DuckDuckGo'))
                            }
                            active={searchEngine === 'DuckDuckGo'}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Yahoo Search"
                            onClick={() =>
                              dispatch(setSearchEngine('Yahoo Search'))
                            }
                            active={searchEngine === 'Yahoo Search'}
                          />
                        </ActMenu>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`Support ${supportOpened && 'active'}`}>
                  <div
                    style={{
                      maxWidth: '840px',
                      margin: '0 auto',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                    >
                      <div
                        className="CloseButton"
                        onClick={() => setSupportOpened(false)}
                      >
                        <i className="fa-light fa-xmark" />
                      </div>
                    </div>
                  </div>
                  {/* <iframe
                  className="SupportFrame"
                  src="https://breezeos.github.io"
                /> */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>iFrame is not available for this dialog.</p>
                  </div>
                </div>
                <webview
                  ref={webviewRef}
                  className={`iFrame ${!wifi || !url && "hide"}`}
                  src={url}
                  title={t('apps.surface.newTab')}
                  allowFullScreen={true}
                />
                {!url && (
                  <>
                    <div
                      className={`SplashScreen ${isPrivate && 'private'} ${
                        !splashScreen && 'disabled'
                      }`}
                    >
                      {isPrivate ? (
                        <img
                          className="SplashScreenIcon"
                          src={SurfacePrivateIcon}
                        />
                      ) : (
                        <img className="SplashScreenIcon" src={SurfaceIcon} />
                      )}
                    </div>
                    <div className="MainScreen">
                      <div className="Main">
                        <div className="NonCollapsibleSection">
                          <div className="SearchWrapper">
                            <p className="Text">
                              {searchEngine === 'Bing'
                                ? t('apps.surface.startupTitle.bing')
                                : searchEngine === 'Google'
                                ? t('apps.surface.startupTitle.google')
                                : searchEngine === 'DuckDuckGo'
                                ? t('apps.surface.startupTitle.duckduckgo')
                                : searchEngine === 'Yahoo Search'
                                ? t('apps.surface.startupTitle.yahooSearch')
                                : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!wifi && (
                  <div className="CantBeReached">
                    <p className="CantBeReachedText">
                      {t('apps.surface.internetUnabled')}
                    </p>
                    <div className="Description">
                      <p>{t('apps.surface.internetUnabledDesc')}</p>
                      <div className="ButtonContainer">
                        <button className="Button">
                          {t('apps.surface.internetUnabledReload')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
