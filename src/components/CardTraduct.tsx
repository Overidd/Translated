import { useEffect, useId, useRef, useState } from "react";

export const dataLanguages: { [key: string]: string } = {
   es: 'Español',
   en: 'Ingles',
   fr: 'Francia',
   de: 'Deutsch',
   it: 'Italiano',
   ja: '日本語',
   zh: '中文',
}

export const listLanguage = [
   {
      value: "es",
      label: "Español",
   },
   {
      value: "en",
      label: "Ingles",
   },
   {
      value: "fr",
      label: "Francia",
   },
]

interface Props {
   headerLaguage: React.ReactElement;
   footerButtos: React.ReactElement;
   textArea: React.ReactElement;
   valueText: string;
}

export const CardTraduct = ({ footerButtos, headerLaguage, textArea, valueText }: Props) => {

   return (
      <section className={`bg-colorGreyTerciari w-full h-full border border-[#fff3] p-4 gap-2 rounded-2xl text-xs md:text-base flex flex-col text-[#fffa] font-medium`}>
         {headerLaguage}
         <hr className="opacity-30" />
         {textArea}
         <span className="text-sm text-colorGreySegundari ml-auto">{valueText.length}/500</span>
         {footerButtos}
      </section >
   )
}


type ListProps = {
   value: string;
   setValue: (value: string) => void;
}

export const ListLanguage = ({ setValue, value }: ListProps) => {
   const [open, setOpen] = useState(false)
   const [search, setSearch] = useState('')

   const idBase = useId();

   const searchLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
   }

   const newDataLanguage = listLanguage.filter(item => {
      return search === '' || item.label.toLowerCase().includes(search.toLowerCase())
   })

   const ref = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref]);

   const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      setOpen(false)
   }

   return (
      <div className="relative z-10" ref={ref}>
         <button
            className={`transition rounded-xl p-2 hover:text-[#fffc] hover:bg-colorGreySegundari ${open ? 'bg-colorGreySegundari text-[#fffc]' : 'transition-none'}`}
            onClick={() =>
               setOpen(!open)}
         >
            {value ? dataLanguages[value] : 'Lenguage'}
         </button>
         {open &&
            <div className="border bg-colorGreyTerciari absolute top-[120%] mx-auto p-2 rounded-xl select-none">
               <input
                  className="text-sm bg-colorGreyPrimari text-colorGreySegundari outline-none rounded-lg p-1 w-[9rem]"
                  name="search"
                  type="search"
                  placeholder="Busca un lenguage"
                  autoComplete="off"
                  onChange={(e) => searchLanguage(e)}
               />
               {
                  newDataLanguage.map((item, index) => (
                     <label htmlFor={idBase + index} key={idBase + index} className="block">
                        <input
                           className="hidden"
                           type="radio"
                           id={idBase + index}
                           name="language"
                           value={item.value}
                           checked={value === item.value}
                           onChange={e => handleOpen(e)}
                        />
                        <span className="cursor-pointer">{item.label}</span>
                     </label>
                  ))
               }
            </div>
         }
      </div>
   )
}

type TextToSpeechProps = {
   text: string;
   voice?: SpeechSynthesisVoice | undefined;
}

export const TextToSpeech = ({ text }: TextToSpeechProps) => {

   const handleSpeak = () => {
      if ('speechSynthesis' in window) {
         const utterance = new SpeechSynthesisUtterance(text);
         window.speechSynthesis.speak(utterance);
      } else {
         alert('Tu navegador no soporta la API Web Speech.');
      }
   };

   return (
      <button
         className="border-2 border-colorGreySegundari p-2 rounded-xl active:animate-ping"
         onClick={handleSpeak}
      >
         <img src="/sound_max_fill.svg" alt="" />
      </button>
   );
};