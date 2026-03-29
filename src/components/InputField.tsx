interface InputFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  /** Se true, renderiza textarea */
  multiline?: boolean;
  rows?: number;
}

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: InputFieldProps) => {
  const baseClasses =
    "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-body-light text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-foreground";

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${baseClasses} resize-none`}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={baseClasses}
    />
  );
};

export default InputField;
