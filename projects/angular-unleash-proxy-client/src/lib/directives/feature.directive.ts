import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { NgIf, NgIfContext } from '@angular/common';
import { Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export abstract class FeatureDirective implements OnInit {
  protected readonly unleashService = inject(UnleashService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly ngIf = inject(NgIf);

  private readonly toggleNamesSubject = new ReplaySubject<string[]>(1);

  protected abstract toggleState$: (toggleNames: string[]) => Observable<boolean>;

  ngOnInit(): void {
    this.toggleNamesSubject.pipe(
      switchMap((toggleNames) => this.toggleState$(toggleNames)),
      tap((state) => this.update(state)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  protected setToggleNames(names: string[]): void {
    this.toggleNamesSubject.next(names);
  }

  protected update(state: boolean): void {
    this.ngIf.ngIf = state;
  }

  protected setElseTemplate(templateRef: TemplateRef<NgIfContext<boolean>> | null): void {
    this.ngIf.ngIfElse = templateRef;
  }
}
