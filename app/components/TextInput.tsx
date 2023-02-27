'use client'

type TextInputProps = {
    text: string;
    setText: (text: string) => void;
    setOpen : (open: boolean) => void;
}

const TextInput = ({text, setText, setOpen}: TextInputProps) => {
    

  return (
    <div  className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <form className="absolute bg-white shadow-md shadow-slate-900/40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg">
            <button type='button' onClick={() => setOpen(false)} className='absolute top-0 right-4 text-4xl text-red-600'>&times;</button>
            <legend className='text-center pb-4'>Edit Post()</legend>
            <fieldset className='flex flex-col'>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)} 
                name="content" 
                id="content"
                className='bg-slate-800 text-white rounded-lg p-4 mb-4'  
                />
                <button
                className='bg-blue-400 text-white rounded-lg py-2 px-4' 
                type='submit'>
                    Submit
                </button>
            </fieldset>
        </form>
    </div>
  )
}

export default TextInput