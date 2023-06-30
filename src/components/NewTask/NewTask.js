import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/useHttp";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "url",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskText }),
      },
      // bind를 통해서 createTask 함수의 첫번째 인자를 입력해준다.
      // 만약, bind를 하지않으면 중첩 함수를 만들어서 createTask 내부의 taskText를 사용 가능하도록 만들어줘야한다.
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
