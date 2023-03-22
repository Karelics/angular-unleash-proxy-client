import { Directive, inject, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { NgIf } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';

@Directive()
export abstract class FeatureDirective extends NgIf<boolean> implements OnInit {
  protected readonly unleashService = inject(UnleashService);

  private _toggleName: string | undefined;

  private readonly destroySubject = new Subject<void>();

  ngOnInit(): void {
      this.unleashService.update$.pipe(
        tap(() => this.update()),
        takeUntil(this.destroySubject),
      ).subscribe();
  }

  protected setToggleName(val: string): void {
    this._toggleName = val;
  }

  protected getToggleName(): string {
    return this._toggleName ?? '';
  }

  protected update(): void {
    this.ngIf = this.stateValue();
  }

  protected abstract stateValue(): boolean;
}
