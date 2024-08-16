import {db,collection,addDoc, doc} from "./firebase.js"
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

//adding functionality to carousel
document.addEventListener('DOMContentLoaded',()=>{
    const catalog=document.querySelector('.book_catalog')
console.log(catalog);
let margin=0

for(let i=0;i<3;i++){
    const carousel_inner=catalog.querySelectorAll('.carousel_inner')[i]
    const carousel_card=carousel_inner.querySelector('.carousel_card')
    catalog.querySelectorAll('.carousel_left')[i].addEventListener('click',()=>{
        margin=margin<1190?margin+=238:1190
        carousel_card.style.marginLeft=`-${margin}px`
    })
    catalog.querySelectorAll('.carousel_right')[i].addEventListener('click',()=>{
        margin=margin>0?margin-=238:0
        carousel_card.style.marginLeft=`-${margin}px`
    })
}
})