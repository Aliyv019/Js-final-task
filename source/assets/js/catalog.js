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
            carousel_item.querySelector('button').addEventListener('click',()=>books_info(book_data))
            const carousel_item_new=document.createElement('div')

            carousel_item_new.innerHTML=`<p style="display:${book_data.new?"block":"none"}">NEW</p>
            <img src="${book_data.imagelink}" alt="">
            <h4>${book_data.title}</h4>
            <button class="card_more">READ MORE</button>`
            console.log(book_data);
            
            carousel_item_new.querySelector('button').addEventListener('click',()=>books_info(book_data))
            console.log("hello");
            carousel_item_new.classList="carousel_card"
            carousel_item.classList="carousel_card"
            if(book_data.new){

                document.querySelectorAll('.carousel_inner')[2].append(carousel_item_new)
                newrelease_length++
            }
            document.querySelectorAll('.carousel_inner')[0].append(carousel_item)
            console.log(book_data);
            book_array_length++
        })
        console.log(book_array_length);
        console.log(newrelease_length);
        
        

        

    //adding scroll to carousels(first and last second is empty)
    const catalog = document.querySelector('.book_catalog')
    let margin = 0
    let margin2 = 0

    const carousel_inner = catalog.querySelectorAll('.carousel_inner')[0]
    const carousel_items = carousel_inner.querySelectorAll('.carousel_card')
    const itemWidth = carousel_items[0].offsetWidth

    function scrollCarousel(carousel, distance) {
        carousel.scrollBy({ left: distance, behavior: 'smooth' })
    }

    catalog.querySelectorAll('.carousel_left')[0].addEventListener('click', () => {
        margin = margin > 0 ? margin - itemWidth : 0
        scrollCarousel(carousel_inner, -itemWidth)
    })

    catalog.querySelectorAll('.carousel_right')[0].addEventListener('click', () => {
        const maxScroll = itemWidth * (carousel_items.length - 1)
        margin = margin < maxScroll ? margin + itemWidth : maxScroll
        scrollCarousel(carousel_inner, itemWidth)
    })

    const carousel_inner2 = catalog.querySelectorAll('.carousel_inner')[2]
    const carousel_items2 = carousel_inner2.querySelectorAll('.carousel_card')
    const itemWidth2 = carousel_items2[0].offsetWidth

    catalog.querySelectorAll('.carousel_left')[2].addEventListener('click', () => {
        margin2 = margin2 > 0 ? margin2 - itemWidth2 : 0
        scrollCarousel(carousel_inner2, -itemWidth2)
    })

    catalog.querySelectorAll('.carousel_right')[2].addEventListener('click', () => {
        const maxScroll2 = itemWidth2 * (carousel_items2.length - 1)
        margin2 = margin2 < maxScroll2 ? margin2 + itemWidth2 : maxScroll2
        scrollCarousel(carousel_inner2, itemWidth2)
    })
    } catch (error) {
        console.error();
        
    }
}
document.addEventListener('DOMContentLoaded',books2catalog)

function books_info(data){
    document.querySelector('.book_info').style.display="flex"
    document.querySelector('.book_catalog').style.display="none"
    document.querySelector('.book_info_left p').textContent=data.year
    document.querySelector('.book_info_left h2').textContent=data.title
    document.querySelector('.book_info_left h3').textContent=data.authors
    document.querySelector('.book_info_left span').textContent=data.description
    document.querySelector('.book_info img').src=data.imagelink
    document.querySelector('#button_back').addEventListener('click',()=>{
        document.querySelector('.book_info').style.display="none"
        document.querySelector('.book_catalog').style.display="block"
        console.log("salam");
        
    })
}