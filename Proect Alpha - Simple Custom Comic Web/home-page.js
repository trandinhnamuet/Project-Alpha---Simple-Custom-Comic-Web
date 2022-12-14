let newLinkBox = document.getElementById('input');
let addButton = document.getElementById('add');
let showCount = document.getElementById('showCount');
let comicArea = document.getElementById('comicArea');

class AllComics {
    static val;
}

// reseta()  ;
showCount.innerHTML = `The number of comics you are following: ${localStorage.comicCount}`
updateComicArea();

function addNewComic() {
    manageCount();

    let newComicLink = newLinkBox.value;
    localStorage.setItem(String(localStorage.comicCount), newComicLink);
    updateComicArea();
}

function manageCount() {
    if(localStorage.comicCount) {
        localStorage.comicCount = Number(localStorage.comicCount) + 1;
    } else {
        localStorage.comicCount = 0;
    }

    showCount.innerHTML = `The number of comics you are following: ${localStorage.comicCount}`
}

function reseta() {
    localStorage.clear();
    manageCount();
    updateComicArea();
}

function updateComicArea() {
    comicArea.innerHTML = '';
    for (i = 1; i <= localStorage.comicCount; i++) {
        let newNode = document.createElement('div');
        newNode.classList.add("col-3");
        setCardStyle(newNode);
        setCardContent(newNode);
        
        comicArea.appendChild(newNode);
    }
}

function setCardStyle(newNode) {
    newNode.style.height = '300px';
    newNode.style.overflow = 'hidden';
}

function setCardContent(newNode) {
    newNode.innerHTML = i + `<br>`; //important code
    
    if (localStorage[String(i)].includes("cmangab")) {
        newNode.innerHTML += cmanga(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("truyentranhaudio")) {
        newNode.innerHTML += truyentranhaudio(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("baotangtruyenhot")) {
        newNode.innerHTML += baotangtruyenhot(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("blogtruyen")) {
        newNode.innerHTML += blogtruyen(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("vlogtruyen")) {
        newNode.innerHTML += vlogtruyen(localStorage[String(i)])
    }
}

function cmanga(link) {
    return getComicAvatar() + getComicName() + getChapterList();

    function getComicAvatar() {
        let req = new XMLHttpRequest();
        req.open("GET", link, false);
        req.send(null);
        let htmlCode = req.responseText;
        // console.log(htmlCode);

        let openIndex = htmlCode.indexOf('<img itemprop="image"');
        let cutString = htmlCode.slice(openIndex, openIndex + 125);
        let srcIndex = cutString.indexOf('src');

        cutString = cutString.slice(srcIndex, srcIndex + 125);
        let start = cutString.indexOf('"');
        let end = cutString.indexOf('" ');
        let avatarLink = "https://cmangab.com/" + cutString.slice(start + 1, end);

        return `<img src="${avatarLink}">`;
    }

    function getComicName() {
        
    }

    function getChapterList() {
        return ``;
    }
}



/*
To do:
(??p d???ng v???i cmangab.com tr?????c)
V Giao di???n c?? b???n
V Th??m link
V Disable CORS
V ?????c link, ?????c code web link
- Hi???n ???nh 
- ?????c chap
- Th??m n??t x??a truy???n
- Check link h???p l???, check link n??y c?? thu???c v??? nh???ng web ???? ???????c x??? l?? hay kh??ng, check ???? t???n t???i
- S???p x???p theo th??? t??? c???p nh???t

*/
