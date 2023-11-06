import "./Dock.scss";
import DockItem from "./DockItem";
import { TerminalApp } from "../../containers/apps/terminal";
import { SurfaceApp } from "../../containers/apps/surface";
import { ClockApp } from "../../containers/apps/clock";
import { SettingsApp } from "../../containers/apps/settings";
import { CameraApp } from "../../containers/apps/camera";
import { FilesApp } from "../../containers/apps/files";
import { CalculatorApp } from "../../containers/apps/calculator";
import { TextEditorApp } from "../../containers/apps/texteditor";
import { SoftwareStoreApp } from "../../containers/apps/softwarestore";
import { CalendarApp } from "../../containers/apps/calendar";
import { VSCodeApp } from "../../containers/apps/vscode";
import { useAppSelector } from "../../store/hooks";

const Dock = () => {
  const icon = useAppSelector((state) => state.appearance.iconTheme);
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const dockActive = useAppSelector((state) => state.dock.active);
  const dockHide = useAppSelector((state) => state.dock.hide);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className={`Dock ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
          dockActive && "active"
        } ${dockHide && "hide"}`}
      >
        <SurfaceApp />
        <CalendarApp />
        <SettingsApp />
        <ClockApp />
        <CameraApp />
        <FilesApp />
        <CalculatorApp />
        <TextEditorApp />
        <TerminalApp />
        <SoftwareStoreApp />
        <DockItem
          id="github"
          title="GitHub"
          icon={
            icon === "WhiteSur-icon-theme"
              ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/github-desktop.svg"
              : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"
          }
          redirectTo="https://github.com/baodaigov/BreezeOS"
        />
        <VSCodeApp />
      </div>
    </div>
  );
};

export default Dock;
