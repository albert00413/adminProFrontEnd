import { Component, OnDestroy } from '@angular/core';
import { interval, map, Observable, retry, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervaloSubs!: Subscription;
  constructor() {   

     this.intervaloSubs = this.retornaIntervalo()
      .subscribe( console.log )
      
  }

  
 ngOnDestroy(): void {
  this.intervaloSubs.unsubscribe();
 }


  retornaIntervalo(): Observable<number>{

    return interval(500)
            .pipe( 
              map( valor => valor +1 ),
              filter( valor => ( valor % 2 === 0) ? true : false ),
              
            );

  }


  retornaObservable() {
    let i = -1;

    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 4){
          clearInterval( intervalo );
          observer.complete();
        }
        if (i === 2){
          observer.error('i llego a D O S');
        }

      }, 1000)

    });


  }

}
