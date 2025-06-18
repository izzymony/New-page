'use client'

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Signin")
    }, 2000)
    return () => clearTimeout(timer);
  }, [router])

  return (
    <AnimatePresence>
      <motion.div
        key="home-page"
        className="bg-[#FE2C55] min-h-screen w-full max-w-[450px] mx-auto overflow-hidden relative"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={'/image 348.svg'} 
            alt="background" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        {/* Logo Container */}
        <div className="relative z-10 flex justify-center items-center h-screen w-full">
          <Image 
            src={'/Frame 1000006975.svg'} 
            width={192} 
            height={35} 
            alt="logo" 
            priority
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}