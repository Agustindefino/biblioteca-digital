// Acessando os campos do formulário
const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("novaSenha");
const repeatPassword = document.getElementById("repitaSenha");

const loginUsername = document.getElementById("usernameCadastrado");
const loginPassword = document.getElementById("senhaCadastrada");

const bookTitle = document.getElementById("titulo");
const bookAuthor = document.getElementById("autor");
const bookGenre = document.getElementById("genero");
const bookIsbn = document.getElementById("isbn");
const bookList = document.getElementById("lista");

let isBookListVisible = false;

// Funções de utilidade para Local Storage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function userExists(user, users) {
  return users.some(u => u.login === user.login);
}

function bookExists(book, library) {
  return library.some(b => b.titulo === book.titulo && b.autor === book.autor);
}

// Funções principais
function handleLogin() {
  const username = loginUsername.value;
  const password = loginPassword.value;
  const users = getFromLocalStorage("bancoDeDados");
  let message = "Usuário ou senha incorreta!";

  if (users.length === 0) {
    message = "Nenhum usuário cadastrado até o momento.";
  } else {
    const foundUser = users.find(user => user.login === username && user.senha === password);

    if (foundUser) {
      message = "Parabéns, você está logado";
      saveToLocalStorage("logado", foundUser);
      window.location.href = 'logado.html';
    }
  }
  alert(message);
}

function handleRegister() {
  const username = newUsername.value;
  const password = newPassword.value;
  const repeatedPassword = repeatPassword.value;

  if (!username || !password || !repeatedPassword) {
    alert('Preencha todos os campos!');
    return;
  }

  if (password !== repeatedPassword) {
    alert("As senhas são diferentes!");
    return;
  }

  const users = getFromLocalStorage("bancoDeDados");
  const newUser = { login: username, senha: password };

  if (userExists(newUser, users)) {
    alert('Esse usuário já foi cadastrado!');
  } else {
    users.push(newUser);
    saveToLocalStorage("bancoDeDados", users);
    alert("Usuário cadastrado com sucesso!");
    newUsername.value = '';
    newPassword.value = '';
    repeatPassword.value = '';
  }
}

function createBook() {
  const newBook = {
    titulo: bookTitle.value,
    autor: bookAuthor.value,
    genero: bookGenre.value,
    isbn: bookIsbn.value
  };

  const library = getFromLocalStorage("biblioteca");

  if (bookExists(newBook, library)) {
    alert('Esse livro já foi cadastrado!');
  } else {
    library.push(newBook);
    saveToLocalStorage("biblioteca", library);
    alert("Livro cadastrado com sucesso!");
    bookTitle.value = '';
    bookAuthor.value = '';
    bookGenre.value = '';
    bookIsbn.value = '';
  }
}

function toggleBookList() {
  isBookListVisible = !isBookListVisible;
  bookList.innerHTML = '';

  if (isBookListVisible) {
    const library = getFromLocalStorage("biblioteca");
    if (library.length === 0) {
      bookList.innerHTML = 'Não há livros cadastrados no momento!';
    } else {
      let bookDisplay = '';
      library.forEach(book => {
        bookDisplay += `
          <p>
            <strong>Título:</strong> ${book.titulo}<br>
            <strong>Autor:</strong> ${book.autor}<br>
            <strong>Gênero:</strong> ${book.genero}<br>
            <strong>Isbn:</strong> ${book.isbn}<br>
            _______________________
          </p>`;
      });
      bookList.innerHTML = bookDisplay;
    }
  }
}

function goToHomePage() {
  window.location.href = "index.html";
}