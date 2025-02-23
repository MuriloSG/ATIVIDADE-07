# Aluno: Murilo Santos Gonçalves
# Gerenciador de Usuários - React + Vite + TailwindCSS

Este é um projeto simples desenvolvido em **React** para gerenciar usuários fictícios utilizando a API [ReqRes](https://reqres.in/). Ele permite listar, buscar, criar e excluir usuários, utilizando a biblioteca **SweetAlert2** para interações e **TailwindCSS** para estilização. O principal objetivo é aprender a consumir end-points de uma API REST.

## ✨ Funcionalidades
- **Listagem de Usuários**: Carrega uma lista de usuários da API.
- **Busca**: Permite pesquisar um usuário pelo nome.
- **Criação de Usuários**: Adiciona um novo usuário fictício.
- **Exclusão de Usuários**: Remove um usuário da lista localmente.

> **Importante**: Os dados **não** são persistidos no banco de dados da API ReqRes. Isso significa que se recarregar a página, os usuários criados ou excluídos desaparecerão.

## 🔗 Tecnologias Utilizadas
- [Vite](https://vite.dev/guide/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [ReqRes API](https://reqres.in/)

## 📚 Como Funciona?

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

### 5. Requisitos e Respostas da API ReqRes

#### Listagem de Usuários (GET)
- **Endpoint**: `GET https://reqres.in/api/users?delay=3`
- **Resposta**:
```json
{
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "first_name": "George",
            "last_name": "Bluth",
            "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "first_name": "Emma",
            "last_name": "Wong",
            "avatar": "https://reqres.in/img/faces/3-image.jpg"
        },
        {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "first_name": "Eve",
            "last_name": "Holt",
            "avatar": "https://reqres.in/img/faces/4-image.jpg"
        },
        {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://reqres.in/img/faces/5-image.jpg"
        },
        {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg"
        }
    ],
    "support": {
        "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
        "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
    }
}
```

#### Criação de Usuário (POST)
- **Endpoint**: `POST https://reqres.in/api/users`
- **Requisição**:
```json
{
    "name": "morpheus",
    "job": "leader"
}
```
- **Resposta**:
```json
{
    "name": "morpheus",
    "job": "leader",
    "id": "50",
    "createdAt": "2025-02-23T11:57:09.924Z"
}
```

#### Exclusão de Usuário (DELETE)
- **Endpoint**: `DELETE https://reqres.in/api/users/{id}`
- **Resposta**: Nenhum conteúdo (Status **204 No Content**)

## 🔧 Como Clonar e Rodar o Projeto

### 1. Clonar o Repositório
```bash
[git clone https://github.com/seu-usuario/gerenciador-de-usuarios.git](https://github.com/MuriloSG/ATIVIDADE-07.git)
```

### 2. abrir projeto
```bash
cd ATIVIDADE-07
```

### 3.instalar dependências
```bash
npm install
```


### 4. Executar o projeto
```bash
npm run dev
```

## 💡 Referências
- [Guia para Iniciantes - Consumindo APIs REST](https://www.dio.me/articles/guia-para-iniciantes-consumindo-apis-rest)
- [SweetAlert2](https://sweetalert2.github.io/)
- [ReqRes API](https://reqres.in/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://react.dev/)

