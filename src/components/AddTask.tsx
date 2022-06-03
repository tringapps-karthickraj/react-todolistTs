import React,{useState}  from 'react';
import {TextField,Button,Box} from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import '../assets/DisplayTask.css';
// import { useDispatch } from 'react-redux';
import { insertList } from '../store/reducer';

export default function AddTask() {
    const[task,setTask]=useState<string>('');
    const dispatch = useAppDispatch();
    function onSubmit(event: { preventDefault: () => void; }){
      event.preventDefault();
        dispatch(insertList(task))
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
      <div>
      <TextField required multiline label="Task" className='margintext' id="fullWidth" size="small" value={task} onChange={(event)=>setTask(event.target.value)} />
      
      <Button type="submit" variant="contained">Add Task</Button>

      </div>

    </Box>
 <div>
 
 </div>
 
 
 </form>
         
    </div>
  )
}
