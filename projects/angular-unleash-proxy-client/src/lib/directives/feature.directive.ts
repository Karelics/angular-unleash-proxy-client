import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { NgIf } from '@angular/common';
import { Observable, ReplaySubject, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Directive()
export abstract class FeatureDirective extends NgIf<boolean> implements OnInit, OnDestroy {
  protected readonly unleashService = inject(UnleashService);

  private readonly toggleNameSubject = new ReplaySubject<string>(1);
  private readonly destroySubject = new Subject<void>();

  protected abstract toggleState$: (toggleName: string) => Observable<boolean>;

  ngOnInit(): void {
    this.toggleNameSubject.pipe(
      switchMap((toggleName) => this.toggleState$(toggleName)),
      tap((state) => this.update(state)),
      takeUntil(this.destroySubject),
    ).subscribe();
  }

  protected setToggleName(val: string): void {
    this.toggleNameSubject.next(val);
  }

  protected update(state: boolean): void {
    this.ngIf = state;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
