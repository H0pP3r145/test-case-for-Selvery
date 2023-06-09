import {createStore} from "vuex";
import {listStore} from "./listStore";

export default createStore({
    modules: {
        store: listStore
    }
})