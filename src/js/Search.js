const products = [

    {
        name: "6 fourchettes en acier forgé",
        categories: [
            "Carat",
            "Abysse"
        ],
        type: {

            main: "couvert",
            sub: "Fourchette AHO"

        },
        material: [
            "acier"
        ]
    }

];

export default class Search
{

    /**
     * Constructeur
     */
    constructor() {

        this.app = document.querySelector('.app-search-av');

        this.input = document.querySelector('#search');

        let blur = document.createElement('div');
        blur.classList.add('blur-background');

        this.blur = blur;

        this.isActive = false;

        this.results = document.querySelector('[data-search="results"]');

        this.button = document.querySelector('button[data-search="button"]');


    }

    /**
     * Inscrit les events
     */
    eventsListener() {

        // Event lié à la fermeture de la recherche
        document.getElementsByTagName('body')[0].addEventListener('click', event => {

            let doc = document.activeElement;

            if (doc !== this.input) {

                this._clearSearch();
                this._setBlur(false);
                this._setVisibleClear(false);

                this._setVisibleResults(false);

            }

        });

        // Button de clear

        this.button.addEventListener('click', event => {

            if(this.button.dataset.searchAction === "clear") {

                event.preventDefault();

                this._clearSearch();
                this._setVisibleResults(false);
            }

        });

        // Recherche
        this.input.addEventListener('keyup', event => {

            let word = this.input.value;

            this._setBlur(true);
            this._setVisibleClear(true);
            this._searchFromList(word, products);

        });

    }

    /**
     * Effectue une recherche sur la liste des produits
     * @param word
     * @param list
     * @private
     */
    _searchFromList(word, list) {

        const categories = ["Abysse", "Carat", "Écume", "Nordique", "Perle", "Saint-Tropez"];

        let resultsFromCategories = [];

        let findedCategory = undefined;

        let results = [];

        // On clear les résultats
        this.results.innerHTML = '';

        // On fait une recherche sur la catégorie avant une recherche sur les produits
        if(this._isACategory(word, categories)) {

            let result = this._findByCategory(list, word);

            resultsFromCategories = result.products;

            findedCategory = result.category;

        }

        list.forEach(product => {

            if(this._strNormalize(product.name, true).includes(this._strNormalize(word, true)))
            {
                results.push(product);
            }

        });


        // Si la recherche corréspond à une catégorie, on ajoute les produits avant le reste
        if(findedCategory !== undefined) {

            this.results.appendChild(this._generateDividerUI(findedCategory));

            resultsFromCategories.forEach(result => {

                this.results.appendChild(this._generateProductUI(result));

            });

            this.results.appendChild(this._generateDividerUI("Autres résultats"));

        }

        results.forEach(result => {

            this.results.appendChild(this._generateProductUI(result));

        });

        this._setVisibleResults(true);

    }

    _generateProductUI(product) {

        let item = document.createElement('div');

        item.classList.add('search-result-item');

        item.innerHTML = `${product.name} <a href="#"><i class="far fa-search"></i></a>`;

        return item;

    }

    _generateDividerUI(title) {

        let divider = document.createElement('div');

        divider.classList.add('search-result-category');

        divider.innerHTML = `${title}`;

        return divider;

    }

    /**
     * Vérifie que le terme rechercher corréspond à une catégorie
     * @param word
     * @param list
     * @returns {*|number|bigint}
     * @private
     */
    _isACategory(word, list) {

        return list.find(category => this._strNormalize(category, true).includes(this._strNormalize(word, true)));

    }

    /**
     * Recherche un produit par sa catégorie
     * @param list
     * @param category
     * @returns {{category: *, products: []}}
     * @private
     */
    _findByCategory(list, category) {

        let products = [];

        let belongsTo = undefined;

        list.forEach(product => {

            belongsTo = product.categories.find(pCategory => this._strNormalize(pCategory, true).includes(this._strNormalize(category, true)));

            if(belongsTo)
            {
                products.push(product);
            }

        });

        return {

            category: belongsTo,
            products : products

        };

    }

    /**
     * Normalise une chaîne de caractères (accents) pour faciliter les comparaisons
     * @param str
     * @param toLowerCase
     * @returns {string|*}
     * @private
     */
    _strNormalize(str, toLowerCase) {

        let normalize = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return (toLowerCase) ? normalize.toLowerCase() : normalize;

    }

    /**
     * Vide le champ de recherche
     * @private
     */
    _clearSearch() {

        this.input.value = '';

    }

    _setVisibleResults(state) {

        if(state) {
            this.results.style.display = 'block';
        }
        else
        {
            this.results.style.display = 'none';
        }

    }

    /**
     * Retourne l'état de la recherche
     * @returns {boolean}
     * @private
     */
    _isActive() {

        return this.isActive;

    }

    /**
     * Définit l'état de la recherche
     * @param state
     * @private
     */
    _setActive(state) {

        this.isActive = state;

    }

    _setVisibleClear(state) {

        if(state) {

            this.button.firstChild.className = 'fal fa-times';

            this.button.dataset.searchAction = "clear";

        }
        else
        {
            this.button.firstChild.className = 'far fa-search';

            this.button.dataset.searchAction = "launch";
        }

    }

    /**
     * Permet de figé l'écran et mettre en avant la recherche
     * @param state
     * @private
     */
    _setBlur(state) {

        let body = document.querySelector('body');

        if(state) {

            this.app.appendChild(this.blur);
            body.style.overflowY = 'hidden';

        }
        else
        {

            // On vérifie que le "blur" est actif, sinon on aura des erreurs dans la console
            if(Array.prototype.slice.call(this.app.childNodes).find(child => child === this.blur))
            {

                this.app.removeChild(this.blur);
                body.style.overflowY = 'scroll';

            }
        }

    }

}