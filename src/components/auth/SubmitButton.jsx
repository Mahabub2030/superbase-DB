function SubmitButton({ loading, label, loadingLabel = 'Please wait…' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-white px-4 py-3 text-[15px] font-medium text-black transition-all duration-300 ease-out hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black/70" />
        )}
        {loading ? loadingLabel : label}
      </span>
    </button>
  )
}

export default SubmitButton
