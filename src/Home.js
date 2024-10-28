import EventList from "./EventList";
import useFetch from "./useFetch";

const Home = () => {
  // const environmentName = process.env.REACT_APP_ENV;
  const url = process.env.REACT_APP_API_URL + '/events/';
  const { error, isPending, data: events } = useFetch(url)

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { events && <EventList events={(events)} /> }
    </div>
  );
}
 
export default Home;
