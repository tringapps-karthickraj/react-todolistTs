import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IntialState = {
    list:{
      task:string,
      completed:boolean,
      isEdit:boolean
    }[]
}
 const initialState : IntialState = {
     list: localStorage['toDoList'] ?  JSON.parse(localStorage['toDoList']).toDoListArr : [],
 }
 

export const todolist = createSlice({
  
  name: 'todolist',
  initialState,
  reducers: {
    insertList: (state:any,action:PayloadAction<any>) => {
      let json:any={
        toDoListArr:[]
      };
      if(localStorage['toDoList'] === undefined){
        localStorage['toDoList'] = JSON.stringify(json);
        console.log(localStorage['toDoList']);
      }
      json.toDoListArr = JSON.parse(localStorage['toDoList']).toDoListArr
      let payloadobject={
        task: '',
        completed: false,
        isEdit: false
      }
      payloadobject.task = action.payload
       json.toDoListArr.push(payloadobject)
       localStorage['toDoList'] = JSON.stringify(json);
        return {
          ...state,
          list: [...state.list,payloadobject] 
         
        }
     },
     updateList: (state,action)=>{
        const idx = action.payload.index;
        const copyArr = [...state.list];
        const payload = action.payload.list
        copyArr[idx] = payload;
        let json:any={
          toDoListArr:[]
        };
        json.toDoListArr = JSON.parse(localStorage['toDoList']).toDoListArr
        json.toDoListArr[idx] = action.payload.list;
        localStorage['toDoList'] = JSON.stringify(json);
       return{
         ...state, 
        list: copyArr
      }
        
      },
     deleteList:(state,action)=>{
       let localStr = JSON.parse(localStorage['toDoList']).toDoListArr;
       localStr.splice(action.payload,1);
       let json:any={
        toDoListArr:localStr
       }
       console.log(json);
       localStorage['toDoList'] = JSON.stringify(json);

      return {
        ...state,
        list: [...state.list.slice(0, action.payload),
          ...state.list.slice(action.payload + 1)] 
       
      }
     },
  },
})

export const { insertList,deleteList,updateList} = todolist.actions
export default todolist.reducer