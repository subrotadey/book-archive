const totalBook = document.getElementById('total-book');
const searchResult = document.getElementById('book-details');
// search book
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchResult.innerHTML = `
    <button class="btn btn-primary mx-auto" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    </button>
    `
    //condition check
    if(searchText === ''){
        searchResult.innerHTML = `
            <div class="text-center text-black border border-success mb-3 p-3 mx-auto">
                <h6>No Result Found</h6>
                <p>Please Search by Book Name</p>
                <br>
                <h6 >You got 0 books</h6>
                <hr>
            </div>
        `;
        totalBook.innerHTML = '';
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        searchField.value = '';
        fetch(url)
            .then(response => response.json())
            .then(json => loadData(json.docs))
    }
}

//load data function
const loadData = books => {
    const newBookDetails = books.filter(book => book.cover_i != undefined && book.author_name != undefined && book.publisher != undefined && book.first_publish_year != undefined);
    
    if(newBookDetails.length === 0){
        searchResult.innerHTML = '';
        searchResult.innerHTML = `
            <div class="text-center text-black border border-success mb-3 p-3 mx-auto">
                <h6>No Result Found</h6>
                <p>Please Search by Correct Book Name</p>
                <br>
                <h6 >You got ${newBookDetails.length} books</h6>
                <hr>
            </div>    
        `;
        totalBook.innerHTML = '';
    }
    else{
        //total book calculation
        totalBook.innerHTML = '';
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `<h6 class="text-center text-black border border-success mb-3 p-3 bg-info text-white">You got ${newBookDetails.length} books</h6><hr>`
        searchResult.innerHTML = '';
        totalBook.appendChild(newDiv);
        
        //book details
        newBookDetails.forEach(bookInformation => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML = `
            <div class="card h-100">
                <img src='https://covers.openlibrary.org/b/id/${bookInformation.cover_i}-M.jpg' class="card-img-top" style="height: 600px; alt="...">
                <div class="card-body">
                    <h5 class="card-title text-info">${bookInformation.title}</h5>
                    <hr>
                    <p class="card-subtitle mb-2"><span class="fw-bolder">Author Name:</span> ${bookInformation.author_name}</p>
                    <p class="card-text"><span class="fw-bolder">Publisher:</span> ${bookInformation.publisher}</p>
                    <p class="card-text"><span class="fw-bolder">First Publish Year: </span>${bookInformation.first_publish_year}</p>
                </div>
                <div class="card-footer">
                <small class="text-muted"><span class="fw-bolder">Author Key:</span> ${bookInformation.author_key}</small>
                </div>
            </div>
            `
            searchResult.appendChild(newDiv);
        })
    }
}