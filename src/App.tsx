import { useEffect, useRef, useState } from 'react';
import { useParser } from '../hooks/useParser';
import Row from './components/Row';

function App() {
  const {parsedData, parse} = useParser()
  const [data, setData] = useState<string>()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mainBlockRef = useRef<HTMLDivElement>(null)

  const handleOpenFilePicker = () => fileInputRef.current?.click()

  const handleAddNewRow = () => {
    mainBlockRef.current?.scrollTo(0, mainBlockRef.current?.scrollHeight)

    const updateData = data?.split("\n")

    updateData?.push('NewItem, 0, NewItem, 0')

    setData(updateData?.join('\n'))
  }

  const handleAddToClipboard = () => data && navigator.clipboard.writeText(data)

  useEffect(() => {
    parsedData && setData(parsedData);
  }, [parsedData]);

  return (
    <div className='flex flex-col gap-y-4 p-4 h-screen items-center text-white bg-[#0d1017] overflow-hidden'>
      <input ref={fileInputRef} type="file" onChange={parse} hidden/>
      <div className='flex w-3/4 justify-between'>
        <button onClick={handleOpenFilePicker} className='py-2 px-4 bg-blue-400 text-xl'>Open</button>
        <div className='flex gap-4'>
          <button onClick={handleAddNewRow} className='py-2 px-4 bg-purple-400 text-xl'>New Row</button>
          <button onClick={handleAddToClipboard} className='py-2 px-4 bg-red-400 text-xl'>Copy</button>
        </div>
      </div>
      <div ref={mainBlockRef} className='w-3/4 overflow-y-scroll scrollbar-hide'>
        {data ? data.split('\n').map((item, index) => 
          item.includes(' ') && !item.includes('[') && !item.includes('#') && <Row key={item + index} data={data} order={index} mutate={setData}>{item}</Row>)
          : <p className='text-white text-center'>None.</p>}
      </div>
    </div>
  );
}

export default App
