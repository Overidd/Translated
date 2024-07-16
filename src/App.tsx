import './App.css'
import { useState } from 'react';
import { CardTraduct, ListLanguage, TextToSpeech } from './components/CardTraduct';
import { useTranslate } from './hooks/useTranslate';

function App() {
   const browserLanguage = navigator.language.split('-')[0];
   const [primaryLang, setPrimaryLang] = useState(browserLanguage)
   const [secondaryLang, setSecondaryLang] = useState('en')
   const [textArea, setTextArea] = useState('')

   const { translatedlang, data, isLoadding } = useTranslate()
   const handleTranslate = () => {
      translatedlang(textArea, primaryLang, secondaryLang)
   }
   const handleSetTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextArea(e.target.value)
   }

   return (
      <div className='min-h-dvh bg-[url("/public/hero_img.jpg")] bg-no-repeat bg-cover bg-center flex items-center justify-center'>
         <main className='w-[90%] min-h-[55dvh] grid grid-cols-1 gap-4 md:grid-cols-2'>
            <CardTraduct
               headerLaguage={
                  <HeaderLanguage
                     setValue={setPrimaryLang}
                     value={primaryLang}
                  />
               }
               textArea={
                  <TextArea
                     isTranslate={true}
                     setTextArea={handleSetTextArea}
                     valueArea={textArea}
                  />
               }
               footerButtos={
                  <FooterButtos
                     textArea={textArea}
                     handleTranslate={handleTranslate}
                     isBotonTranslate={true}
                  />
               }
               valueText={textArea}
            />

            <CardTraduct
               headerLaguage={
                  <HeaderLanguage
                     setValue={setSecondaryLang}
                     value={secondaryLang}
                  />
               }
               textArea={
                  <TextArea
                     isTranslate={false}
                     valueArea={data}
                     isLoadding={isLoadding}
                  />
               }
               footerButtos={
                  <FooterButtos
                     textArea={data}
                  />
               }
               valueText={data}
            />
         </main>
      </div>
   )
}
export default App


type HeaderProp = {
   value: string;
   setValue: (value: string) => void;
}
const HeaderLanguage = ({ setValue, value }: HeaderProp) => {

   return (
      <ul className="font-medium space-x-5">
         <li className="inline-block">
            <button className="p-2 transition hover:text-[#fffc] hover:bg-colorGreySegundari rounded-xl">Detect Language</button></li>
         <li className="inline-block">
            <ListLanguage setValue={setValue} value={value} />
         </li>
      </ul>
   )
}

type TextAreaProps = {
   isTranslate: boolean;
   setTextArea?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
   valueArea: string;
   isLoadding?: boolean
}
const TextArea = ({ isTranslate, setTextArea, valueArea, isLoadding = false }: TextAreaProps) => {

   return (
      <div className="flex-1 relative">
         <textarea
            className="w-full h-full bg-transparent text-[#fffa] outline-none resize-none"
            onChange={(e) => setTextArea && setTextArea(e)}
            name=""
            id=""
            value={isTranslate ? undefined : valueArea}
         >
         </textarea>
         {
            !isTranslate && isLoadding &&
            <div className='absolute inset-0 m-auto w-fit h-fit'>
               <img
                  className="w-10 h-10 animate-spin"
                  src="/public/loader-circle.svg"
                  alt=""
               />
            </div>
         }
      </div>
   )
}

type FooterProps = {
   textArea: string;
   handleTranslate?: () => void;
   isBotonTranslate?: boolean;
}
const FooterButtos = ({ handleTranslate, textArea, isBotonTranslate }: FooterProps) => {

   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(textArea);
      } catch (err) {
         console.error('Error al copiar el texto: ');
      }
   }

   return (
      <div className="flex items-center gap-2">
         <TextToSpeech text={textArea} />
         <button
            className="border-2 border-colorGreySegundari p-2 rounded-xl active:animate-ping"
            onClick={handleCopy}
         >
            <img src="/Copy.svg" alt="" />
         </button>
         {
            isBotonTranslate && <button
               className="border bg-colorBlue rounded-xl p-2 px-3 ml-auto space-x-2 transition hover:opacity-90"
               onClick={handleTranslate}
            >

               <img className="align-middle inline-block" src="/Sort_alfa.svg" alt="" />
               <span className="align-middle">Translate</span>
            </button>
         }
      </div>
   )
}
