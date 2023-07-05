import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    // 만약, action을 사용하기 위해서 button을 Form으로 감싸게 된다면, 이 아래 코드는 실행이 안될 것이다.
    // 이는 UX 상 좋지 않을 것이다. 한번정도는 의사를 물어봐야하니말이다.
    // 이럴 때 사용하는 것이 react-router-dom의 useSubmit hook이다.
    const proceed = window.confirm("Are you sure?");

    // EventItem은 EventDetail에 포함되어 있기 때문에 EventDetail 라우터에 action을 만든다.
    if (proceed) {
      // 첫번째 인자는 제출하고자 하는 데이터로 자동으로 formData로 감싸진다.
      // 두번째 인자는 옵션값.
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
