import { useState } from "react"


export const useTranslate = () => {
   const [valueRespose, setValueRespose] = useState({
      data: '',
      isLoadding: false,
      error: {
         message: '',
         status: 0,
      },
   })

   const translatedlang = async (text: string, primariLang: string, segundariLang: string) => {
      setValueRespose({
         data: '',
         isLoadding: true,
         error: {
            message: '',
            status: 0,
         },
      })
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${primariLang}|${segundariLang}`)

      if (!response.ok) {
         setValueRespose({
            data: '',
            isLoadding: false,
            error: {
               message: 'Error fetching data',
               status: response.status,
            }
         })

         throw new Error(`Error fetching data: ${response.status}`)
      }
      const data = await response.json();
      setValueRespose({
         data: data.responseData.translatedText,
         isLoadding: false,
         error: {
            message: '',
            status: 0,
         },
      })
   }

   return {
      translatedlang,
      ...valueRespose,
   }
}
