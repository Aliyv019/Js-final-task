import {db,collection,addDoc,getDocs} from "./firebase.js"
const join_us_btn=document.querySelector('header button')
join_us_btn.addEventListener('click',()=>{
    const modal=document.querySelector('.join_us_modal')
    modal.style.display="flex"
    modal.addEventListener('click',(e)=>{
        if(e.target===e.currentTarget){
            modal.style.display="none"
        }
    })
})
const join_us_form=document.querySelector('#join_us_form')
join_us_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const fullname=document.querySelector('#join_us_name').value
    const email=document.querySelector('#join_us_email').value
    join_us(fullname,email)
})
async function join_us(fullname,email) {
    try {
        const data=await addDoc(collection(db,'foruser'),{
            fullname:fullname,
            email:email
        })
        console.log(`Document written with ID:${data.id}`);
        document.querySelector('#join_us_name').value=""
        document.querySelector('#join_us_email').value=""
    } catch (error) {
        console.error();
        
    }
}


async function about_store_data() {
    try {
        const response=await getDocs(collection(db,"about"))
        response.forEach((doc) => {
            const data=doc.data();
            document.querySelector('.about_text h2').textContent=data.title
            document.querySelector('.about_text p').textContent=data.description
            document.querySelector('.about_store img').src=data.imageLink
        });
    } catch (error) {
        console.error();
        
    }
}
// async function about_store_data() {
//     try {
//         const response = await getDocs(collection(db, "about"));
//         response.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data()}`);
//         });
//     } catch (error) {
//         console.error("Error fetching documents: ", error);
//     }
// }
about_store_data()



