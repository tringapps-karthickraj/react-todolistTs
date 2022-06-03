import React,{useState,useEffect}  from 'react';
import { Grid,Checkbox,TextField,Box, autocompleteClasses} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteList, updateList } from '../store/reducer';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
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
        <h2>THINGS TO DO:</h2>
        
        
        
        <Box sx={{ flexGrow: 1, maxWidth: 500,margin: "0 auto"}}>
        <hr></hr>
        {
          listArr?.length === 0 && 
              <div className='nodata'>Looks like you're absolutely free today</div>
        }
        <List>
        {listArr?.length > 0 && listArr.map((list,index)=>{
        return <ListItem
                  secondaryAction=
                      { (!list.completed && !list.isEdit && <>
            <IconButton>
              <EditIcon color="primary" onClick={()=>changeStatus(list,index,'isEdit')} />
              </IconButton>
              <IconButton><ClearIcon  onClick={()=>dispatch(deleteList(index))} /> </IconButton></>)||
          (!list.completed && list.isEdit && 
          <CheckIcon onClick={()=>changeStatus(list,index,'isEdit')} color="success" />)
          }
                    
                >
                  <ListItemAvatar>
                  { !list.isEdit &&  <Checkbox  checked={list.completed} onChange={()=>changeStatus(list,index,'isComplete')}  color="success" />}
                  </ListItemAvatar>
                  <ListItemText
                    primary={(!list.isEdit && 
                      <div onClick={()=>changeStatus(list,index,'isComplete')}>{(!list.completed && <div>{list.task}</div>) || 
                        (list.completed && 
                        <div style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{list.task}</div>)}</div>)
                    || (list.isEdit && <TextField required fullWidth label="Task" id="fullWidth" value={task} onChange={(event)=>setTask(event.target.value)} />)}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>

})
                }
            </List>
            <hr></hr>
            </Box>
        <div className='marginbl'>Done #{completeCount}</div>
    </div>
  )
}
