'use client'

import {useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";
import {motion, AnimatePresence} from "framer-motion"
import Image from 'next/image'
export default function Home() {
  const router = useRouter();
   useEffect (() => {
    const timer = setTimeout(() => {
      router.push("/Signin")
    }, 2000)
    return () => clearTimeout(timer);
   } ,[router])
 return(
  <AnimatePresence>
    <motion.div
        className="bg-[#FE2C55] h-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
  <div className="bg-[#FE2C55] h-screen" >
    <div>
      <Image src={'/image 348.svg'} alt="" layout="fill" object-cover />
      <div className="flex flex-col-1 justify-center h-screen">
        <Image src={'/Frame 1000006975.svg'} width={192} height={35} alt="" />
     
      </div>
     
    </div>
  </div>
  </motion.div>
  </AnimatePresence>
 )
}
