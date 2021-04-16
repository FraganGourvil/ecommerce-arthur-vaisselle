export default class Swipe {

    constructor(screen) {

        this.screen = screen;

        this.swipeLtr = document.querySelectorAll('[data-swipe-ltr]');

        this.swipeMobile = document.querySelectorAll('[data-swipe-mobile]');

    }

    eventsListener() {

        this.swipeLtr.forEach(swipe => {

            swipe.addEventListener(swipe.dataset.swipeLtr, event => {

                if(this.screen.getView() === 'ltr') {

                    document.querySelector("#" + swipe.dataset.target).classList.toggle('active');

                }

            });

        });

        this.swipeMobile.forEach(swipe => {

            swipe.addEventListener(swipe.dataset.swipeMobile, event => {

                if(this.screen.getView() === 'mobile') {

                    document.querySelector("#" + swipe.dataset.target).classList.toggle('active');

                }

            });

        });

    }

}