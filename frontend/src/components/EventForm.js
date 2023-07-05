import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  // loader뿐만 아니라 action도 return한 데이터를 활용할 수 있다.
  const data = useActionData();

  const navigate = useNavigate();

  const navigation = useNavigation();

  // navigation.state를 통해 action의 진행 상황을 알 수 있다. 약간 pending, reject..랑 같은 개념으로 이해하면 될듯.
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    // 여기서 Form은 커스텀 컴포넌트가 아니라, react-router-dom에서 제공하는 Form이다.
    // 이를 통해 전송되는 데이터는 백엔드로 가는게 아니라, action으로 간다.
    // 또 다른 방법은 action 속성을 사용하는 것이다. action에는 특정 경로를 입력할 수 있는데,
    // 그 라우터에 있는 action에 정보를 전달하게 된다.
    <Form className={classes.form} method={method}>
      {/* <Form className={classes.form} method="post" action="/any-other-path"> */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// NewEvent에 있던 action을 EditEvent에서도 활용할 수 있게 좀 더 동적으로 만들었다.
export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;

    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
