'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Buttons from '../components/Buttons'
export default function AnimatedHeader() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
   interface ImageProps {
       src: string;
       width: number;
       height: number;
       position?: { x: number; y: number };
       animation?: {
           floatHeight?: number;
           floatDuration?: number;
       };
   }

  const slides = [
    {
      background: '/image (28).svg',
      images: [
        { 
          src: '/Frame 1618869207.svg', 
          width: 145, 
          height: 41,
          position: { x: -90, y: -40 },  // Top-left position
          animation: {
            floatHeight: 10,
            floatDuration: 4000
          }
        },
        { 
          src: '/Frame 1618869205.svg', 
          width: 155, 
          height: 41,
          position: { x: -90, y: 60 },   // Bottom-left position
          animation: {
            floatHeight: 15,
            floatDuration: 4500
          }
        },
        { 
          src: '/Frame 1618869208 (1).svg', 
          width: 166, 
          height: 41,
          position: { x: 100, y: 10 },   // Top-right position
          animation: {
            floatHeight: 8,
            floatDuration: 3800
          }
        },
        { 
          src: '/Frame 1618869209.svg', 
          width: 152, 
          height: 41,
          position: { x: 80, y: 90 },    // Bottom-right position
          animation: {
            floatHeight: 12,
            floatDuration: 4200
          }
        }
      ],
      title: "Sell More. Grow Faster.",
      description: "Transform your Instagram or TikTok page into a smart storefront — with payments, delivery & growth insights all-in-one."
    },
    {
      background: '/image (29).svg',
      images: [
        { 
          src: '/Frame 1618869215.svg', 
          width: 145, 
          height: 41,
          position: { x: 90, y: 85 }  // Bottom-right position
        },
        { 
          src: '/Frame 1618869216.svg', 
          width: 155, 
          height: 41,
          position: { x: -100, y: 20 }  // Left-center position
        },
        { 
          src: '/Frame 1618869214.svg', 
          width: 166, 
          height: 41,
          position: { x: 100, y: -40 }   // Top-right position
        }
      ],
      title: "Shop safer, without fear.",
      description: "Discover trusted vendors with secure checkout, refund support and verified ratings"
    },
    {
      background: '/image (30).svg',
      images: [
        { 
          src: '/Frame 1618869023.svg', 
          width: 145, 
          height: 41,
          position: { x: -80, y: -20 }  // Top-left position
        },
        { 
          src: '/Frame 1618869141.svg', 
          width: 155, 
          height: 41,
          position: { x: 95, y: 80 }   // Bottom-right position
        }
      ],
      title: "Instant Delivery, Tracked All the Way",
      description: "Real-time delivery tracking and fast, affordable shipping — no more stress"
    }
  ]


  const animateSlide = (container: HTMLDivElement | null, index: number) => {
    if (!container) return

    const elements = Array.from(container.children) as HTMLElement[]
    const currentSlide = slides[index]
    
    // 1. Initial gather animation (center all images)
    const gather = () => {
      elements.forEach((el) => {
        el.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.transform = 'translate(0, 0)'
      })
    }

    // 2. Spread out to custom positions
    const spread = () => {
      elements.forEach((el, _) => {
        const img = currentSlide.images[_]
        if (img.position) {
          const { x, y } = img.position
          el.style.transition = 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
          el.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    // 3. Floating animation
    const startFloating = () => {
      elements.forEach((el, _) => {
        const img = currentSlide.images[_]
        const currentTransform = el.style.transform || 'translate(0, 0)'
const floatHeight = (img as any).animation?.floatHeight ?? 10;
const floatDuration = (img as any).animation?.floatDuration ?? 4000;
        
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

    // Animation sequence
    gather()
    const spreadTimeout = setTimeout(() => {
      spread()
      const floatTimeout = setTimeout(startFloating, 1800)
      
      return () => {
        clearTimeout(spreadTimeout)
        clearTimeout(floatTimeout)
      }
    }, 800)
  }

  useEffect(() => {
    animateSlide(containerRefs[0].current, 0)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 8000)

    return () => {
      clearInterval(interval)
      containerRefs.forEach(ref => {
        if (ref.current) {
          const elements = Array.from(ref.current.children) as HTMLElement[]
          elements.forEach(el => {
            el.getAnimations().forEach(anim => anim.cancel())
          })
        }
      })
    }
  }, [])

    useEffect(() => {
       animateSlide(containerRefs[currentSlide].current, currentSlide);
   }, [currentSlide, containerRefs]);

  return (
    <div className="max-w-[360px] mx-auto overflow-hidden">
      {/* Header with animated background */}
      <header className="relative h-[350px] w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Background Image */}
            <Image
              src={slide.background}
              layout="fill"
              objectFit="cover"
              alt="Background"
              priority
              className="z-0"
            />
            
            {/* Blurred overlay - behind images */}
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
              src={'/Logo (2).svg'} 
              alt='' 
              width={125} 
              height={36} 
              className="relative mx-auto mt-13 z-20"
            />          
            
            {/* Center border */}
            <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-xl pointer-events-none z-10" />

            {/* Animated Images - on top of blur */}
            <div
              ref={containerRefs[index]}
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30"
            >
              {slide.images.map((img, _) => (
                <div 
                  key={_}
                  className="absolute will-change-transform"
                  style={{
                    transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Image 
                    src={img.src} 
                    width={img.width} 
                    height={img.height} 
                    alt={`Icon ${_+1}`}
                    priority
                    className="-mt-4 "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute -top-10 h-[200px] bg-white/90 backdrop-blur-xl rounded-xl -z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
          }}>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-23 bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-[1px] z-20"></div> 
      </header>

      {/* Text content */}
      <div className="relative z-40 -mt-16 px-4">
        <div className="relative h-32 overflow-hidden mt-7">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full text-center transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <h1 className="text-[#000000E5] text-2xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm text-[#000000E5]">{slide.description}</p>
            </div>
          ))}
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 z-40 -mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-[14px] bg-[#FE2C55]' 
                  : 'w-[4px] bg-[#0000001A]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

       <Buttons/>
        
        
       <p className="text-[#00000099] text-[12px] text-center mt-6">
  By continuing, I agree to Instashop&apos;s <span className="text-[#FE2C55]"> Terms of <br /> use </span> and <span className="text-[#FE2C55]"> Privacy Policy</span>
</p>
      </div>
    </div>
  )
}