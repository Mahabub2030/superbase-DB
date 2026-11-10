function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4">
      {/* Ambient glow backdrop */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-white/4 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-[24rem] rounded-full bg-indigo-500/6 blur-[100px]" />

      <div className="relative w-full max-w-104">
        <div className="rounded-[28px] border border-white/8 bg-white/3 p-9 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="mb-9 text-center">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="text-lg">✓</span>
            </div>
            <h1 className="text-[26px] font-semibold tracking-tight text-white">{title}</h1>
            <p className="mt-2 text-[14px] text-white/40">{subtitle}</p>
          </div>

          {children}

          {footer && <div className="mt-7 text-center text-[13px] text-white/40">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
