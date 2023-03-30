import { ChangeEvent, useState } from 'react'

export const useParser = () => {
  const [parsedData, setParsedData] = useState<string | null>(null)

  const parse = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => {
        const parsedData = event.target?.result as string
        setParsedData(parsedData)
      }
  
      reader.readAsText(file)
    }
  }

  return { parsedData, parse }
};