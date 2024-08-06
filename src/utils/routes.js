import CharacterDetail from "../components/CharacterDatail/CharacterDetail";
import EpisodeDetail from "../components/EpisodeDetail/EpisodeDetail";
import LocationDetails from "../components/LocationDetail/LocationDetails";
import Characters from "../page/characters/characters";
import Episodes from "../page/episodes/episodes";
import Locations from "../page/locations/locations";
import NotFoundPage from "../page/NotFoundPage";
import Home from "../page/RickandMorty";
import { 
    CHARACTER_ROUTE,
    CHARACTERDETAIL_ROUTE,
    EPISODEDETAIL_ROUTE,
    EPISODES_ROUTE,
    HOME_PAGE_ROUTE,
    LOCATIONDETAIL_ROUTE,
    LOCATIONS_ROUTE 
} from "./consts";

export const routes = [
    {
        path: HOME_PAGE_ROUTE,
        element: Home,
    },
    {
        path: CHARACTER_ROUTE,
        element: Characters,
    },
    {
        path: EPISODES_ROUTE,
        element: Episodes,
    },
    {
        path: LOCATIONS_ROUTE,
        element: Locations,
    },
    {
        path: CHARACTERDETAIL_ROUTE,
        element: CharacterDetail,
    },
    {
        path: EPISODEDETAIL_ROUTE,
        element: EpisodeDetail,
    },
    {
        path: LOCATIONDETAIL_ROUTE,
        element: LocationDetails,
    },
 
    {
        path: "*",
        element: NotFoundPage,
      },

];
