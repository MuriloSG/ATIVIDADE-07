import { useEffect, useState } from "react";
import Search from "../components/search";
import { ListUsers, deleteUser, createUser } from "../utils/api";
import Card from "../components/card";
import CardSkeleton from "../components/card-skeleton";
import Swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await ListUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };

    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
    });

    if (result.isConfirmed) {
      const response = await deleteUser(userId);

      if (response.status === 204) {
        setUsers(users.filter((user) => user.id !== userId));
        Swal.fire(
          "Deletado!",
          "O usuário foi deletado com sucesso.",
          "success"
        );
      } else {
        Swal.fire("Erro!", "Houve um problema ao deletar o usuário.", "error");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleCreateUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Criar novo usuário",
      html: `
        <input id="name" class="swal2-input" placeholder="Nome" required>
        <input id="job" class="swal2-input" placeholder="Cargo" required>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const job = document.getElementById("job").value;

        // Verifica se o nome contém pelo menos dois nomes (primeiro e sobrenome)
        const nameParts = name.trim().split(" ");
        if (nameParts.length < 2) {
          Swal.showValidationMessage(
            "Por favor, insira tanto o primeiro nome quanto o sobrenome."
          );
          return false;
        }

        if (!name || !job) {
          Swal.showValidationMessage("Por favor, preencha todos os campos");
        } else {
          return { name, job };
        }
      },
    });

    if (formValues) {
      const [first_name, last_name] = formValues.name.split(" ");

      const userData = {
        first_name,
        last_name,
        job: formValues.job,
        avatar: avatar,
      };

      const newUser = await createUser(userData);

      if (newUser) {
        setUsers([newUser, ...users]);
        Swal.fire("Criado!", "Usuário criado com sucesso.", "success");
      } else {
        Swal.fire("Erro!", "Houve um problema ao criar o usuário.", "error");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-6">
          <div className="flex items-center space-x-2">
            {/* Barra de pesquisa com largura aumentada */}
            <Search
              onSearch={handleSearch}
              className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            />
            <button
              onClick={handleCreateUser}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Criar Novo Usuário
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, index) => <CardSkeleton key={index} />)
          ) : filteredUsers.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">
              Nenhum usuário encontrado.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                image={user.avatar}
                name={`${user.first_name} ${user.last_name}`}
                email={user.email}
                onDelete={() => handleDelete(user.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
