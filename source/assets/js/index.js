import {db,collection, getAuth,signInWithEmailAndPassword} from "./firebase.js"
const mail_input=document.getElementById('login_mail')
const pass_input=document.getElementById('login_pass')
const loginBtn=document.querySelector('.login_btn')
const logoutBtn=document.querySelector('#logout')

logoutBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    document.querySelector('.admin_panel').style.display="none"
    document.querySelector('.admin_login').style.display="flex"
})
loginBtn.addEventListener('click',login)
pass_input.addEventListener('keydown',e=>{
    if(e.key=="Enter"){
        login()
    }
})

const data=await getAuth()
async function login(){
    const mail=mail_input.value
    const password=pass_input.value
    try {
        const credentials=await signInWithEmailAndPassword(data,mail,password)
        const user=credentials.user
        if(user){
            mail_input.value=""
            pass_input.value=""
            document.querySelector('.admin_login').style.display="none"
            document.querySelector('.admin_panel').style.display='flex'
        }
    }catch(error){
        if(document.querySelector('.admin_login div p').textContent=="Invalid username or password please try again"){
        }else{
            document.querySelector('.admin_login div p').textContent="Invalid username or password please try again"

        }
    }
}
