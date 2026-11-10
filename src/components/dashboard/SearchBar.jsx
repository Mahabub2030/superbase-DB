function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">⌕</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your tasks…"
        className="w-full rounded-2xl border border-white/7 bg-white/2.5 py-3 pl-11 pr-4 text-[14px] text-white placeholder-white/30 outline-none backdrop-blur-xl transition-all duration-300 ease-out focus:border-white/20 focus:bg-white/5 focus:ring-4 focus:ring-white/5"
      />
    </div>
  )
}

export default SearchBar
