//Logging in as admin
import {db,collection,addDoc,setDoc,doc,getDocs,getAuth,signInWithEmailAndPassword} from "./firebase.js"
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


//Book search suggestion
const api_key="AIzaSyAup3FWwOVgoELW6Z0hTwacpjBEMCdnHDo"
const search_input=document.querySelector('#search_book')
const search_btn=document.querySelector('.search_book_btn')
const suggestion_list=document.querySelector('.search_suggest')

search_btn.addEventListener('click',()=>book_search(search_input.value.trim()))
search_input.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"){
        book_search(search_input.value.trim())
    }
})

async function book_search(title) {
    suggestion_list.innerHTML=""
    try {
        const response=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=5&key=${api_key}`)
        const data=await response.json()
        console.log(data);
        for(let i of data.items){
            const ListItem=document.createElement('li')
            ListItem.innerHTML=`<h5>${i.volumeInfo.title}</h5>`
            suggestion_list.appendChild(ListItem)
            ListItem.addEventListener('click',()=>book_form_data(i))
        }

        
    } catch (error) {
        console.log(error);
        
    }
}

//adding data to input fields
function book_form_data(item){
    document.getElementById('book_name').value=item.volumeInfo.title
    document.getElementById('author_name').value = item.volumeInfo.authors ? [...item.volumeInfo.authors].join(", ") : ""
    document.getElementById('book_image').value=item.volumeInfo.imageLinks.thumbnail? item.volumeInfo.imageLinks.thumbnail:""
    document.getElementById('book_desc').value=item.volumeInfo.description?item.volumeInfo.description:""
    document.getElementById('book_type').value=item.volumeInfo.categories?[...item.volumeInfo.categories].join(", "):""
}

//adding book data to firestore
const book_form=document.querySelector('.book_form')
book_form.addEventListener('submit',(e)=>book_add(e))

async function book_add(e) {
    e.preventDefault()
    const response=await getDocs(collection(db,"books"))
    let f=true
    response.forEach(book => {
        if(book.data().title==document.getElementById('book_name').value){
            f=false
        }
    });
    if(f){
        try {
            const data=await addDoc(collection(db,'books'), {
                title:document.getElementById('book_name').value,
                authors:document.getElementById('author_name').value,
                imagelink:document.getElementById('book_image').value,
                description:document.getElementById('book_desc').value,
                type:document.getElementById('book_type').value
            })
            console.log(`Document written with ID:${data.id}`);
            books_table_reload()
            
        } catch (error) {
            console.error();
            
        }
    }
}


//adding store about data
const about_form=document.querySelector('.about_store_form')
about_form.addEventListener('submit',(e)=>aboutChange(e))

async function aboutChange(e){
    e.preventDefault()
    try {
        setDoc(doc(db,"about","about_store"),{
            title:document.getElementById('store_title').value,
            imageLink:document.getElementById('store_image_url').value,
            description:document.getElementById('store_desc').value
        },{ merge: true })
        console.log("Store about was updated");
        
    } catch (error) {
        console.error();
        
    }
}


//adding data to books table
const books_table=document.querySelector('.books table')

async function books_table_reload() {
    books_table.innerHTML=`
                        <tr class="table_head">
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Author</th>
                        </tr>
    `
    try {
        const response=await getDocs(collection(db,"books"))
        
        let counter=1
        response.forEach(element=>{
            const table_row=document.createElement('tr')
            console.log("asd");
            
            const book=element.data()
            table_row.innerHTML=`
                                <td>${counter}</td>
                                <td>
                                    <div class="table_title">
                                    <img src=${book.imagelink}>
                                    <p>${book.title}</p>
                                </div>
                                </td>
                                <td>${book.description.substring(0,16)}...</td>
                                <td>${book.type}</td>
                                <td>${book.authors}</td>
            `
            books_table.appendChild(table_row)
            console.log(book.title);
            counter++
        })
    } catch (error) {
        console.error();
        
    }
}
books_table_reload()