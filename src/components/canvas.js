import React, { useRef, useEffect } from 'react'

const Canvas = props => {

   const { draw, ...rest } = props
   const canvasRef = useRef(null)

   useEffect(() => {

      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      var img = document.getElementById('image')
      canvas.width = img.clientWidth
      canvas.height = img.clientHeight
      context.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
      let frameCount = 0
      let animationFrameId

      const render = () => {
         frameCount++
         draw(context, frameCount)
         animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      return () => {
         window.cancelAnimationFrame(animationFrameId)
      }
   }, [draw])

   return <canvas className='canvas' id="canvas" ref={canvasRef} {...rest} />
}

export default Canvas