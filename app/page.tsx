'use client'

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { div } from "framer-motion/client";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Signin")
    }, 2000)
    return () => clearTimeout(timer);
  }, [router])

  return (
    <div className="max-w-[360px]">
    <AnimatePresence>
      <motion.div
        key="home-page"  // Added key prop
        className="bg-[#FE2C55] h-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#FE2C55] h-screen relative ">  {/* Added relative for absolute positioning */}
          <Image 
            src={'/image 348.svg'} 
            alt="background" 
            layout="fill" 
            objectFit="cover"  // Corrected prop
            priority  // Added if this is above-the-fold image
          />
          <div className="flex justify-center items-center h-screen relative z-10">  {/* Centered properly */}
            <Image 
              src={'/Frame 1000006975.svg'} 
              width={192} 
              height={35} 
              alt="logo" 
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
    </div>
  )
}