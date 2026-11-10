function DashboardHeader({ userEmail, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b border-white/6 py-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {userEmail?.[0]?.toUpperCase() ?? '?'}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">Signed in as</p>
          <p className="text-[14px] font-medium text-white/90">{userEmail}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-full border border-white/10 bg-white/3 px-5 py-2 text-[13px] font-medium text-white/70 backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/7 hover:text-white active:scale-95"
      >
        Log out
      </button>
    </header>
  )
}

export default DashboardHeader
