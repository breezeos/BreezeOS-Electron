import { useEffect, useState } from "react";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import "./assets/softwarestore.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import SurfaceIcon from "../../../../assets/icons/surface.svg";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
  quitApp,
} from "../../store/reducers/apps";

export default function SoftwareStore({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const { t } = useTranslation();
  const [tabLayout, setTabLayout] = useState<boolean>(true);
  const [value, setValue] = useState<string>("1");
  const [tab, setTab] = useState<string>("explorer");
  const [search, onSearch] = useState<boolean>(false);
  const [featuredApplication, setFeaturedApplication] = useState<string>("");

  function explorerTab() {
    setValue("1");
    setTab("explorer");
  }

  function installedTab() {
    setValue("2");
    setTab("installed");
  }

  function updatesTab() {
    setValue("3");
    setTab("updates");
  }

  useEffect(() => {
    const list = ["Blender", "Spotify", "Caprine"];
    const randomIndex = Math.floor(Math.random() * list.length);
    setFeaturedApplication(list[randomIndex]);
  }, []);

  function changeFeaturedApplication() {
    switch (featuredApplication) {
      case "Blender":
        return (
          <div className="Blender">
            <div className="FeaturedApplicationWrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://www.logolynx.com/images/logolynx/84/84a4ccbbcf81b63bd7268227bb5e6983.png"
                  width={140}
                  height={120}
                />
                <div className="FeaturedApplicationInfo">
                  <h1 className="font-bold" style={{ marginBottom: "10px" }}>
                    Blender
                  </h1>
                  <p className="font-normal">
                    3D modeling, animation, rendering and post-production
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Spotify":
        return (
          <div className="Spotify">
            <div className="FeaturedApplicationWrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/571e5943-4616-4654-bf99-10b3c98f8686/d98301o-426f05ca-8fe5-4636-9009-db9dd1fca1f3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU3MWU1OTQzLTQ2MTYtNDY1NC1iZjk5LTEwYjNjOThmODY4NlwvZDk4MzAxby00MjZmMDVjYS04ZmU1LTQ2MzYtOTAwOS1kYjlkZDFmY2ExZjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._SlX6x3jb9hDMoBDw92f_N0pVlwkrn-bMncfkRdFDXo"
                  width={120}
                  height={120}
                />
                <div className="FeaturedApplicationInfo">
                  <h1 className="font-bold" style={{ marginBottom: "10px" }}>
                    Spotify
                  </h1>
                  <p className="font-normal">Music for everyone.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Caprine":
        return (
          <div className="Caprine">
            <div className="FeaturedApplicationWrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://www.callmebot.com/wp-content/uploads/Logo_Messenger_NewBlurple-399x399-1.png"
                  width={120}
                  height={120}
                />
                <div className="FeaturedApplicationInfo">
                  <h1 className="font-bold" style={{ marginBottom: "10px" }}>
                    Caprine
                  </h1>
                  <p className="font-normal">
                    The best Facebook Messenger client for Linux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  function switchTab() {
    switch (tab) {
      case "explorer":
        return (
          <div className="explorer">
            <div className="FeaturedApplication">
              <h2 className="font-bold">Featured Application</h2>
              <div className="FeaturedApplicationContainer">
                {changeFeaturedApplication()}
              </div>
            </div>
            <div className="EditorChoice">
              <h2 className="font-bold">Editor's Choice</h2>
              <div className="EditorChoiceContainer">
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/blender.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Blender</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Graphics & Design</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/gimp.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">GIMP</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Graphics & Design</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/libreoffice.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">LibreOffice</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Efficient</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/inkscape.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Inkscape</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Graphics & Design</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/brave.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Brave</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Utilities</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/spotify-client.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Spotify</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Music</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="RecentReleases">
              <h2 className="font-bold">Recent Releases</h2>
              <div className="RecentReleasesContainer">
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/audacity.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Audacity</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Music</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/telegram.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Telegram</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Social Media</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/discord.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Discord</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Social Media</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src="https://www.callmebot.com/wp-content/uploads/Logo_Messenger_NewBlurple-399x399-1.png"
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Caprine</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Social Media</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Visual Studio Code</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Developer Tools</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/sublime-text.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Sublime Text</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Developer Tools</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">GitHub Desktop</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Developer Tools</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vim.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Vim</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Developer Tools</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vlc.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">VLC</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Media</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/brave.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Brave</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Utilities</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={SurfaceIcon}
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Surface</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Utilities</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/chrome.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Google Chrome</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Utilities</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/opera.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Opera</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Utilities</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Thunderbird</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Efficient</p>
                    <div className="ApplicationInstallButton installed">
                      Installed
                    </div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/2048.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">2048</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Games</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://linuxkamarada.com/files/2019/12/kmahjongg.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Mahjongg</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Games</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={
                      "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/chess.svg"
                    }
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Chess</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Games</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={"https://linuxkamarada.com/files/2019/12/ksudoku.svg"}
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Sudoku</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Games</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
                <div className="Application">
                  <img
                    src={"https://linuxkamarada.com/files/2019/12/qgo.svg"}
                    alt="Application"
                    width={45}
                    height={45}
                  />
                  <div style={{ marginLeft: "15px", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="ApplicationTitle">Othello</p>
                      <div className="ApplicationRating">
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-solid fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp-half-stroke" />
                        <i className="fa-regular fa-star-sharp" />
                        <i className="fa-regular fa-star-sharp" />
                      </div>
                    </div>
                    <p className="ApplicationDesc">Games</p>
                    <div className="ApplicationInstallButton">Install</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "installed":
        return (
          <div className="installed">
            <div className="InstalledAppContainer">
              <div className="Application">
                <img
                  src={SurfaceIcon}
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Surface</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Clock</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Camera</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Calculator</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Text Editor</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Calendar</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Terminal</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Thunderbird</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">GitHub Desktop</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Visual Studio Code</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
              <div className="Application">
                <img
                  src={
                    "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vim.svg"
                  }
                  alt="Application"
                  width={45}
                  height={45}
                />
                <div
                  style={{
                    marginLeft: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="ApplicationTitle">Vim</p>
                  <div className="ApplicationInstallButton">
                    <i className="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "updates":
        return (
          <div className="updates">
            <i
              className="fa-solid fa-circle-check"
              style={{ fontSize: "80px" }}
            />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h1>Up to Date</h1>
              <p className="font-normal">Last checked: Just now</p>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="SoftwareStoreWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window softwarestore ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"}`}
        >
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(hideApp(id))}
            />
            <TopBarInteraction
              action={isMinimized ? "max" : "min"}
              onMinMax={() =>
                isMinimized
                  ? dispatch(maximizeApp(id))
                  : dispatch(minimizeApp(id))
              }
              onPress={() => dispatch(enterFullScreen(id))}
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(quitApp(id))}
            />
          </TopBar>
          <WindowBody>
            <div className="SoftwareStore">
              <i
                className="fa-light fa-table-layout SoftwareTableLayout"
                onClick={() => setTabLayout(!tabLayout)}
              />
              <div className={`NavPanel ${tabLayout ? "" : "inactive"}`}>
                <div className="Category">
                  <h2 className="CategoryTitle">Categories</h2>
                  <div className="Categories">
                    <div className="CategoryItem create">
                      <i
                        className="fa-regular fa-pen-to-square fa-sm"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Create</p>
                    </div>
                    <div className="CategoryItem work">
                      <i
                        className="fa-regular fa-list-check"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Work</p>
                    </div>
                    <div className="CategoryItem play">
                      <i
                        className="fa-regular fa-gamepad-modern"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Play</p>
                    </div>
                    <div className="CategoryItem socialize">
                      <i
                        className="fa-regular fa-globe"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Socialize</p>
                    </div>
                    <div className="CategoryItem learn">
                      <i
                        className="fa-regular fa-chalkboard-user"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Learn</p>
                    </div>
                    <div className="CategoryItem develop">
                      <i
                        className="fa-regular fa-laptop-code"
                        style={{ marginRight: "7px" }}
                      />
                      <p className="font-bold">Develop</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="SoftwareContainer">
                <div className="SoftwareTab">
                  {search ? (
                    <div className="SoftwareNav">
                      <input
                        className="SoftwareSearchbar"
                        id="softwaresearch"
                        spellCheck={false}
                        placeholder="Search apps..."
                        autoFocus={true}
                      />
                      <i
                        className="fa-regular fa-xmark CloseSearchbar"
                        onClick={() => onSearch(!search)}
                      />
                    </div>
                  ) : (
                    <div className="SoftwareNav" data-value={value}>
                      <div
                        className="SoftwareNavItem explorer"
                        onClick={explorerTab}
                      >
                        <i
                          className="fa-regular fa-burst"
                          style={{ marginRight: "7px" }}
                        />
                        <p>Explorer</p>
                      </div>
                      <div
                        className="SoftwareNavItem installed"
                        onClick={installedTab}
                      >
                        <i
                          className="fa-regular fa-circle-check"
                          style={{ marginRight: "7px" }}
                        />
                        <p>Installed</p>
                      </div>
                      <div
                        className="SoftwareNavItem updates"
                        onClick={updatesTab}
                      >
                        <i
                          className="fa-regular fa-rotate"
                          style={{ marginRight: "7px" }}
                        />
                        <p>Updates</p>
                      </div>
                    </div>
                  )}
                  <i
                    className="fa-regular fa-magnifying-glass SoftwareSearch"
                    onClick={() => onSearch(!search)}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div className="Software">{switchTab()}</div>
                </div>
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
