// /*
//  * @Author: raotaohub
//  * @Date: 2022-08-28 14:01:39
//  * @LastEditTime: 2022-08-28 14:01:40
//  * @LastEditors: raotaohub
//  * @FilePath: \empty-project\src\components\Rxjs.tsx
//  * @Description: Edit......
//  */
// import { render } from 'react-dom';
// import * as Rx from 'rxjs';
// import {
//   useObservable,
//   useLayoutObservable,
//   useObservableState,
// } from 'observable-hooks';
// import { pipe } from 'fp-ts/function';
// import React from 'react';

// const log = console.log;
// const warn = console.warn;

// console.clear();

// enum State {
//   PreEnter = 'PreEnter',
//   Entering = 'Entering',
//   Exiting = 'Exiting',
//   Unmounted = 'Unmounted',
// }

// const calculateState = ({
//   shouldShow,
//   transitionDuration,
// }: {
//   shouldShow: boolean;
//   transitionDuration: number;
// }): Rx.Observable<State> => {
//   if (shouldShow) {
//     return Rx.concat(
//       Rx.of(State.PreEnter),
//       pipe(
//         // Wait an animation frame so the browser has a chance to apply the pre-enter styles.
//         Rx.animationFrames(),
//         Rx.take(1),
//         Rx.mapTo(State.Entering)
//       )
//     );
//   } else {
//     return Rx.concat(
//       Rx.of(State.Exiting),
//       pipe(Rx.timer(transitionDuration), Rx.mapTo(State.Unmounted))
//     );
//   }
// };

// const useTransitionState = ({
//   shouldShow,
//   transitionDuration,
// }: {
//   shouldShow: boolean;
//   transitionDuration: number;
// }): State => {
//   const shouldShow$ = useLayoutObservable(
//     Rx.map((inputs) => inputs[0]),
//     [shouldShow]
//   );

//   const state$ = useObservable(() =>
//     pipe(
//       shouldShow$,
//       Rx.skip(1),
//       Rx.switchMap((shouldShow) =>
//         calculateState({ shouldShow, transitionDuration })
//       )
//     )
//   );

//   return useObservableState(state$, () =>
//     shouldShow ? State.Entering : State.Unmounted
//   );
// };

// const Rxjs: React.FC = () => {
//   const [show, setShow] = React.useState(false);

//   const transitionDuration = 2000;
//   const state = useTransitionState({
//     shouldShow: show,
//     transitionDuration,
//   });

//   // Keeping this for debugging purposes
//   console.log(state);

//   return (
//     <>
//       <div>
//         <button
//           type="button"
//           onClick={() => {
//             of('of 操作符').subscribe(
//               (e) => {
//                 log(e);
//               },
//               (e) => {
//                 log(e);
//               }
//             );
//             warn('of', of('of'));

//             of([1, 2, 3], Promise.resolve('我报错好吧')).subscribe(
//               (next) => console.log('next:', next),
//               (err) => console.log('error:', err),
//               () => console.log('the end')
//             );
//           }}
//         >
//           of
//         </button>
//         <p>
//           <h3>创建类 of</h3>
//           <code>
//             {String(`of<T>(...args: (SchedulerLike | T)[]): Observable<T>`)}
//           </code>
//         </p>
//       </div>

//       <div>
//         <button type="button" onClick={() => setShow((x) => x === false)}>
//           form
//         </button>
//         <p>
//           <code>
//             {String(
//               `from<T>(input: any, scheduler?: SchedulerLike): Observable<T>`
//             )}
//           </code>
//         </p>
//       </div>

//       <div>
//         <button type="button" onClick={() => setShow((x) => x === false)}>
//           form
//         </button>
//         <p>
//           <code>
//             {String(
//               `from<T>(input: any, scheduler?: SchedulerLike): Observable<T>`
//             )}
//           </code>
//         </p>
//       </div>

//       <div>
//         <button type="button" onClick={() => setShow((x) => x === false)}>
//           form
//         </button>
//         <p>
//           <code>
//             {String(
//               `from<T>(input: any, scheduler?: SchedulerLike): Observable<T>`
//             )}
//           </code>
//         </p>
//       </div>

//       <div>
//         <button type="button" onClick={() => setShow((x) => x === false)}>
//           Toggle
//         </button>
//         <div>State: {state}</div>
//         {state !== State.Unmounted && (
//           <div
//             style={{
//               transition: `opacity ${transitionDuration}ms`,
//               ...(state === State.PreEnter ? { opacity: 0 } : null),
//               // This technically isn't needed because the initial value will be `1`.
//               ...(state === State.Entering ? { opacity: 1 } : null),
//               ...(state === State.Exiting ? { opacity: 0 } : null),
//             }}
//           >
//             Hello, World!
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// // from<T>(input: any, scheduler?: SchedulerLike): Observable<T>
// export default Rxjs;

// import { of } from 'rxjs';
// import { repeat } from 'rxjs/operators';

// const source = of('Repeat message');
// const example = source.pipe(repeat(3));
// example.subscribe((x) => console.log(x));
