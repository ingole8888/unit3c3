// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page
var id;
async function showdata(){
  var movie = document.getElementById("search").value;
  var res =await fetch(`https://www.omdbapi.com/?apikey=793f7c2e&s=${movie}`)
  var data=await res.json()
  return data.Search;
}
function append(data){
    document.getElementById("movies").innerHTML=null;
    data.forEach(function(el){
        var name = document.createElement("p");
        name.style="padding:5px"
        name.innerText=el.Title;
        name.setAttribute("id","movie");
        name.addEventListener("click",function(){
            get_movie(el);
        })
        document.getElementById("movies").append(name);
    })
}
async function main(){
    var data = await showdata();
    if(data == undefined){
        return false;
    }
    console.log(data);
    append(data);
}
function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
    id=setTimeout(function(){
        func();
    },delay);
}
function get_movie(data){
    var container=document.getElementById("ss");
    let img =document.createElement("img");
    img.src=data.poster;
    let name=document.createElement("h2");
    name.innerText=data.Title;
    let year=document.createElement("h3");
    year.innerText=`Release year: ${data.year}`

    var div= document.createElement("div");
    div.append(img,name,year);
    container.innerHTML=null;
    container.append(div);
}
