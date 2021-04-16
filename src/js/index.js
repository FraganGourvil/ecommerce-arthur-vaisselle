import Screen from "./Screen";
import Toggler from "./Toggler";
import Swipe from "./Swipe";
import Filters from "./Filters";
import ProductSlideshow from "./ProductSlideshow";
import Search from "./Search";

/*
 * #==================================#
 * #                                  #
 * #        VENDOR DEPENDENCIES       #
 * #                                  #
 * #==================================#
 */

const filters = new Filters();
const screen = new Screen([filters]);

// Initialisation des dépendances

screen.run();
filters.eventsListener();

/*
 * #==================================#
 * #                                  #
 * #              LIBS                #
 * #                                  #
 * #==================================#
 */

const libs = [

    new Toggler(),
    new Swipe(screen),
    new ProductSlideshow(),
    new Search()

]

// Initialisation des libs

libs.forEach(lib => {

    lib.eventsListener();

});

