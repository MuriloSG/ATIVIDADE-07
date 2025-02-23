# Aluno: Murilo Santos Gonçalves
# Gerenciador de Usuários - React + TailwindCSS

Este é um projeto simples desenvolvido em **React** para gerenciar usuários fictícios utilizando a API [ReqRes](https://reqres.in/). Ele permite listar, buscar, criar e excluir usuários, utilizando a biblioteca **SweetAlert2** para interações e **TailwindCSS** para estilização. O principal objetivo é aprender a consumir end-points de uma API REST.

## ✨ Funcionalidades
- **Listagem de Usuários**: Carrega uma lista de usuários da API.
- **Busca**: Permite pesquisar um usuário pelo nome.
- **Criação de Usuários**: Adiciona um novo usuário fictício.
- **Exclusão de Usuários**: Remove um usuário da lista localmente.

> **Importante**: Os dados **não** são persistidos no banco de dados da API ReqRes. Isso significa que se recarregar a página, os usuários criados ou excluídos desaparecerão.

## 🔗 Tecnologias Utilizadas
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [ReqRes API](https://reqres.in/)

## 📖 Como Funciona?

### 1. Listagem de Usuários
Os usuários são obtidos da API ReqRes via **fetch API**:
```js
export const ListUsers = async () => {
  try {
    const response = await fetch("https://reqres.in/api/users?delay=3");
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};
```

### 2. Criação de Usuários
Ao criar um novo usuário, ele é enviado para a API, mas **não é salvo no banco de dados**:
```js
export const createUser = async (userData) => {
  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log(response.status)
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Erro ao criar o usuário:", response.status);
      return null;
    }
  } catch (error) {
    console.log("Erro ao realizar a requisição:", error);
    return null;
  }
};
```
O usuário é apenas adicionado localmente na lista.

### 3. Exclusão de Usuários
A exclusão também não é persistida na API. Apenas remove o usuário da lista local:
```js
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      method: "DELETE",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("Erro ao realizar a requisição:", error);
    return null;
  }
};
```

### 4. Status Codes
Para a criação e exclusão de usuários, a API [ReqRes](https://reqres.in/) devolve na response o status code da requisição:

| Status Code | Significado |
|------------|------------|
| **200 OK** | A requisição foi bem-sucedida. |
| **201 Created** | O usuário foi criado com sucesso. |
| **204 No Content** | O usuário foi excluído com sucesso (sem resposta no corpo). |
| **404 Not Found** | Usuário não encontrado. |

## 💡 Referências
- [Guia para Iniciantes - Consumindo APIs REST](https://www.dio.me/articles/guia-para-iniciantes-consumindo-apis-rest)
- [SweetAlert2](https://sweetalert2.github.io/)
- [ReqRes API](https://reqres.in/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://react.dev/)

