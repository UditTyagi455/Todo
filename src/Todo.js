import React,{useState,useEffect} from 'react';
import {MdDelete} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi'
import "./App.css"

const localstorageData = () =>{
    const list =localStorage.getItem("todo");
    if(list){
        return JSON.parse(list)
    }
    return [];
}

const Todo = () => {

    const [inputValue,setInputValue] =useState('');
    const [item,setItem] =useState(localstorageData());
    const [editState,setEditState] =useState(false);
    const [isEdit,setIsEdit] =useState('')

    //add the item
    const addItem = () =>{
        if(!inputValue){
            alert("fill the data...")
        }else if(inputValue && editState){
           setItem(
               item.map(ele =>{
                   if(ele.id === isEdit){
                       return {...ele,name: inputValue}
                   }
                   return ele;
                })
           )
           setEditState(false)
           setInputValue('')
        } else{
            const yourData ={
                id: new Date().getTime().toString(),
                name: inputValue
            }
            setItem([...item,yourData]);
            setInputValue('')
        }
    }
    //delete the item 
    const itemDelete = (index) =>{
        setInputValue('')
      const deleteItem =item.filter(curEle =>{
          return curEle.id !== index ;
      });
      setItem(deleteItem);
      setEditState(false)
    }

    const editMe = (ele) =>{
         const itemTodoEdit = item.find(curElem =>{
             return curElem.id === ele.id ;
         })
         setIsEdit(ele.id);
         setInputValue(itemTodoEdit.name)
         setEditState(true)
    }

    useEffect(()=>{
      localStorage.setItem("todo",JSON.stringify(item))
    },[item]);

    // useEffect(() =>{
    //     const myLocalStorageData =localStorage.getItem("todo");
    //     console.log({myLocalStorageData});
    //     if(myLocalStorageData){
    //         setItem(JSON.parse(myLocalStorageData));
    //     }
    // },[]);

    return (
        <>
         <div className="main-div">
             <div className="div2">
                 <h1>TODO LIST 📝</h1>
                 <input type="text" value={inputValue} onChange={(e) =>setInputValue(e.target.value)} alt="tododata" placeholder="✍ write the item..."/>
                 {editState ?
                 <button onClick={addItem} className="div2btn">Edit item</button> :
                 <button onClick={addItem} className="div2btn">Add item</button>
                 }
                 {item.map((curEle) =>{
                    return(
                     <div className="div3" key={curEle.id}>
                     <span>{curEle.name}</span>
                     <button className="btn1" onClick={() =>editMe(curEle)}><FiEdit/></button>
                     <button className="btn2" onClick={() =>itemDelete(curEle.id)}><MdDelete/></button>
                     </div>
                    )
                 }).reverse()}
                 <br/>
                 {item.length === 0 ?
                 "":<button onClick={() =>setItem([])} className="rmbtn">Remove All</button>
                 }
             </div>
         </div>  
        </>
    )
}

export default Todo
