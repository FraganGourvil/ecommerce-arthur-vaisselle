export default class Filters {

    constructor() {

        this.togglers = document.querySelectorAll('[data-filter]');

    }

    eventsListener() {

        this.togglers.forEach(toggle => {

            toggle.addEventListener('click', event => {

                let list = document.querySelector('#' + toggle.dataset.filter);

                let icon = toggle.parentElement.querySelector('.filter-title i');

                list.classList.toggle('active');

                icon.classList.toggle('close-av');

            });

        });

    }

    updateOnChangeView(view) {


        this.togglers.forEach(toggle => {

            let list = document.querySelector('#' + toggle.dataset.filter);

            if (view === 'mobile') {

                list.classList.remove('active');

            }
            else
            {
                list.classList.add('active');
            }

        });


    }

}