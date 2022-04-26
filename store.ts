import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as contentful from 'contentful';

import { AppSettings } from 'src/app/common/appSettings';
import { Track } from 'src/app/pages/tracks/models/track';

export interface State {
  lang: string;
  tracks: contentful.Entry<Track>[] | undefined;
}

const state: State = {
  lang: AppSettings.LANGUAGES.EN,
  tracks: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((value: any) => value[name]));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
