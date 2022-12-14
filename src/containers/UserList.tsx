import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getFilters } from '../features/user/usersSlice';
import agent from '../api/agent';
import { useEffect, useState } from 'react';
import  DateColumn   from '../components/DateColumn';
import { TextField } from '@mui/material';
  
 const  UserList=() =>{

  // added but unused 
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFilters);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {   
    agent.Users.list().then(
      (res: any ) => {
         if(res.length>0  ){
          setUsers(res); 
        }  
      }
    );  
}, []) 

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
  setUsers([]);
  agent.Users.list(event.target.value).then( 
    (res: any ) => { 
       if(res.length>0  ){
        setUsers(res); 
      }  
      else{
        setUsers([]);

      }
    }
  );  
};
  return (
    <React.Fragment>
        
     <TextField fullWidth label="fullWidth" id="fullWidth"  onChange={handleChange}/>
     
      <Title>Users</Title>
       <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Create Date</TableCell>
            <TableCell align="right">Update Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {  users.map((row) =>  { 
            return (
              <TableRow key={row.id}>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell align="right">
                  <DateColumn date={row.createdAt} />
                </TableCell>
                <TableCell align="right">
                  <DateColumn date={row.updatedAt} />
                </TableCell>
              </TableRow>
            );
          }
           )}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
export default UserList;