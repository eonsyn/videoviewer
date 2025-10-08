import React from 'react'
import Head from 'next/head'

export default function Popunder() {
  return (
    <>
      <Head>
        {/* Popunder script — placed before closing </head> */}
        <script
          type="text/javascript"
          src="//compassionunsuccessful.com/e2/06/f3/e206f36431e04f268b224f7c5bbf1a29.js"
          async
        ></script>
      </Head>

      {/* Nothing visible on the page */}
      <div />
    </>
  )
}
