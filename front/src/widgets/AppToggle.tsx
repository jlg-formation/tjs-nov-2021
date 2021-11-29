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
    <label>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleCheckBox}
      />
      <span className={checked ? label.on : label.off}></span>
    </label>
  );
}

export default AppToggle;
