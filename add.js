const { createSecretKey } = require('crypto')
const fs = require('fs')

const plan = ()=>{
    try {
  const tripdata =  fs.readFileSync('trips.json')
  const sdata = tripdata.toString()
  const pdata = JSON.parse(sdata)

  return pdata
    }
    catch(e){
        return []
    }
}

const createplan = (d,p,t)=>{
    const info = plan()
    info.push({
        'Date' : d,
        'Place' : p,
        'Type' : t,
    })
    
    const savetrips = savetrip(info)

    return savetrips
}

const savetrip = (info) =>{
    const sdata = JSON.stringify(info)
    const save = fs.writeFileSync('trips.json',sdata)

    return true
}

// load data 

const load = ()=>{
    const user_trips = fs.readFileSync('trips.json')
    const jsontrips  = JSON.parse(user_trips)

    return jsontrips
}

//delete trips

const deltrip = (place) =>{
    const places = load()
    const keeptrip = places.filter((p)=>{
        return  p.Place !== place
    })

    savetrip(keeptrip)
}

// login register
const register = (data)=>{
     const userdata = createlogin()
     userdata.push({
         "Username" : data.username,
         "Password" : data.userpassword,
     })

     savelogin(userdata)
}

const createlogin = () =>{
    try {
        const users_file =  fs.readFileSync('users.json')
        const userdata = users_file.toString()
        const pudata = JSON.parse(userdata)
      
        return pudata
          }
          catch(e){
              return []
          }
}

const savelogin = (credentials) =>{
    const readydata = JSON.stringify(credentials)
    fs.writeFileSync('users.json',readydata)
    return true
}

const login = (credential) =>{
 const data = createlogin()
 const loginuser = data.filter((user)=>{
     return credential.username == user.Username 
 })   

 if(loginuser.length !== 0){
     return true
 }

}


module.exports = {
    createplan,
    load,
    deltrip,
    register,login,
}
