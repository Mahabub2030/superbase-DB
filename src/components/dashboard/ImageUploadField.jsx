import { useEffect, useRef, useState } from 'react'

function ImageUploadField({ image, onChange }) {
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    onChange(file)
  }

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null)
      return
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }

    setPreviewUrl(image)
  }, [image])

  return (
    <div className="flex items-center gap-4">
      <label className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-5 py-3 text-[13px] font-medium text-white/70 backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/6 hover:text-white active:scale-[0.97]">
        <span className="text-base leading-none transition-transform duration-300 group-hover:-translate-y-px">⤒</span>
        <span>{image ? 'Replace image' : 'Attach image'}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/2">
        {previewUrl ? (
          <img src={previewUrl} alt="Attachment preview" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[9px] uppercase tracking-wide text-white/20">Empty</span>
        )}
      </div>
    </div>
  )
}

export default ImageUploadField
