class Toggler {

    constructor() {

        this.togglers = document.querySelectorAll('.action-toggle');

    }

    eventsListener() {

        this.togglers.forEach(toggle => {

            toggle.addEventListener('click', event => {

                let target = document.querySelector('#' + toggle.dataset.target);

                target.classList.toggle('active');

            });

        });

    }

}

export default Toggler;