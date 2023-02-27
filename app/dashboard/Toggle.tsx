'use client'

interface ToggleProps {
    setIsToggled: (value: boolean) => void;
    deletePost: () => void;
}

const Toggle = ({deletePost, setIsToggled}: ToggleProps) => {
  return (
    <div onClick={() => setIsToggled(false)} className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 ">
        <div className="absolute bg-white shadow-md shadow-slate-900/40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
            <h2 className="text-sm md:text-base text-center">
                Are you sure you want to delete this post? 🥲
            </h2>
            <small className="text-red-600 text-[10px] text-center md:text-sm">
                *Pressing the delete button will permanently delete this post and all of its comments.
            </small>
            <button
            onClick={deletePost} 
            className="text-sm bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-600/90 transition duration-300 md:text-base">
                Delete
            </button>
        </div>
    </div>
  )
}

export default Toggle