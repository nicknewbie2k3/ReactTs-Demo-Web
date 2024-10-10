import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState } from "../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux"
import Cookie from "js-cookie"
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { blue } from '@mui/material/colors';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { setListAlbum } from '../redux/dashboardReducer';
// import { Album } from '../../../models/dashboard';


interface Props { }

const HomePage = (props: Props) => {

  const fakeData = useMemo(() => [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "natus nisi omnis corporis facere molestiae rerum in",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },], [])

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

   //const [inputValue, setInputValue] = useState({albumId: -1, id: -1, title: '', url: '', thumbnailUrl: ''});
   const [formValues, setFormValues] = useState({albumId: 1, id: 1, title: '', url: '', thumbnailUrl: ''});
   const [editId, setEditId] = useState(-1);
   const [editTitle, setEditTitle] = useState("");
  //  const [editURL, setEditURL] = useState("");
  //  const [editThumbnailURL, setEditThumbnailURL] = useState("");

   //const [tempFormValues, setTempFormValues] = useState(formValues);

   const boxStyle = {color: isHover? "red" : "blue"};

  //const dispatch1 = useDispatch<ThunkDispatch<DashboardState, null, Action<string>>>();

  
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  setListAlbum(fakeData); // previously using dispatch on this rerender the page, conflict with the rendering under it and make it 
  // an infinite render loop (render fakeData into storage supposed to be in dispatch1)

  const albums = useSelector((state: AppState) => (
    state.dashboard.listAlbum
  ));  // get data into some memory called albums from redux store

  var tempTitle = "";
  // var tempURL = "";
  // var tempThumbnailURL = "";
  
  useEffect(() => {
    //console.log('albums',albums)
  
    return () => {
      
    }
  }, [albums])
  
  //console.log(albums);

  const handleLogout = useCallback((e) => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("loginSession");
    dispatch(replace(ROUTES.login))
  }, [dispatch])

  if (!localStorage.getItem("loginSession") || !localStorage.getItem("registerData"))
  {
    localStorage.removeItem("rememberMe");
    dispatch(replace(ROUTES.login));
  }

  const handleEditId = useCallback((editId: number) => {
    setEditId(editId);
  }, [])

  const handleEditTitle = useCallback((editTitle: string, editId: number) => {
    setEditId(editId);
    setEditTitle(editTitle);
  }, [])
  
  const handleEditURL = useCallback((url: string, editId: number) => {
    setEditId(editId);
    setEditTitle(url);
  }, [])

  const handleEditThumbnailURL = useCallback((thumbnailURL: string, editId: number) => {
    setEditId(editId);
    setEditTitle(thumbnailURL);
  }, [])

  // const [isActive, setIsActive] = useState("hidden");

  const saveEdit = () => {
    setEditId(-1);
    const existingEdit = fakeData.find(album => album.id === formValues.id);
    //console.log(existingEdit, formValues);
    if (existingEdit) {
      //fakeData[1].id = formValues.id;
      fakeData[0].title = tempTitle;
      //fakeData[1].url = formValues.url;
      //fakeData[1].thumbnailUrl = formValues.thumbnailUrl;
    }
    //console.log(fakeData)
    //setListAlbum(fakeData);                     //not reassigning data back to redux
    //console.log('albums',albums)
    //console.log(fakeData);
    //save info from form back to the store
  };

  const reset = useCallback((e) => {

  }, [])

  //console.log(fakeData);
  
  return <Grid container direction="row"
    justifyContent="center"
    alignItems="center"
    width={1}
    height="100vh" columns={2}>

    {  /*
      <Grid key="1">
        <small style={boxStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Id: 1</small>
        <small style={boxStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Id: 2</small>
      </Grid>
      */
      
    /*albums?.map((album, index) => {
      
      album.id !== editId ?
    <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
      {
      }
      <span>Id: <h4 style={boxStyle} id={album.id.toString()} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditId(album.id)}>{album.id}</h4></span>

    </Grid>: 
        <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
          {
            //setFormValues({ ...formValues, albumId: index, id: album.id, title: album.title, url: album.url, thumbnailUrl: album.thumbnailUrl})
            //tempTitle = formValues.title
            //render loop
}
          
          <form>
          <div>Id: <input value={album.id} /></div>
          </form>
      </Grid> })

      albums?.map((album, index) => 
      album.id !== editId ?
      <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
        {
        }
        <span>Title: <h4 style={boxStyle} id={album.id.toString()} 
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
            onClick={()=> handleEditTitle(album.title, album.id)}>{album.title}</h4></span> 
      </Grid>: 
          <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
            {
              //setFormValues({ ...formValues, albumId: index, id: album.id, title: album.title, url: album.url, thumbnailUrl: album.thumbnailUrl})
              //tempTitle = formValues.title
              //render loop
  }
            
            <form>
            <div>Title: <input id='title' value={formValues.title} onChange={(e) => 
              {setFormValues({ ...formValues, title: e.target.value})}}/> </div>
            </form>
        </Grid> )

      albums?.map((album, index) => album.id !== editId ?
    <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
      {
      }
      <span>URL: <h4 style={boxStyle} id={album.id.toString()} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditURL(album.url, album.id)}>{album.url}</h4> </span>

    </Grid>: 
        <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
          {
            //setFormValues({ ...formValues, albumId: index, id: album.id, title: album.title, url: album.url, thumbnailUrl: album.thumbnailUrl})
            //tempTitle = formValues.title
            //render loop
}
          
          <form>
          <div>URL: <input id='url' value={formValues.url} onChange={(e) => 
            {setFormValues({ ...formValues, url: e.target.value})}}/> </div>
          </form>
      </Grid> )
      
      albums?.map((album, index) => album.id !== editId ?
    <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
      {
      }
      <span>Thumbnail URL: <h4 style={boxStyle} id={album.id.toString()} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditThumbnailURL(album.thumbnailUrl, album.id)}>{album.thumbnailUrl}</h4></span>

    </Grid>: 
        <Grid key={index} container direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
          {
            //setFormValues({ ...formValues, albumId: index, id: album.id, title: album.title, url: album.url, thumbnailUrl: album.thumbnailUrl})
            //tempTitle = formValues.title
            //render loop
}
          
          <form>
          <div>Thumbnail URL: <input id='thumbnail-url' value={formValues.thumbnailUrl} onChange={(e) => 
            {setFormValues({ ...formValues, thumbnailUrl: e.target.value})}}/></div>
          </form>
      </Grid>)
      */ 

    

    albums?.map((fakeData, index) => 
      fakeData.id !== editId ?
    <Grid key={index} direction="row" maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
      {
        console.log(fakeData)
      }
      <small>Id: <h4 style={boxStyle} id={fakeData.id.toString()} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditId(fakeData.id)}>{fakeData.id}</h4></small>
      <small>Title: <h4 style={boxStyle} id={fakeData.title} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditTitle(fakeData.title, fakeData.id)}>{fakeData.title}</h4></small>
      <small>URL: <h4 style={boxStyle} id={fakeData.url} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditURL(fakeData.url, fakeData.id)}>{fakeData.url}</h4> </small>
      <small>Thumbnail URL: <h4 style={boxStyle} id={fakeData.thumbnailUrl} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
          onClick={()=> handleEditThumbnailURL(fakeData.thumbnailUrl, fakeData.id)}>{fakeData.thumbnailUrl}</h4></small>

    </Grid>: 
        <Grid key={index} maxWidth="1500px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}>
          {//setFormValues({ ...formValues, albumId: index, id: album.id, title: album.title, url: album.url, thumbnailUrl: album.thumbnailUrl})
          }
          <form>
          <div>Id: <input value={formValues.id} /></div>
          <div>Title: <input id='title' value={editTitle} onChange={(e) => 
            {setEditTitle(e.target.value)}}/> </div>
          <div>URL: <input id='url' value={formValues.url} onChange={(e) => 
            {setFormValues({ ...formValues, url: e.target.value})}}/> </div>
          <div>Thumbnail URL: <input id='thumbnail-url' value={formValues.thumbnailUrl} onChange={(e) => 
            {setFormValues({ ...formValues, thumbnailUrl: e.target.value})}}/></div>
          </form>
      </Grid> 
    )
      }

    {/*albums?.map((album) => 
    <Grid sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}}>
      <span
        onClick={() => setIsActive("active")}
        className={`inline-text_copy inline-text_copy--${!isActive ? "active" : "hidden"
          }`}
      >
        {album.title}
      </span>
      <input
        value={inputValue.title}
        onChange={(e) => setInputValue({...inputValue, title: e.target.value})}
        className={`inline-text_input inline-text_input--${isActive ? "active" : "hidden"
          }`}
      />
    </Grid>
    )*/
    }
    
      <Grid container direction="row"
      justifyContent="center"
      alignItems="center" width={1} maxWidth="300px" p={3} columns={6}>
        <Button variant='outlined' onClick={saveEdit}> Save edit </Button>
        <Button variant='outlined' onClick={reset}>Reset</Button>
        <Button variant='outlined' onClick={handleLogout}>Logout</Button>
      </Grid>
    </Grid>;
}


