import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import {MdAdd} from "react-icons/md";
import Toast from '../../components/ToastMessage/Toast'
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import Addnoteimg from "../../assets/Images/addnoteimg.jpg";
import nodata from "../../assets/Images/nodata.png";

function Home() {

const [openAddEditModal, setOpenAddEditModal] = useState({
  isShown: false,
  type : "add",
  data : null,
});

const [showToastMsg , setShowToastMsg] = useState({
  isShown: false,
  message: "",
  type:"add",
});

const [allNotes , setAllNotes] = useState([]);
const [userInfo , setUserInfo] = useState(null);
const [isSearch , setIsSearch] = useState(false);

const navigate = useNavigate();



const handleEdit = (noteDetails) => {
  setOpenAddEditModal({isShown: true, data: noteDetails, type: "edit" });
};

const showToastMessage = (message,type) => {
  setShowToastMsg({
    isShown: true,
    message: message,
    type,
  });
};

const handleCloseToast = () => {
  setShowToastMsg({
    isShown: false,
    message: "",
  });
};
// Get User Info
const getUserInfo = async () =>{
  try{
     
    const response = await axiosInstance.get("/get-user");

    
    if(response.data && response.data.user){

        setUserInfo(response.data.user);
        console.log(response.data.user);
        
    }
  }
  catch(error){
    if(error.response.status == 401 ){
      localStorage.clear();
      navigate("/login");
    }
  }
};

// Get all notes

const getAllNotes = async () => {
  try{
    const response = await axiosInstance.get("/get-all-note");
    if(response.data && response.data.note){
      setAllNotes(response.data.note);
    }
  }
  catch(error){
    console.log("An unexpected error occurred. please try again ");
  }
};
// Delete Note
const deleteNode = async (data) => {
  const noteId = data._id;
  try{
      const response = await axiosInstance.delete("/delete-note/"+noteId);
      if(response.data && !response.data.error){
          getAllNotes();
          
          showToastMessage("Note Deleted Successfully" , 'delete');
        }
      }
      catch(error){
        if(error.response && error.response.data && error.response.data.message){
          console.log("An unexpected error occurred. please try again ");
        }
      }
};

// Search a Note

const onSearchNote = async (query) => {
  try{
    const response = await axiosInstance.get("/search-note",{
      params: {query} ,
     });

     if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes(response.data.notes);
     }
  }
  catch(error){
    console.log(error);
  }
};

const updateIsPinned = async (noteData) =>{
  const noteId = noteData._id;
            try{
                const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
                    isPinned : !noteData.isPinned
                });
                if(response.data && response.data.note){
                    getAllNotes();
                    
                    showToastMessage("Note Updated Successfully");
                    
                }
            }
            catch(error){
                console.log(error);
            }
}   

const handleClearSearch = () =>{
  setIsSearch(false);
  getAllNotes();
};

  useEffect(()=>{
      getAllNotes();
      getUserInfo();


  },[]);



  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>

        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8 mr-12 ml-12">
            {allNotes.map((item,index) => (
              <NoteCard key={item._id} title={item.title} 
                date={item.createdOn} 
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={()=> handleEdit(item)}
                onDelete={()=> deleteNode(item)}
                onPinNote={()=>updateIsPinned(item)}
              />
            ))}
            
        </div> : <EmptyCard imgSrc={isSearch ? nodata : Addnoteimg} message={isSearch ? `Oops! No notes found matching your search.`:  `Start creating your first note! Click the 'Add' button jot down your thoughts, ideas and reminders. Let's get started!`} />}
    </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-[var(--color-primary)] hover:bg-blue-600 absolute right-10 bottom-10' 
      onClick={()=>{
        setOpenAddEditModal({isShown: true,type: "add",data: null});
      }} >
        <MdAdd className="text-[32px] text-white" />
      </button>

      
            <Modal 
            isOpen = {openAddEditModal.isShown}
            onRequestClose = {()=>{}}
            style = {{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel = ""
            className="w-[42%] max-h-[85%] bg-white rounded-md mx-auto mt-14 p-5 "
          > <AddEditNotes 
              type = {openAddEditModal.type}
              noteData = {openAddEditModal.data}
            onClose={()=>{
              setOpenAddEditModal({isShown: false, type: "add", data : null});
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
          </Modal>
      
            <Toast 
                isShown = {showToastMsg.isShown}
                message = {showToastMsg.message}
                type = {showToastMsg.type}
                onClose={handleCloseToast}
            />

      

     
    </>
  )
}

export default Home;