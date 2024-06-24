import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const fetchData = async () => {
  const response = await todoApi.get(`/todos/`);
  return response.data;
};
export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={fetchData} />
      <TodoList todos={data} />
    </>
  );
}
