import React from 'react'

function Server2({res}) {
  const p = ()=>{
    console.log(res)
  }
  return (
    <div onClick={p} className='text-wrap max-w-lvw'>
      
      {res?.list?.map((file)=>{
        return(<div>
          File Name: {file.name }
          <p>
            File Size: {file.size_formatted}
            </p>
            <button >Download </button>
            <video
            className='border border-white'
            src={file.fast_stream_url}
            poster={file.thumbnail}
            ></video>
</div>)

      })}
     
      
    </div>
  )
}

export default Server2
