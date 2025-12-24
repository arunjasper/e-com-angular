import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
    selector: '[angularCarouselSlide]',
})
export class CarouselSlideDirective {
    template = inject<TemplateRef<any>>(TemplateRef);
}