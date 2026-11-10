function ErrorBanner({ message }) {
  if (!message) return null

  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-[13px] leading-relaxed text-red-200/90 backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-300">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-400/20 text-[10px] font-semibold text-red-200">
        !
      </span>
      {message}
    </div>
  )
}

export default ErrorBanner
