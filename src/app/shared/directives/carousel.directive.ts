import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[carouselItem]'
})
export class CarouselDirective {
    tpl = inject<TemplateRef<any>>(TemplateRef);

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);


    constructor() {
    }

}
