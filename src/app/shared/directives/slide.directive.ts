import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
    selector: '[angularCarouselSlide]',
})
export class CarouselSlideDirective {
    template = inject<TemplateRef<any>>(TemplateRef);

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
    }
}