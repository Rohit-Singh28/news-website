const API_Key = 'ea01be90d72a4d3c8d0520b6e7a9ff52' ;
const url = 'https://newsapi.org/v2/everything?q=';
let q = "india" ;
 
window.addEventListener("load",get(q)) ;

function reload() {
    document.documentElement.scrollTop = 0;
}

async function get(querey){
    let res = await axios.get(`${url}${querey}&apiKey=${API_Key}`);
    try{
        console.log(res);
        bindData(res.data.articles);
        ShowFeedback();
    }
    catch(err){
        console.log(err);
    }
}

function bindData(articles){
    const mainBody = document.querySelector(".mainBody");
    const Tempcard = document.querySelector(".templateCard");
    const TempcardFull = document.querySelector(".templateCardFull");


    mainBody.innerHTML = "";
   
    
    for(let i = 0 ; i< 31 ; i = i+1){
   
        if(!articles[i].urlToImage || articles[i].urlToImage == "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png"
           
        || articles[i].urlToImage == "https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/5.3.0/bbc_news_logo.png"
        ){
            console.log("Image not found...")
        }
        else{
            let newCard ;
            if(i == 6   || i == 15 || i == 30){
                 newCard = TempcardFull.content.cloneNode(true);
            }
            else{
                 newCard = Tempcard.content.cloneNode(true);
            }
            updateinfo(newCard,articles[i]);
            mainBody.appendChild(newCard);  
            console.log(i);
        }
    }
}

function updateinfo(newCard,article){
    const newstitle = newCard.querySelector("#heading");
    const newsdescription = newCard.querySelector("#summary");
    const newsImg = newCard.querySelector("#cardImg");
    const Publish = newCard.querySelector("#date");
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    Publish.innerText = `${article.source.name} . ${date}`  ;
    newsImg.src = article.urlToImage;
    newstitle.innerText = article.title;
    newsdescription.innerText = article.description;

    newCard.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}



let navcategory = document.querySelectorAll("#nav");
navcategory.forEach((category)=>{
    const a = category.classList.value;  //to identify class
    let cate = document.querySelector(`.${a}`);

    const quereySerch = cate.textContent;
    cate.addEventListener("click",async() => {
        await get(quereySerch);
        reload();
    })
})


let SearchBox = document.querySelector("#Search");
let Searchbtn = document.querySelector(".btn");


Searchbtn.addEventListener("click",() => {
    Search();
})

SearchBox.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        Search();
    }
})

async function Search(){
    const SearchText = SearchBox.value;
        if(!SearchText)return;
        await get(SearchText);
        reload();
}



function ShowFeedback(){

    let feedbackBox = document.querySelector(".feedbackBox");
    feedbackBox.classList.add("changeopacity");
}



