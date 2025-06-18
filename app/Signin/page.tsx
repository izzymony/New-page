'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Buttons from '../components/Buttons'

interface ImageProps {
  src: string
  width: number
  height: number
  position?: { x: number; y: number }
  animation?: {
    floatHeight?: number
    floatDuration?: number
  }
}

interface Slide {
  background: string
  images: ImageProps[]
  title: string
  description: string
}

export default function AnimatedHeader() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    containerRefs.current = Array(3).fill(null)
  }, [])

  const slides: Slide[] = [
    {
      background: '/image (28).svg',
      images: [
        { 
          src: '/Frame 1618869207.svg', 
          width: 145, 
          height: 41,
          position: { x: -90, y: -40 },
          animation: { floatHeight: 10, floatDuration: 4000 }
        },
        { 
          src: '/Frame 1618869205.svg', 
          width: 155, 
          height: 41,
          position: { x: -90, y: 60 },
          animation: { floatHeight: 15, floatDuration: 4500 }
        },
        { 
          src: '/Frame 1618869208 (1).svg', 
          width: 166, 
          height: 41,
          position: { x: 100, y: 10 },
          animation: { floatHeight: 8, floatDuration: 3800 }
        },
        { 
          src: '/Frame 1618869209.svg', 
          width: 152, 
          height: 41,
          position: { x: 80, y: 90 },
          animation: { floatHeight: 12, floatDuration: 4200 }
        }
      ],
      title: "Sell More. Grow Faster.",
      description: "Transform your Instagram or TikTok page into a smart storefront — with payments, delivery & growth insights all-in-one."
    },
    {
      background: '/image (29).svg',
      images: [
        { src: '/Frame 1618869215.svg', width: 145, height: 41, position: { x: 90, y: 85 } },
        { src: '/Frame 1618869216.svg', width: 155, height: 41, position: { x: -100, y: 20 } },
        { src: '/Frame 1618869214.svg', width: 166, height: 41, position: { x: 100, y: -40 } }
      ],
      title: "Shop safer, without fear.",
      description: "Discover trusted vendors with secure checkout, refund support and verified ratings"
    },
    {
      background: '/image (30).svg',
      images: [
        { src: '/Frame 1618869023.svg', width: 145, height: 41, position: { x: -80, y: -20 } },
        { src: '/Frame 1618869141.svg', width: 155, height: 41, position: { x: 95, y: 80 } }
      ],
      title: "Instant Delivery, Tracked All the Way",
      description: "Real-time delivery tracking and fast, affordable shipping — no more stress"
    }
  ]

  const animateSlide = useCallback((container: HTMLDivElement | null, index: number) => {
    if (!container) return

    const elements = Array.from(container.children) as HTMLElement[]
    const currentSlide = slides[index]
    
    const gather = () => {
      elements.forEach((el) => {
        el.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.transform = 'translate(0, 0)'
      })
    }

    const spread = () => {
      elements.forEach((el, idx) => {
        const img = currentSlide.images[idx]
        if (img.position) {
          const { x, y } = img.position
          el.style.transition = 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
          el.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    const startFloating = () => {
      elements.forEach((el, idx) => {
        const img = currentSlide.images[idx]
        const currentTransform = el.style.transform || 'translate(0, 0)'
        const floatHeight = img.animation?.floatHeight ?? 10
        const floatDuration = img.animation?.floatDuration ?? 4000
        
        el.animate([
          { transform: `${currentTransform} translateY(0px)` },
          { transform: `${currentTransform} translateY(-${floatHeight}px)` },
          { transform: `${currentTransform} translateY(0px)` }
        ], {
          duration: floatDuration,
          iterations: Infinity,
          easing: 'cubic-bezier(0.5, 0, 0.5, 1)',
          direction: 'alternate'
        })
      })
    }

    gather()
    const spreadTimeout = setTimeout(() => {
      spread()
      setTimeout(startFloating, 1800)
    }, 800)

    return () => clearTimeout(spreadTimeout)
  }, [slides])

  // Animation setup on mount and slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 8000)

    return () => {
      clearInterval(interval)
      containerRefs.current.forEach(ref => {
        if (ref) {
          const elements = Array.from(ref.children) as HTMLElement[]
          elements.forEach(el => el.getAnimations().forEach(anim => anim.cancel()))
        }
      })
    }
  }, [slides.length])

  useEffect(() => {
    if (containerRefs.current[currentSlide]) {
      animateSlide(containerRefs.current[currentSlide], currentSlide)
    }
  }, [currentSlide, animateSlide])

  // Stable ref callback
  const setContainerRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    containerRefs.current[index] = el
  }, [])

  return (
    <div className="max-w-[360px] mx-auto overflow-hidden">
      <header className="relative h-[350px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.background}
              fill
              style={{ objectFit: 'cover' }}
              alt={`Slide ${index + 1} background`}
              priority
              className="z-0"
              sizes="(max-width: 768px) 100vw, 360px"
            />
            
            <div className="absolute inset-0 pointer-events-none rounded-lg z-10"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 100px, black 250px)',
                maskImage: 'radial-gradient(circle at 50% 50%, transparent 100px, black 250px)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                filter: 'blur(30px)',
              }} 
            />

            <Image 
              src="/Logo (2).svg" 
              alt="Company Logo" 
              width={125} 
              height={36} 
              className="relative mx-auto mt-13 z-20"
              priority
            />          
            
            <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-xl pointer-events-none z-10" />

            <div
              ref={setContainerRef(index)}
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30"
            >
              {slide.images.map((img, idx) => (
                <div 
                  key={`img-${index}-${idx}`}
                  className="absolute will-change-transform"
                  style={{ transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <Image 
                    src={img.src} 
                    width={img.width} 
                    height={img.height} 
                    alt={`Slide ${index + 1} icon ${idx + 1}`}
                    priority
                    className="-mt-4"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="absolute -top-10 h-[200px] bg-white/90 backdrop-blur-xl rounded-xl -z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
          }} 
        />

        <div className="absolute bottom-0 left-0 right-0 h-23 bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-[1px] z-20" />
      </header>

      <div className="relative z-40 -mt-16 px-4">
        <div className="relative h-32 overflow-hidden mt-7">
          {slides.map((slide, index) => (
            <div
              key={`text-${index}`}
              className={`absolute w-full text-center transition-opacity duration-500 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h1 className="text-[#000000E5] text-2xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm text-[#000000E5]">{slide.description}</p>
            </div>
          ))}
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 z-40 -mt-4">
          {slides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-[14px] bg-[#FE2C55]' : 'w-[4px] bg-[#0000001A]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Buttons/>
        
        <p className="text-[#00000099] text-[12px] text-center mt-6">
          By continuing, I agree to Instashop&apos;s{' '}
          <span className="text-[#FE2C55]">Terms of <br /> use</span> and{' '}
          <span className="text-[#FE2C55]">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}