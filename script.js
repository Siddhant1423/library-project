const library = [];
class book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
    }
    
    
    static addBookToLibrary(){
        const title = document.querySelector("#book-title")
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const read = document.querySelector("input[name=status]:checked")
        let newBook = new book(title.value,author.value,pages.value,read.value);
        library.push(newBook);
        console.log(library)
    }
    static showTable(){
        let table = document.querySelector("table");
        table.innerHTML = `
          <tr>
            <th>Sr.no</th>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Remove Book</th>
          </tr>
        `;
        library.forEach((book,index) =>{
            index += 1;
            let row =`<tr>
            <td>${index}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
            <td><button class="toggle-btn" data-index=${index}>Change</button></td>
            <td><button class="delete-btn" data-index=${index}>Delete</button></td>
            </tr>`;
            
            table.innerHTML +=row;
        })
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener('click',() => {
                book.deleteBook(button.getAttribute("data-index"));
            })
        });
        document.querySelectorAll(".toggle-btn").forEach(item =>{
            item.addEventListener('click',() => {
                book.toggleStatus(item.getAttribute("data-index"));
            })
        });
    }
    static deleteBook(index){
        library.splice(index-1,1)
        book.showTable();
    }
    static toggleStatus(index){
        library[index-1].toggleStatus();
        book.showTable();
    }
    toggleStatus(){
        this.read = this.read === "Read" ? "Not Read" : "Read";

    }
}


const openDialog = document.querySelector("#new-btn");
const dialog = document.querySelector("dialog");

const closebtn = document.querySelector("#close-btn");
const addBook = document.querySelector("#add-book");
const clearbtn = document.querySelector("#clear-btn")



// EVENT LISTENERS

openDialog.addEventListener('click',()=>{
    dialog.showModal();
});
closebtn.addEventListener('click',(event)=>{
    event.preventDefault();
    dialog.close();
});

addBook.addEventListener('click',(event)=>{
    book.addBookToLibrary();
    book.showTable();
    event.preventDefault();
});
clearbtn.addEventListener('click',(event)=>{
    document.querySelector("#book-title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("input[name=status]:checked").checked = false;

    event.preventDefault();
})
