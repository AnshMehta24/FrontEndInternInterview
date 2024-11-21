import axios from "axios";
import  { useEffect, useState } from "react";

const Modal = ({ToggleModal, currentItem}) => {

  const [author , setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);


  const  handleFormSubmit =async (e) => {
    e.preventDefault();

    // Extract form inputs
    const { title, author, likes, comment } = e.target;

    const newTitle = title.value.trim();
    const newAuthor = author.value.trim();
    const newDate = new Date().toISOString();
    const newLikes = likes.value || 0;
    const newComments = comment.value || 0; 

    // console.log(newDate);
    
    const newPost = {
        title: newTitle,
        author: newAuthor,
        date: newDate,
        likes: Number(newLikes), 
        comments: Number(newComments), 
    };

    if (currentItem && currentItem.id) {
      // Update existing post
      await updateData(currentItem.id, newPost);
    } else {
      // Add new post
      await addDatatoTable(newPost);
    }

    ToggleModal();

};



  const addDatatoTable = async ({
    title,
    author,
    date,
    likes,
    comments,
    // id,
  }) => {
    try {
      const SendData = await axios.post("http://localhost:3000/posts", {
        title,
        comments,
        likes,
        author,
        createdAt: date,
      });

      console.log("Data Added : ", SendData);
      

    } catch (error) {
      console.log("Error is Occured while Adding Data", error);
    }

  };

  const updateData = async (id, post) => {
    try {
      const response = await axios.patch(`http://localhost:3000/posts/${id}`, post);
      console.log("Data Updated:", response.data);
    } catch (error) {
      console.error("Error occurred while updating data:", error);
    }
  };

  

  useEffect(() => {
    // console.log(currentItem)
    if (currentItem) {
      setAuthor(currentItem.author || "");
      setTitle(currentItem.title || "");
      setLikes(currentItem.likes || 0);
      setComments(currentItem.comments || 0);
    } else {
      setAuthor("");
      setTitle("");
      setLikes(0);
      setComments(0);
    }
  }, [currentItem]);
  


  return (
    <div className={`absolute  min-w-[70%] h-auto bg-zinc-200 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 p-5  overflow-y-scroll `}>
      <h1 className="text-center">Create New Post</h1>

      <button className='absolute top-0 p-2 md:p-5 lg:p-5 right-0 bg-red-500' onClick={ToggleModal}>Close</button>
      {/* Form for Adding Inputs */}
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="w-full flex flex-col "
      >
        <label htmlFor="Author">Author: </label>
        <input
          type="text"
          name="author"
          id=""
          value={author}
          onChange={(e)=> setAuthor(e.target.value)}
          placeholder="Enter Author Name"
          className="rounded-md ml-1 p-2"
          required
        />

        <br />

        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id=""
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          placeholder="Enter Title"
          className="rounded-md ml-1 p-2"
          required
        />

        <br />

        <label htmlFor="likes">Likes: </label>
        <input
          type="number"
          name="likes"
          id=""
          value={likes}
          onChange={(e)=> setLikes(e.target.value)}
          placeholder="Enter Total Likes"
          min={0}
          className="rounded-md ml-1 p-2"
          required
        />

        <br />

        <label htmlFor="comments">Comments: </label>
        <input
          type="number"
          name="comment"
          id=""
          value={comments}
          onChange={(e)=> setComments(e.target.value)}
          placeholder="Enter Total Comments"
          min={0}
          className="rounded-md ml-1 p-2"
          required
        />

        <br />

        <button type="submit" className="rounded-md p-2 mt-2 bg-violet-400">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default Modal;
