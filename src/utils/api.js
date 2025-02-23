// Criar um novo usuário na API. devolve o usuário criado, mas não é feito save na api.
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

// Listar todos os usuários da api.
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

// Deletar usuário da API pelo Id.
// A api retorna um objeto vazio, e o status code 204 mostrando que a requisição foi realizada com suceso, mas o usuário nao é excluido realmente.
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
