let slider = () => {

    run = () => {

        this.frames = document.querySelectorAll('.slider-av[data-slider]');

        this.sliders = [];

        if(this.frames.length > 0) {

            this.frames.forEach(frame => {

                let parent = frame.dataset.slider;

                let slider = {
                    "parent": parent,
                    "frame": frame,
                    "controls": [],
                    "items" : [],
                    "size": 0,
                    "display": Number.parseInt(frame.dataset.sliderDisplay),
                    "cursor": 0
                };

                let controls = frame.querySelectorAll(`button[data-slider-parent="${parent}"][data-slider-type="control"][data-slider-control]`);

                controls.forEach(control => {

                    slider.controls.push({

                        "element": control,
                        "action": control.dataset.sliderControl

                    });

                });

                slider.items = frame.querySelectorAll(`.slider-item[data-slider-parent="${parent}"][data-slider-type="item"]`);

                Object.keys(slider.items).forEach(key => ((key < slider.display)) ? slider.items[key].classList.add('slider-show') : null);

                slider.size = slider.items.length;

                this.sliders.push(slider);

            });

        }

    }

    listeners = () => {

        this.sliders.forEach(slider => {

            slider.controls.forEach(control => {

                control.element.addEventListener('click', event => {

                    if(control.action === "next" && (slider.cursor + slider.display) < slider.size) {

                        slider.cursor++;

                    }

                    if(control.action === "prev" && slider.cursor > 0) {

                        slider.cursor--;

                    }

                    let moov = (slider.cursor + slider.display) - 1;

                    Object.keys(slider.items).forEach(key => (key >= slider.cursor && key <= moov) ? slider.items[key].classList.add('slider-show') : slider.items[key].classList.remove('slider-show'));

                });

            });

        });

    }

    this.run();

    this.listeners();

    return this;

}

slider();