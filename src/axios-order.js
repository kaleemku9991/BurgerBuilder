import axios from "axios";

const instance=axios.create({
  baseURL:"https://react-burger-bilder-ef6cc-default-rtdb.firebaseio.com/"
});

export default instance;