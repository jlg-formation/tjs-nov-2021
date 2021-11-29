export interface AppToggleProps {
  checked: boolean;
  label: {
    on: string;
    off: string;
  };
}

function AppToggle({ label, checked }: AppToggleProps) {
  return (
    <label>
      <input type="checkbox" role="switch" />
      <span className={checked ? label.on : label.off}></span>
    </label>
  );
}

export default AppToggle;
