import React from 'react'
import Image from 'next/image'
const Buttons = () => {
  return (
    <div>
     
 
 
 <body className="bg-white flex items-center justify-center min-h-screen p-4">
  <div className="w-full max-w-xs space-y-3 mx-auto">
  {/* Instagram Button */}
  <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-full py-2.5 px-5 text-gray-800 text-sm">
     <Image src={'/Group 692.svg'} alt='' height={20} width={20} className='mt-0.5'  />
    <span>
      Continue with Instagram
    </span>
  </button>

  {/* TikTok Button */}
  <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-full py-2.5 px-5 text-gray-800 text-sm">
                         <Image src={'/Tik Tok (3).svg'} alt='' height={20} width={20} className='mt-0.5 mr-5'  />
    <span>
      Continue with TikTok
    </span>
  </button>

  {/* Google Button */}
  <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-full py-2.5 px-5 text-gray-800 text-sm">
    <Image src={'/Google.svg'} alt='' height={20} width={20} className='mt-0.5 mr-5'  />
    <span>
      Continue with Google
    </span>
  </button>

  {/* Email Button */}
  <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-full py-2.5 px-5 text-gray-800 text-sm">
   <Image src={'/mark_email_unread.svg'} alt='' height={20} width={20} className='mt-0.5 -ml-8'  />
    <span className='ml-4'>
      Email or Phone
    </span>
  </button>

  {/* Guest Link */}
  <p className="text-center text-black font-medium text-sm cursor-pointer select-none">
    Browse as Guest
  </p>
</div>
 </body>


    </div>
  )
}

export default Buttons
