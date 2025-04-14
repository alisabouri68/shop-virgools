import React from 'react'

function loading() {
  return (
    <main className='w-screen h-screen grow  bg-background flex flex-col gap-10 text-[3vw] items-center justify-center'>
    <span>در حال بار گذاری...</span>
      <h1>چند لحظه صبر نمایید.</h1>

    </main>
  )
}

export default loading