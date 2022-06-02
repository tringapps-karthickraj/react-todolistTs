import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IntialState = {
    list:string[]
}
type Payloadobj ={
    task:string,
    completed:boolean,
    isEdit:boolean
}
 const initialState : IntialState = {
     list: []
 }
 const payloadobj : Payloadobj={
    task:'',
    completed:false,
    isEdit:false
 }

export const todolist = createSlice({
  
  name: 'todolist',
  initialState,
  reducers: {
    insertList: (state:any,action:PayloadAction<any>) => {
      let json={
        toDoListArr:[]
      };
      if(localStorage['toDoList'] === undefined){
        localStorage['toDoList'] = JSON.stringify(json);
        console.log(localStorage['toDoList']);
      }
      json.toDoListArr = JSON.parse(localStorage['toDoList']).toDoListArr
      payloadobj.task = action.payload
       json.toDoListArr.push(payloadobj)
       localStorage['toDoList'] = JSON.stringify(json);
        return {
          ...state,
          list: [...state.list,payloadobj] 
         
        }
     },
     updateList: (state,action)=>{
        const idx = action.payload.index;
        const copyArr = [...state.list];
        const payload = action.payload.list
        copyArr[idx] = payload;
        let json={
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
       let json={
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
    //  editProfile:(state,action)=>{
    //     state.editProfileData = action.payload;
    //  }
  },
})

export const { insertList,deleteList,updateList} = todolist.actions
export default todolist.reducer