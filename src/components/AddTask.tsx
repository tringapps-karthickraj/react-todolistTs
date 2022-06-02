import React,{useState}  from 'react';
import {TextField,Button,Box} from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { insertList } from '../store/reducer';

export default function AddTask() {
    const[task,setTask]=useState('');
   // const dispatch = useDispatch();
    function onSubmit(event: { preventDefault: () => void; }){
      event.preventDefault();
       // dispatch(insertList(task))
        setTask('');
        
      
     }
  return (
    <div style={{display: "inline-block"}}>
       <form onSubmit={onSubmit}>
        <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField required fullWidth label="Task" id="fullWidth" value={task} onChange={(event)=>setTask(event.target.value)} />
      <div>
      <Button type="submit" variant="contained">Add Task</Button>

      </div>

    </Box>
 <div>
 
 </div>
 
 
 </form>
         
    </div>
  )
}
