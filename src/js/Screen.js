class Screen {

    constructor(observers) {

        this.body = document.querySelector('body');

        this.view = null;

        this.lastView = null;

        this.observers = observers;

        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        if (viewportWidth > 1100) {

            this._setView('ltr');

        } else {

            this._setView('mobile');

        }

    }

    run() {

        this._eventHandler();

    }

    _eventHandler() {

        window.addEventListener('resize', event => {

            let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

            if (viewportWidth > 1100) {

                this._setView('ltr');

            } else {

                this._setView('mobile');

            }

        }, false);

    }

    _setView(size) {

        this.body.dataset.screen = size;

        if(this.lastView === null) {

            this.lastView = size;
            this.view = size;

            this.notify();

        }

        if(this.lastView !== size) {

            this.view = size;
            this.lastView = size;

            this.notify();

        }

    }

    getView() {

        return this.view;

    }

    notify() {

        this.observers.forEach(observer => {

            observer.updateOnChangeView(this.view);

        });

    }

    addObserver(observer) {

        this.observers.push(observer);

    }

}

export default Screen;