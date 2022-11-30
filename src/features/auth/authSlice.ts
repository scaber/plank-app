import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../api/agent'
import { RootState } from '../../app/store'
import { IUser } from '../../models/User'
import { setToken, setUser } from '../../utils/helperFunctions'
  
type AuthState = {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
}
export const register:any = createAsyncThunk(
  "auth/register",
  async ({ userName, firstName,lastName, password }:any,  thunkAPI) => {
    try {
      const response = await agent.Users.register(userName, firstName,lastName, password);
       return response.data;
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
       return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

 
export const login:any = createAsyncThunk(
  "auth/login",
  async ({ username, password }:any, thunkAPI) => {
    try {
       const data = await agent.Users.login(username, password); 
      return { user: data };
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
       return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
 
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false } as AuthState,
  reducers: {
    setCredentials:(state,action) => { 
      state.isAuthenticated = true
      state.token=action.payload.user.data.data.token
      
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      setToken('')
      setUser("");
    },

  }, 
  extraReducers: { 
    
    [login.fulfilled]: (state, action) => {
      setToken( action.payload.user.data.data.token)
      setUser( action.payload.user.data.data.user.userName)
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [register.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
    },
    [register.rejected]: (state, action) => {
      state.isAuthenticated = false;
    },
    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    }, 
  }
  
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
 