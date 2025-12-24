import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[carouselItem]'
})
export class CarouselDirective {
    tpl = inject<TemplateRef<any>>(TemplateRef);
}
