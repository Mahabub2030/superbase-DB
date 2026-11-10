function LoadMoreButton({ onClick }) {
  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={onClick}
        className="rounded-full border border-white/10 bg-white/3 px-7 py-2.5 text-[13px] font-medium text-white/70 backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/20 hover:bg-white hover:text-black active:scale-95"
      >
        Load more
      </button>
    </div>
  )
}

export default LoadMoreButton
