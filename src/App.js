import { useState } from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Canvas from "./components/canvas";
import ColorPicker from "./components/colorPicker";
import React from 'react';
import ImageUploading from 'react-images-uploading';

function App() {

   const [crop, setCrop] = useState()

   //states
   const [selectArea, setSelectArea] = useState(true)

   //values 
   const [text, setText] = useState("")
   const [fontSize, setFontSize] = useState(30)
   const [vertical, setVertical] = useState("top")
   const [horizontal, setHorizontal] = useState("left")
   const [images, setImages] = React.useState([]);

   const [textColor, setTextColor] = useState("white")
   const [areaColor, setAreaColor] = useState("white")


   const saveSelectedArea = () => {
      if (crop?.width && crop?.height) {
         setSelectArea(false)
      } else {

      }
   }

   const draw = (ctx, frameCount) => {
      ctx.fillStyle = areaColor;
      ctx.fillRect(crop.x, crop.y, crop.width, crop.height)
      if (text) {
         let lines = text.split("\n")
         ctx.font = `${fontSize}px Arial`;
         ctx.fillStyle = textColor;
         if (vertical === "bottom") lines.reverse()
         lines.map((a, idx) => {
            let textY;
            let textX;
            let align;
            if (vertical === "top") textY = Math.floor(crop.y - fontSize * 1 + fontSize * 1 + (idx + 1) * fontSize)

            if (vertical === "bottom") textY = Math.floor(crop.y + crop.height + fontSize * 1 - (idx + 1) * fontSize * 1.3 - 20)

            if (vertical === "center") textY = Math.floor(crop.height / 2 - lines.length * (fontSize / 1.9) + crop.y - fontSize * 1 + fontSize * 1 + (idx + 1) * fontSize)

            if (horizontal === "right") {
               textX = Math.floor(crop.width + crop.x - 10)
               align = "right"
            }
            if (horizontal === "left") {
               textX = Math.floor(crop.x + 10)
               align = "left"
            }
            if (horizontal === "center") {
               textX = Math.floor(crop.x + (crop.width / 2) - (fontSize * 1) / (fontSize * 1))
               align = "center"
            }
            ctx.textAlign = align
            ctx.fillText(a, textX, textY);
         })
      }
      ctx.fillStyle = areaColor;
      ctx.fillRect(crop.x + crop.width / 2.56, crop.height + crop.y - 20, 75, 20)
      ctx.textAlign = "center"
      ctx.font = `20px Impact`;
      ctx.fillStyle = "rgba(255, 77, 0, 0.8)";
      ctx.fillText("1ETİKET", crop.x + crop.width / 2, crop.height + crop.y - 2)
   }


   const onChangeImage = (imageList, addUpdateIndex) => {
      setImages(imageList);
      setSelectArea(true)
   };

   return (
      <div className="main-area">
         <div className="container">
            <div className="main-grid">
           
               <div className="sidebar">
                  <h2>Etiket Ayarları</h2>
                  <div className="settings">
                     <div>
                        <ImageUploading
                           value={images}
                           onChange={onChangeImage}
                           dataURLKey="data_url"
                        >
                           {({
                              onImageUpload,
                              isDragging,
                              dragProps,
                           }) => (
                              // write your building UI
                              <div className="upload__image-wrapper">
                                 <div
                                    className="setting-button"
                                    style={isDragging ? { background: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                 >
                                        <i className="fad fa-upload"></i>
<br /> Ürün Görseli Seç
                                 </div>
                              </div>
                           )}
                        </ImageUploading>
                        <div className="setting-button" onClick={() => { setSelectArea(true) }}>     <i class="fad fa-pen-square"></i>
<br /> Etiket Ayarla</div>
                        <div className="setting-button" onClick={saveSelectedArea}>             <i class="fad fa-hashtag"></i>
<br /> Kaydet</div>
                        <label>Etiket Rengi;</label>
                        <div className="setting-button" onClick={() => areaColor === "black" ? setAreaColor("white") : setAreaColor("black")}> <i class="fad fa-palette"></i></div>
                     </div>
             
                     <div>
                        {crop?.width && crop?.height ? (
                           <>
                              <div>Genişlik: {String(crop?.width * 0.026458333).slice(0, 4).split(".")[0] + "." + String(crop?.width * 0.026458333).slice(0, 4).split(".")[1].slice(0, 2)}cm</div>
                              <div>Uzunluk: {String(crop?.height * 0.026458333).split(".")[0] + "." + String(crop?.height * 0.026458333).split(".")[1].slice(0, 2)}cm</div>
                              <div>Alan: {String((crop?.height * 0.026458333) * (crop?.width * 0.026458333)).split(".")[0] + "." + String((crop?.height * 0.026458333) * (crop?.width * 0.026458333)).split(".")[1].slice(0, 2)}cm²</div></>
                        ) : null}
                     </div>
                  </div>

               </div>    <div className="main">
                  {selectArea ? (
                     <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                        <center><img className="image" src={images[0] ? images[0]['data_url'] : null}></img></center>
                     </ReactCrop>
                  ) : (
                     <div>
                        <center><Canvas draw={draw} /></center>
                        <img className="image" id="image" style={{ visibility: 'hidden' }} src={images[0]['data_url'] ? images[0]['data_url'] : null}></img>
                     </div>
                  )}
               </div>
            </div>
         </div>
<br /><br /><br /><br /><br />
 <center style={{ color: 'white' }}>
    © NoxArea Tüm Hakları Saklıdır  <div className="darkmode-ignore">😬</div>
    </center> 

      </div>
   )
}

export default App;
      