export default HomePage;


/*
import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { AppState } from "../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux"
import Cookie from "js-cookie"
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { blue } from '@mui/material/colors';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { DashboardState, setListAlbum } from '../../home/redux/dashboardReducer';
import { Album } from './../../../models/dashboard';
interface Props { }

const HomePage = (props: Props) => {

  const fakeData = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "natus nisi omnis corporis facere molestiae rerum in",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },]
  const dispatch1 = useDispatch<ThunkDispatch<DashboardState, null, Action<string>>>();
  
  //const dispatch2 = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  dispatch1(setListAlbum(fakeData));

  const albums = useSelector((state: AppState) => (
    state.dashboard.listAlbum
  ));  // get data
  
  useEffect(() => {
    console.log('albums',albums)
  
    return () => {
      
    }
  }, [albums])
  
  console.log(albums);
  

  const handleLogout = useCallback((e) => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("loginSession");
  }, [])

  if (!localStorage.getItem("loginSession") || !localStorage.getItem("registerData"))
  {
    localStorage.removeItem("rememberMe");
  }

  return <Grid container direction="row"
    justifyContent="center"
    alignItems="center"
    width={1}
    height="100vh" columns={2}><Grid container direction="row"
      justifyContent="center"
      alignItems="center" width={1} maxWidth="300px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}><Button variant='outlined' onClick={handleLogout}>Logout</Button></Grid></Grid>;
}

//alignItems="center" width={1} maxWidth="300px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}><Button variant='outlined' onClick={handleLogout}>Logout</Button></Grid></Grid>;

export default HomePage;

*/