function FormField({ id, label, type = 'text', value, onChange, placeholder, autoComplete }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-[15px] text-white placeholder-white/25 outline-none backdrop-blur-xl transition-all duration-300 ease-out focus:border-white/25 focus:bg-white/6 focus:ring-4 focus:ring-white/6"
      />
    </div>
  )
}

export default FormField
