import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;

// import { useLoaderData } from "react-router-dom";
// import classes from "./EventsList.module.css";

// function EventsList() {
//   // 꼭 router 설정에 loader가 붙어있지 않더라도, 가장 근접한 loader를 사용하므로 이 컴포넌트가 포함되어있는 Events 컴포넌트의 loader에 접근할 수 있다.
//   const events = useLoaderData();

//   return (
//     <div className={classes.events}>
//       <h1>All Events</h1>
//       <ul className={classes.list}>
//         {events.map((event) => (
//           <li key={event.id} className={classes.item}>
//             <a href="...">
//               <img src={event.image} alt={event.title} />
//               <div className={classes.content}>
//                 <h2>{event.title}</h2>
//                 <time>{event.date}</time>
//               </div>
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default EventsList;
