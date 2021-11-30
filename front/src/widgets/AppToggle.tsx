import "./AppToggle.scss";

export interface AppToggleProps {
  checked: boolean;
  label: {
    on: string;
    off: string;
  };
  action: () => void;
}

function AppToggle({ label, checked, action }: AppToggleProps) {
  const handleCheckBox = () => {
    console.log("on change");
    action();
  };
  return (
    <label className="AppToggle">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleCheckBox}
        name="theme"
      />
      <div className="wrapper" role="none">
        <div className="ergo"></div>
        <span className={checked ? label.on : label.off}></span>
      </div>
    </label>
  );
}

export default AppToggle;
