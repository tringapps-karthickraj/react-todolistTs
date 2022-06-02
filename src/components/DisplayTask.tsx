import React,{useState,useEffect}  from 'react';
import { Grid,Checkbox,TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteList, updateList } from '../store/reducer';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import '../assets/DisplayTask.css'; 
export default function DisplayTask() {
 
  const listArr = useAppSelector((state)=>state.web.list);
  const dispatch = useAppDispatch();
  const[task,setTask]=useState('');
  const[completeCount,setCompleteCount]=useState<number>(0);

  useEffect(() => {
    setCompleteCount(listArr.filter((ele)=>ele.completed === true).length);
  }, [listArr]);


  function changeStatus(list:any,idx:number,type:string){
    let sendList  = JSON.parse(JSON.stringify(list));
    if(type ==='isComplete'){
      sendList.completed=!sendList.completed;
    }else if(type ==='isEdit' && (!listArr.find(ele=>ele.isEdit)||sendList.isEdit===true)){
      sendList.isEdit=!sendList.isEdit;
      if(sendList.isEdit){
        setTask(sendList.task);
      }else{
        sendList.task = task;
      }
       
    }
    let sendData={
      list:sendList,
      index:idx
    }
    dispatch(updateList(sendData));
  }
  

  return (
    <div className='align'>
        <h2>TO-DO-LIST</h2>
        {
          listArr?.length === 0 && 
              <h2>No data found</h2>
        }
        {listArr?.length > 0 && listArr.map((list,index)=>{
        return <Grid key={index} container spacing={1}>
          <Grid item xs={1}>
         { !list.isEdit &&  <Checkbox  checked={list.completed} onChange={()=>changeStatus(list,index,'isComplete')}  color="success" />}
          </Grid>
          <Grid item xs={5}>
          {(!list.isEdit && 
            <div onClick={()=>changeStatus(list,index,'isComplete')}>{(!list.completed && <div>{list.task}</div>) || 
              (list.completed && 
              <div style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{list.task}</div>)}</div>)
          || (list.isEdit && <TextField required fullWidth label="Task" id="fullWidth" value={task} onChange={(event)=>setTask(event.target.value)} />)}
          </Grid>
          <Grid item xs={4}>
            <div style={{display:"flex"}}>
            { (!list.completed && !list.isEdit && <>
            <div>
              <EditIcon color="primary" onClick={()=>changeStatus(list,index,'isEdit')} />
            </div>
            <div onClick={()=>dispatch(deleteList(index))}><ClearIcon   /></div></>)||
          (!list.completed && list.isEdit && 
          <div><CheckIcon onClick={()=>changeStatus(list,index,'isEdit')} color="success" /></div>)
          }
            </div>
         
          </Grid>
          
          </Grid>
        })
        }
        <div>Done #{completeCount}</div>
    </div>
  )
}
