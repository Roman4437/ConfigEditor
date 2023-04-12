import { useEffect, useRef, useState } from 'react';
import { useParser } from '../hooks/useParser';

import Row from './components/Row';

const ITEMS_ON_PAGE = 14

function App() {
  const { parsedData, parse } = useParser()
  const [data, setData] = useState<string>()
  const [rows, setRows] = useState<{item: string, order: number}[]>()
  const [activePage, setActivePage] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenFilePicker = () => fileInputRef.current?.click()

  const handleAddNewRow = () => {
    const updateData = data?.split("\n")
    updateData?.push('NewItem, 0, NewItem, 0')

    setData(updateData?.join('\n'))
  }

  const handleAddToClipboard = () => data && navigator.clipboard.writeText(data)

  useEffect(() => {
    parsedData && setData(parsedData);
  }, [parsedData]);

  useEffect(() => {
    const rows: {item: string, order: number}[] = []

    data?.split('\n').map((item, order) => 
      item !== '\r' && !item.includes('[') && !item.includes('#') && rows.push({ item,  order }))

    setRows(rows)

    setActivePage(Math.ceil(rows.length / ITEMS_ON_PAGE) - 1)
  }, [data])

  return (
    <div className='flex flex-col gap-y-4 p-4 h-screen items-center text-white bg-[#0d1017] overflow-hidden'>
      <input ref={fileInputRef} type="file" onChange={parse} hidden/>
      <div className='flex w-3/4 justify-between'>
        <button onClick={handleOpenFilePicker} className='py-2 px-4 hover:bg-blue-300 bg-blue-400 text-xl transition-colors ease-in-out'>Open</button>
        <div className='flex gap-4'>
          <button onClick={handleAddNewRow} className='py-2 px-4 hover:bg-purple-300 bg-purple-400 text-xl transition-colors ease-in-out'>New Row</button>
          <button onClick={handleAddToClipboard} className='py-2 px-4 hover:bg-red-300 bg-red-400 text-xl transition-colors ease-in-out'>Copy</button>
        </div>
      </div>
      <div className='w-3/4 overflow-y-scroll scrollbar-hide'>
        {data 
          ? rows?.slice(activePage * ITEMS_ON_PAGE, activePage * ITEMS_ON_PAGE + ITEMS_ON_PAGE).map(({item, order}) => 
            <Row key={crypto.randomUUID()} data={data} order={order} mutate={setData}>{item}</Row>)
          : <p className='text-white text-center'>None.</p>}
      </div>
      <div className='fixed bottom-10 flex gap-2 flex-wrap'>
        {rows && Array.from({ length: Math.ceil(rows.length / ITEMS_ON_PAGE) }, (item, page) => 
          <p onClick={() => setActivePage(page)} className={`flex cursor-pointer items-center justify-center h-6 w-6 text-xs border hover:bg-blue-400 border-white ${activePage === page && 'bg-blue-500'}`}>{page + 1}</p>)}
      </div>
    </div>
  );
}

export default App
