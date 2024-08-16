import {db,collection,addDoc,getDocs, doc} from "./firebase.js"
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


//adding books to catalog from firestore
async function books2catalog() {
    try {
        const response=await getDocs(collection(db,"books"))
        let book_array_length=0
        let newrelease_length=0
        response.forEach((book,index,books)=>{
            const book_data=book.data()
            const carousel_item=document.createElement('div')
            carousel_item.innerHTML=`<p style="display:${book_data.new?"block":"none"}">NEW</p>
            <img src="${book_data.imagelink}" alt="">
            <h4>${book_data.title}</h4>
            <button class="card_more">READ MORE</button>`
            console.log("hello");
            carousel_item.classList="carousel_card"
            if(book_data.new){

                document.querySelector('.newreleasecarousel').append(carousel_item)
                newrelease_length++
            }
            document.querySelectorAll('.carousel_inner')[0].append(carousel_item)
            console.log(book_data);
            book_array_length++
        })
        console.log(book_array_length);
        console.log(newrelease_length);
        
        

        
        const catalog=document.querySelector('.book_catalog')
        console.log(catalog);
        let margin=0
        let margin1=0
        let margin2=0
        
        
        const carousel_inner=catalog.querySelectorAll('.carousel_inner')[0]
        const carousel_card=carousel_inner.querySelector('.carousel_card')
        catalog.querySelectorAll('.carousel_left')[0].addEventListener('click',()=>{
            margin=margin>0?margin-=238:0
            carousel_card.style.marginLeft=`-${margin}px`
        })
        catalog.querySelectorAll('.carousel_right')[0].addEventListener('click',()=>{
            margin=margin<238*book_array_length?margin+=238:238*book_array_length
            carousel_card.style.marginLeft=`-${margin}px`
        })
        


        const carousel_inner2=catalog.querySelectorAll('.carousel_inner')[2]
        const carousel_card2=carousel_inner2.querySelector('.carousel_card')
        catalog.querySelectorAll('.carousel_left')[2].addEventListener('click',()=>{
            margin2 = margin2 > 0 ? margin2 -= 238 : 0;
            carousel_card2.style.marginLeft = `-${margin2}px`;
        })
        catalog.querySelectorAll('.carousel_right')[2].addEventListener('click',()=>{
            margin2 = margin2 < 238 * newrelease_length ? margin2 += 238 : 238 * newrelease_length;
            carousel_card2.style.marginLeft = `-${margin2}px`;
        })
        
    } catch (error) {
        console.error();
        
    }
}
document.addEventListener('DOMContentLoaded',books2catalog)


