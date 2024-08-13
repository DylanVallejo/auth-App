import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User , AuthStatus, LoginResponse, CheckTokenResponse} from '../interfaces'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser  = signal< User | null >(null);
  private _authStatus = signal< AuthStatus>( AuthStatus.checking );


  //!al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed ( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
    // this.onLogOut().subscribe();
  }

  private setAuthentication( user:User, token:string ) : boolean {
    this._currentUser.set( user );
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }



  login(email: string , password:string) : Observable<boolean> {


    const url =`${this.baseUrl}/auth/login`
    const body = { email, password }; //  { email:email, password:password }

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({ user,token }) => this.setAuthentication(user,token)),
      catchError( err => throwError( () => err.error))
    );
    // return of(true);
  }

  checkAuthStatus(  ):Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token || token === null) {
      this._currentUser.set(null)
      localStorage.removeItem('token')
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false)
    };

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${ token }`);
    return this.http.get<CheckTokenResponse>(url, {headers})
    .pipe(
      map( ({ user,token }) => this.setAuthentication(user,token) ),
      catchError(()=> {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false)}
      )
    )

  }

  onLogOut() : Observable< boolean >{
    this._currentUser.set( null );
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token')
    return of(true);
  }

  register(email: string, name: string, password: string):Observable<boolean>{

    const body  = {email, name, password};
    const url = `${this.baseUrl}/auth/register`

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthentication(user, token)),
      catchError(err => throwError(()=> err.error))
    );
  }

  createuser(){
    this._authStatus.set(AuthStatus.checking);
  }

}
