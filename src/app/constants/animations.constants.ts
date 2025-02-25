import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const staggeredFadeIn = trigger('staggeredFadeIn', [
  transition('* => *', [
    // this hides everything right away
    query(':enter', style({ opacity: 0, height: 0 }), { optional: true }),

    // starts to animate things with a stagger in between
    query(':enter', stagger(50, [animate(50, style({ opacity: 1, height: '*', }))]), {
      delay: 0,
      optional: true,
    }),

    // animate things in reverse on leave
    query(':leave', stagger(50, [animate(50, style({ opacity: 0, height: 0 }))]), {
      delay: 0,
      optional: true,
    }),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
