import { useState } from "react"

interface props {
  children: string,
  data: string,
  order: number,
  mutate: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function Row({ children, data, order, mutate }: props) {
  const [first, setFirst] = useState(children.split(',')[0].trim())
  const [second, setSecond] = useState(children.split(',')[1].trim())
  const [third, setThird] = useState(children.split(',')[2].trim())
  const [fourth, setFourth] = useState(children.split(',')[3].trim())

  const handleRemoveRow = () => {
    const updateData = data.split("\n")
    updateData.splice(order, 1)

    mutate(updateData.join('\n'))
  }

  const handleEditRow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const updateData = data.split("\n")
    updateData[order] = [first, second, third, fourth].join(', ')

    mutate(updateData.join('\n'))
  }

  return (
    <form onSubmit={handleEditRow} className="flex grow odd:bg-[#0d1017] even:bg-[#161b21]">
      <input type="text" value={first} onChange={event => setFirst(event.currentTarget.value)} className="bg-transparent w-1/4 p-2 overflow-hidden border border-[#343434] outline-none"/>
      <input type="text" value={second} onChange={event => setSecond(event.currentTarget.value)} className="bg-transparent w-1/4 p-2 overflow-hidden border border-[#343434] outline-none"/>
      <input type="text" value={third} onChange={event => setThird(event.currentTarget.value)} className="bg-transparent w-1/4 p-2 overflow-hidden border border-[#343434] outline-none"/>
      <div className="flex w-1/4 p-2 overflow-hidden justify-between items-center border border-[#343434] outline-none">
        <input type="text" value={fourth} onChange={event => setFourth(event.currentTarget.value)} className="bg-transparent outline-none"/>
        <div onClick={handleRemoveRow} className="flex justify-center items-center h-5 w-5 hover:bg-red-400 bg-red-600 text-xs border border-white cursor-pointer">&#10005;</div>
      </div>
      <button type="submit"/>
    </form>
  )
}
