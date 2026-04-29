import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ProductCarousel({ images = [], productName = '' }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Fallback: if no images provided, use a placeholder
  const displayImages = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
  ]

  useEffect(() => {
    if (!autoPlay || displayImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % displayImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [autoPlay, displayImages.length])

  const prev = () => {
    setCurrent(prev => (prev - 1 + displayImages.length) % displayImages.length)
    setAutoPlay(false)
  }

  const next = () => {
    setCurrent(prev => (prev + 1) % displayImages.length)
    setAutoPlay(false)
  }

  const goTo = (index) => {
    setCurrent(index)
    setAutoPlay(false)
  }

  if (!displayImages.length) {
    return (
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div
      className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Main image with transition */}
      <div className="relative w-full h-full overflow-hidden">
        {displayImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${productName} - view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
            decoding="async"
          />
        ))}
      </div>

      {/* Navigation arrows — visible on hover */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-brand-500 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-brand-500 hover:text-white"
          >
            <ChevronRight size={20} />
          </button>

          {/* Thumbnails at bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current
                    ? 'bg-brand-500 w-6'
                    : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductCarousel
