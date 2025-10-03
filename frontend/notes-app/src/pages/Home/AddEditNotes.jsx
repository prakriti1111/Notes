import React, { useState } from 'react'
import TagInput from "../../components/Input/TagInput"
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({onClose,type,getAllNotes,noteData , showToastMessage}) => {

    
        const [title , setTitle] = useState(noteData?.title || "");
        const [content , setContent] = useState(noteData?.content || "");
        const [tags , setTags] = useState(noteData?.tags || []);
        const [error , setError] = useState(null);

        // Add  Note

        const addNewNote =  async () =>{
            try{
                const response = await axiosInstance.post("/add-note",{
                    title,
                    content,
                    tags,
                });
                if(response.data && response.data.note){
                    getAllNotes();
                    onClose();
                    showToastMessage("Note Added Successfully");
                }
            }
            catch(error){
                if(error.response && error.response.data && error.response.data.message){
                    setError(error.response.data.message);
                }
            }
        };

        const editNote = async () => {
            const noteId = noteData._id;
            try{
                const response = await axiosInstance.put("/edit-note/" + noteId,{
                    title,
                    content,
                    tags,
                });
                if(response.data && response.data.note){
                    getAllNotes();
                    onClose();
                    showToastMessage("Note Updated Successfully");
                    
                }
            }
            catch(error){
                if(error.response && error.response.data && error.response.data.message){
                    setError(error.response.data.message);
                }
            }
        }

        const handleAddNote = () => {
            if(!title){
                setError("Please enter the title");
                return;
            }
            setError("");
            if(!content ){
                setError("Please enter the content");
                return;
            }
            setError("");

            if(type==='edit'){
                editNote()
            }
            else{
                addNewNote()
            }
        }

  return (
    <>
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100' onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input 
                    type="text"
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go to Gym at 6'
                    value = {title}
                    onChange={({target})=> setTitle(target.value)}
                 />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label' >CONTENT</label>
                <textarea 
                    type="text"
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content'
                    rows={10}
                    value = {content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>
            <div className="mt-1 ">
                <label className='input-label'>TAGS</label>
                <TagInput  tags = {tags} setTags={setTags}/>
            </div>

            {error && <p className='text-red-500 text-xs pt-1'>{error}</p>}

            <button className='btn-primary font-medium mt-3 p-3'
             onClick={handleAddNote}
            >
            {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    </>
  )
}

export default AddEditNotes