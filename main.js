"use strict";
(self["webpackChunkportfolio_angular"] = self["webpackChunkportfolio_angular"] || []).push([["main"],{

/***/ 4086:
/*!**************************************************!*\
  !*** ./src/app/admin/auth/store/auth.actions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authenticateFail": () => (/* binding */ authenticateFail),
/* harmony export */   "authenticateSuccess": () => (/* binding */ authenticateSuccess),
/* harmony export */   "autoLogin": () => (/* binding */ autoLogin),
/* harmony export */   "clearError": () => (/* binding */ clearError),
/* harmony export */   "loginStart": () => (/* binding */ loginStart),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "signUpStart": () => (/* binding */ signUpStart)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const authenticateSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Authenticate Success', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const loginStart = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Login Start', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const signUpStart = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Signup Start', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const logout = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Logout');
const authenticateFail = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Authenticate fail', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const clearError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Clear Error');
const autoLogin = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Auth] Auto Login');

/***/ }),

/***/ 4668:
/*!**************************************************!*\
  !*** ./src/app/admin/auth/store/auth.effects.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthEffects": () => (/* binding */ AuthEffects)
/* harmony export */ });
/* harmony import */ var _core_models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/models/user */ 8443);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 4139);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 9095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 7418);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.actions */ 4086);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/auth/auth.service */ 7990);











class AuthEffects {
  constructor(actions$, http, router, authService) {
    this.actions$ = actions$;
    this.http = http;
    this.router = router;
    this.authService = authService;
    this.authSignUp$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.signUpStart), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(action => {
      return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_AUTH_FIREBASE_SIGNUP}${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_KEY_FIREBASE}`, {
        email: action.email,
        password: action.password,
        returnSecureToken: true
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(respData => {
        this.authService.setAutoLogout(+respData.expiresIn * 1000);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(resData => this.handleAuthentication(resData)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    })));
    this.authLogout$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.logout), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(() => {
      localStorage.removeItem('userData');
    })), {
      dispatch: false
    });
    this.authLogin$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.autoLogin), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {
          type: 'no user available'
        };
      }
      const loadedUser = new _core_models_user__WEBPACK_IMPORTED_MODULE_0__.CurrentUser(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setAutoLogout(expirationDuration);
        return _auth_actions__WEBPACK_IMPORTED_MODULE_2__.authenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return {
        type: 'no token available'
      };
    })));
    this.authSignIn$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.loginStart), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(action => {
      return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_AUTH_FIREBASE_SIGNIN}${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_KEY_FIREBASE}`, {
        email: action.email,
        password: action.password,
        returnSecureToken: true
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(respData => {
        this.authService.setAutoLogout(+respData.expiresIn * 1000);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(resData => this.handleAuthentication(resData)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    })));
    this.authRedirect$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.authenticateSuccess), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(() => {
      this.router.navigate(['/', 'dashboard']);
    })), {
      dispatch: false
    });
    this.authRedirectLogout$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.logout), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(() => {
      this.router.navigate(['/', 'dashboard', 'auth']);
      this.authService.clearLogoutTimer();
    })), {
      dispatch: false
    });
  }
  handleError(errorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.authenticateFail({
        errorMessage
      }));
    }
    switch (errorResponse.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'Passwords is incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email is not register';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user as been disabled';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This user is already registered';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts try later';
        break;
      default:
        errorMessage = errorResponse.error.error.message;
        break;
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_2__.authenticateFail({
      errorMessage
    }));
  }
  handleAuthentication(responseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    const user = new _core_models_user__WEBPACK_IMPORTED_MODULE_0__.CurrentUser(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return _auth_actions__WEBPACK_IMPORTED_MODULE_2__.authenticateSuccess({
      email: responseData.email,
      userId: responseData.localId,
      token: responseData.idToken,
      expirationDate
    });
  }
}
AuthEffects.ɵfac = function AuthEffects_Factory(t) {
  return new (t || AuthEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_4__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService));
};
AuthEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
  token: AuthEffects,
  factory: AuthEffects.ɵfac
});


/***/ }),

/***/ 7881:
/*!**************************************************!*\
  !*** ./src/app/admin/auth/store/auth.reducer.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authReducer": () => (/* binding */ authReducer)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _core_models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/models/user */ 8443);
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.actions */ 4086);



const initialState = {
  user: null,
  authError: null,
  loading: false
};
const _authReducer = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.createReducer)(initialState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.loginStart, _auth_actions__WEBPACK_IMPORTED_MODULE_1__.signUpStart, (state, action) => ({
  ...state,
  user: null,
  authError: null,
  loading: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.logout, (state, action) => ({
  ...state,
  user: null,
  uthError: null,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.authenticateSuccess, (state, action) => ({
  ...state,
  user: new _core_models_user__WEBPACK_IMPORTED_MODULE_0__.CurrentUser(action.email, action.userId, action.token, action.expirationDate),
  authError: null,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.authenticateFail, (state, action) => ({
  ...state,
  authError: action.errorMessage,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.clearError, (state, action) => ({
  ...state,
  authError: null
})));
function authReducer(state, action) {
  return _authReducer(state, action);
}

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _landing_page_components_about_about_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing-page/components/about/about.component */ 1266);
/* harmony import */ var _landing_page_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landing-page/components/contact/contact.component */ 8682);
/* harmony import */ var _landing_page_components_projects_projects_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./landing-page/components/projects/projects.component */ 7066);
/* harmony import */ var _landing_page_components_skill_bar_skill_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./landing-page/components/skill-bar/skill-bar.component */ 5860);
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./landing-page/landing-page.component */ 4229);
/* harmony import */ var _layout_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout/layout.component */ 6674);
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ 439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);










const routes = [{
  path: '',
  component: _layout_layout_component__WEBPACK_IMPORTED_MODULE_5__.LayoutComponent,
  children: [{
    path: '',
    component: _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_4__.LandingPageComponent
  }, {
    path: 'about',
    component: _landing_page_components_about_about_component__WEBPACK_IMPORTED_MODULE_0__.AboutComponent
  }, {
    path: 'projects',
    component: _landing_page_components_projects_projects_component__WEBPACK_IMPORTED_MODULE_2__.ProjectsComponent
  }, {
    path: 'contact',
    component: _landing_page_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__.ContactComponent
  }, {
    path: 'skills',
    component: _landing_page_components_skill_bar_skill_bar_component__WEBPACK_IMPORTED_MODULE_3__.SkillBarComponent
  }]
}, {
  path: 'dashboard',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_admin_admin_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./admin/admin.module */ 7095)).then(m => m.AdminModule)
}, {
  path: '**',
  component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_6__.PageNotFoundComponent
}];
class AppRoutingModule {}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
  return new (t || AppRoutingModule)();
};
AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: AppRoutingModule
});
AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
  });
})();

/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _admin_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/auth/store/auth.actions */ 4086);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/auth/auth.service */ 7990);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 6679);





class AppComponent {
  constructor(auth, store) {
    this.auth = auth;
    this.store = store;
  }
  ngOnInit() {
    this.store.dispatch(_admin_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.autoLogin());
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 1,
  vars: 0,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _landing_page_components_projects_projects_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./landing-page/components/projects/projects.component */ 7066);
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./landing-page/landing-page.component */ 4229);
/* harmony import */ var _layout_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/layout.component */ 6674);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/shared.module */ 4466);
/* harmony import */ var _landing_page_components_hero_hero_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./landing-page/components/hero/hero.component */ 1979);
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/core.module */ 294);
/* harmony import */ var _landing_page_components_projects_card_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./landing-page/components/projects/card/card.component */ 8157);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ 9240);
/* harmony import */ var _landing_page_components_skill_bar_skill_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./landing-page/components/skill-bar/skill-bar.component */ 5860);
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ 439);
/* harmony import */ var _core_services_auth_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/services/auth/auth-interceptor.service */ 2318);
/* harmony import */ var _landing_page_components_projects_store_projects_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./landing-page/components/projects/store/projects.effects */ 6124);
/* harmony import */ var _store_app_reduce__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./store/app.reduce */ 713);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngrx/store-devtools */ 203);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _admin_auth_store_auth_effects__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./admin/auth/store/auth.effects */ 4668);
/* harmony import */ var _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/components/button/button.component */ 42);
/* harmony import */ var _landing_page_components_about_about_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./landing-page/components/about/about.component */ 1266);
/* harmony import */ var _landing_page_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./landing-page/components/contact/contact.component */ 8682);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 6839);





























class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HTTP_INTERCEPTORS,
    useClass: _core_services_auth_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_11__.HeaderInterceptor,
    multi: true
  }],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _core_core_module__WEBPACK_IMPORTED_MODULE_7__.CoreModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_23__.StoreModule.forRoot(_store_app_reduce__WEBPACK_IMPORTED_MODULE_13__.appReducer), _ngrx_effects__WEBPACK_IMPORTED_MODULE_24__.EffectsModule.forRoot([_admin_auth_store_auth_effects__WEBPACK_IMPORTED_MODULE_15__.AuthEffects, _landing_page_components_projects_store_projects_effects__WEBPACK_IMPORTED_MODULE_12__.ProjectsEffects]), _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_25__.StoreDevtoolsModule.instrument({
    logOnly: src_environments_environment__WEBPACK_IMPORTED_MODULE_14__.environment.production
  }), _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_16__.ButtonComponent]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_3__.LandingPageComponent, _layout_layout_component__WEBPACK_IMPORTED_MODULE_4__.LayoutComponent, _landing_page_components_hero_hero_component__WEBPACK_IMPORTED_MODULE_6__.HeroComponent, _landing_page_components_projects_card_card_component__WEBPACK_IMPORTED_MODULE_8__.CardComponent, _landing_page_components_projects_projects_component__WEBPACK_IMPORTED_MODULE_2__.ProjectsComponent, _landing_page_components_skill_bar_skill_bar_component__WEBPACK_IMPORTED_MODULE_9__.SkillBarComponent, _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__.PageNotFoundComponent, _landing_page_components_about_about_component__WEBPACK_IMPORTED_MODULE_17__.AboutComponent, _landing_page_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_18__.ContactComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _core_core_module__WEBPACK_IMPORTED_MODULE_7__.CoreModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_23__.StoreRootModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_24__.EffectsRootModule, _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_25__.StoreDevtoolsModule, _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_16__.ButtonComponent]
  });
})();

/***/ }),

/***/ 294:
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoreModule": () => (/* binding */ CoreModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _services_skills_skills_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/skills/skills.service */ 5798);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);



class CoreModule {}
CoreModule.ɵfac = function CoreModule_Factory(t) {
  return new (t || CoreModule)();
};
CoreModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: CoreModule
});
CoreModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [_services_skills_skills_service__WEBPACK_IMPORTED_MODULE_0__.SkillsService],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CoreModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
  });
})();

/***/ }),

/***/ 363:
/*!***************************************************!*\
  !*** ./src/app/core/models/tech-category.enum.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TechCategory": () => (/* binding */ TechCategory)
/* harmony export */ });
var TechCategory;
(function (TechCategory) {
  TechCategory[TechCategory["Frontend"] = 1] = "Frontend";
  TechCategory[TechCategory["Backend"] = 2] = "Backend";
  TechCategory[TechCategory["Cloud"] = 3] = "Cloud";
  TechCategory[TechCategory["Database"] = 4] = "Database";
  TechCategory[TechCategory["TestingFramework"] = 5] = "TestingFramework";
})(TechCategory || (TechCategory = {}));

/***/ }),

/***/ 8443:
/*!*************************************!*\
  !*** ./src/app/core/models/user.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentUser": () => (/* binding */ CurrentUser)
/* harmony export */ });
class CurrentUser {
  constructor(email, id,
  // tslint:disable-next-line: variable-name
  _token,
  // tslint:disable-next-line: variable-name
  _tokenExpirationDate) {
    this.email = email;
    this.id = id;
    this._token = _token;
    this._tokenExpirationDate = _tokenExpirationDate;
  }
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

/***/ }),

/***/ 2122:
/*!************************************************!*\
  !*** ./src/app/core/services/about.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutService": () => (/* binding */ AboutService)
/* harmony export */ });
/* harmony import */ var _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/models/tech-category.enum */ 363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);


class AboutService {
  constructor() {
    this.techStack = [{
      categoryTitle: 'Frontend Developer',
      techCategoryEnum: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend,
      imgUrl: 'assets/img/typescript.png',
      description: 'As a Frontend Senior Developer with expertise in Angular and React, I bring a wealth of knowledge and hands-on experience in developing modern and intuitive web applications. I am committed to delivering high-quality code, following industry best practices, and creating exceptional user interfaces that leave a lasting impact.',
      rtl: false
    }, {
      categoryTitle: 'Backend Developer',
      techCategoryEnum: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend,
      imgUrl: 'assets/img/node.png',
      description: 'As a Backend Senior Developer, I bring a wealth of knowledge and hands-on experience in designing and building scalable, performant, and secure server-side applications. I am dedicated to delivering high-quality code, following best practices, and leveraging the latest technologies to create reliable and efficient backend systems.',
      rtl: true
    }, {
      categoryTitle: 'Databases',
      techCategoryEnum: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Database,
      imgUrl: 'assets/img/sql.png',
      description: 'I am proficient in working with a variety of database technologies, including both SQL-based (such as  MySQL, PostgreSQL) and NoSQL-based (such as MongoDB) systems. I have a solid understanding of data modeling principles, normalization, and denormalization techniques, enabling me to design efficient and well-structured database schemas.',
      rtl: false
    }, {
      categoryTitle: 'Testing Developer',
      techCategoryEnum: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.TestingFramework,
      imgUrl: 'assets/img/testing.png',
      description: 'I have a strong understanding of different testing types, including functional testing, regression testing, integration testing, and user acceptance testing. I am skilled in identifying and prioritizing test cases based on risk analysis and requirements, ensuring maximum test coverage.',
      rtl: true
    }, {
      categoryTitle: 'Cloud Developer',
      techCategoryEnum: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Cloud,
      imgUrl: 'assets/img/aws.png',
      description: 'I am proficient in working with major cloud platforms such as AWS. I have a solid understanding of cloud services, including compute, storage, networking, databases, and serverless architectures. I am skilled in leveraging cloud infrastructure-as-a-service (IaaS), platform-as-a-service (PaaS), and software-as-a-service (SaaS) offerings to build scalable and resilient applications.',
      rtl: false
    }];
  }
  getTechStack() {
    return this.techStack;
  }
}
AboutService.ɵfac = function AboutService_Factory(t) {
  return new (t || AboutService)();
};
AboutService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: AboutService,
  factory: AboutService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 2318:
/*!****************************************************************!*\
  !*** ./src/app/core/services/auth/auth-interceptor.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderInterceptor": () => (/* binding */ HeaderInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 3910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 7990);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ 4307);





class HeaderInterceptor {
  constructor(auth, store) {
    this.auth = auth;
    this.store = store;
  }
  intercept(req, next) {
    return this.store.select('auth').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(authState => authState.user), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.exhaustMap)(user => {
      if (!user) {
        return next.handle(req);
      }
      const authReq = req.clone({
        params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpParams().set('auth', user.token)
      });
      return next.handle(authReq);
    }));
  }
}
HeaderInterceptor.ɵfac = function HeaderInterceptor_Factory(t) {
  return new (t || HeaderInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_6__.Store));
};
HeaderInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: HeaderInterceptor,
  factory: HeaderInterceptor.ɵfac
});


/***/ }),

/***/ 7990:
/*!****************************************************!*\
  !*** ./src/app/core/services/auth/auth.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _admin_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../admin/auth/store/auth.actions */ 4086);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ 4307);



class AuthService {
  constructor(store) {
    this.store = store;
  }
  setAutoLogout(expirationDuration) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(_admin_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.logout());
    }, expirationDuration);
  }
  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
AuthService.ɵfac = function AuthService_Factory(t) {
  return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.Store));
};
AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: AuthService,
  factory: AuthService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 5300:
/*!*********************************************************!*\
  !*** ./src/app/core/services/file-downloads.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDownloadsService": () => (/* binding */ FileDownloadsService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);



class FileDownloadsService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient);
  }
  download(url) {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}
FileDownloadsService.ɵfac = function FileDownloadsService_Factory(t) {
  return new (t || FileDownloadsService)();
};
FileDownloadsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: FileDownloadsService,
  factory: FileDownloadsService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 651:
/*!**********************************************!*\
  !*** ./src/app/core/services/nav.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavService": () => (/* binding */ NavService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class NavService {
  constructor() {
    this.navLinks = [{
      title: 'Home',
      link: '/'
    }, {
      title: 'Dashboard',
      link: 'dashboard'
    }, {
      title: 'About',
      link: 'about'
    }, {
      title: 'Projects',
      link: 'projects'
    }, {
      title: 'Skills',
      link: 'skills'
    }, {
      title: 'Contact',
      link: 'contact'
    }];
  }
  getNavLinks() {
    return this.navLinks;
  }
}
NavService.ɵfac = function NavService_Factory(t) {
  return new (t || NavService)();
};
NavService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: NavService,
  factory: NavService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 5798:
/*!********************************************************!*\
  !*** ./src/app/core/services/skills/skills.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillsService": () => (/* binding */ SkillsService)
/* harmony export */ });
/* harmony import */ var _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/models/tech-category.enum */ 363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);


class SkillsService {
  constructor() {
    this.startYear = new Date('01/01/2017');
    this.overAllYearsOfExperience = this.getOverAllYearsOfExperience();
    this.skills = [{
      name: 'Angular',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'My expertise lies in leveraging Angular\'s powerful features such as component-based architecture, dependency injection, and reactive programming using RxJS. I have successfully built and maintained large-scale applications, utilizing Angular\'s comprehensive tooling and development ecosystem.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'React',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I possess extensive expertise in React, a popular JavaScript library for building user interfaces. With several years of experience, I have developed a deep understanding of React\'s core concepts, component-based architecture, and its robust ecosystem.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'Node.js',
      knowledge: 100,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'in Node.js, I have established a strong foundation in server-side JavaScript development. I possess in-depth knowledge and expertise in leveraging Node.js to build scalable and high-performance web applications.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend
    }, {
      name: 'Css',
      knowledge: 100,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With a strong command over CSS (Cascading Style Sheets), I possess the skills to create visually appealing and engaging user interfaces. I have developed expertise in leveraging CSS to style and layout web pages with precision and creativity.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'MondoDB',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in MongoDB, I possess a strong understanding of this NoSQL database technology and its application in modern web development. I have successfully utilized MongoDB to build scalable and flexible data storage solutions.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Database
    }, {
      name: 'Typescript',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I am skilled in leveraging TypeScript\'s powerful tooling and language features to facilitate efficient development workflows. I am proficient in utilizing TypeScript\'s transpilation process to convert TypeScript code into JavaScript that runs on different platforms and browsers.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'Tailwind',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'My proficiency in Tailwind CSS lies in its unique approach of using utility classes to style and design web interfaces. I am skilled in leveraging Tailwind CSS\'s extensive collection of utility classes to rapidly prototype and build user interfaces with minimal custom CSS.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'Nest.js',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'Nest.js combines the best practices of object-oriented programming, functional programming, and the modular architecture of frameworks like Angular. I am skilled in leveraging Nest.js\'s features, such as decorators, dependency injection, and decorators, to create highly organized and testable code.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend
    }, {
      name: 'AWS',
      knowledge: 100,
      // proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I am proficient in utilizing AWS core services, including Amazon EC2 for virtual server provisioning, Amazon S3 for scalable object storage, and Amazon RDS for managed relational databases. I have experience in leveraging these services to build highly available and fault-tolerant architectures.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Cloud
    }, {
      name: 'Express',
      knowledge: 100,
      proficient: true,
      logo: 'https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I am skilled in building RESTful APIs using Express.js, adhering to best practices for resource naming, HTTP methods, and status codes. I can effectively handle data validation, input sanitization, and response formatting to ensure the integrity and security of the API.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend
    }, {
      name: 'Javascript',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in JavaScript, I bring a strong understanding of this versatile programming language to my web development projects. With 8 years of experience, I have successfully utilized JavaScript to build dynamic and interactive web applications.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: 'MySql',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in MySQL, I possess a strong understanding of this popular open-source relational database management system. With [X] years of experience, I have successfully utilized MySQL to design, develop, and maintain efficient and reliable databases for various web applications.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Database
    }, {
      name: 'PostgreSQL',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I am proficient in creating and optimizing database schemas, tables, and indexes using PostgreSQL\'s SQL (Structured Query Language). I have a deep understanding of SQL syntax, enabling me to write complex queries, joins, and subqueries to retrieve and manipulate data effectively.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Database
    }, {
      name: 'C#',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-line.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'C# is a powerful and modern object-oriented language that is widely used in the development of desktop, web, and mobile applications. I am proficient in leveraging C#\'s features such as strong typing, automatic memory management, and extensive standard libraries to write clean, maintainable, and efficient code.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend
    }, {
      name: 'Git',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in Git, I possess a strong understanding of this distributed version control system, which is widely used in software development projects.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }, {
      name: '.Net Core',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in .NET Core, I possess a strong understanding of this powerful and cross-platform framework for building modern web, desktop, and cloud applications.  I have successfully utilized .NET Core to develop scalable, high-performance, and maintainable software solutions.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Backend
    }, {
      name: 'Jasmine',
      knowledge: 100,
      // proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jasmine/jasmine-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in Jasmine, I possess a strong understanding of this popular JavaScript testing framework used for behavior-driven development (BDD) and unit testing.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.TestingFramework
    }, {
      name: 'Jest',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'With expertise in Jest, I possess a strong understanding of this popular JavaScript testing framework used for unit testing, integration testing, and snapshot testing.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.TestingFramework
    }, {
      name: 'Karma',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/karma/karma-original.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'By adopting the Karma Developer Unit Testing methodology, developers can gain confidence in the correctness of their karma-related code units. It helps uncover bugs, edge cases, and inconsistencies, allowing developers to fix issues early in the development cycle.',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.TestingFramework
    }, {
      name: 'HTML',
      knowledge: 100,
      proficient: true,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg',
      yearsOfExperience: this.overAllYearsOfExperience,
      description: 'I am well-versed in utilizing HTML best practices for accessibility, including providing alternative text for images, using semantic tags, and structuring content to be screen reader-friendly. ',
      category: _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory.Frontend
    }];
  }
  getAllSkills() {
    return this.skills;
  }
  getOverAllYearsOfExperience() {
    let diff = (new Date().getTime() - this.startYear.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
  }
}
SkillsService.ɵfac = function SkillsService_Factory(t) {
  return new (t || SkillsService)();
};
SkillsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: SkillsService,
  factory: SkillsService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 1266:
/*!******************************************************************!*\
  !*** ./src/app/landing-page/components/about/about.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutComponent": () => (/* binding */ AboutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/models/tech-category.enum */ 363);
/* harmony import */ var _core_services_about_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/about.service */ 2122);
/* harmony import */ var _core_services_file_downloads_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/file-downloads.service */ 5300);
/* harmony import */ var _core_services_skills_skills_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/skills/skills.service */ 5798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/button/button.component */ 42);
/* harmony import */ var _shared_components_category_tech_skill_category_tech_skill_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/components/category-tech-skill/category-tech-skill.component */ 3535);
/* harmony import */ var _shared_components_banner_banner_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/banner/banner.component */ 3228);










function AboutComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "app-category-tech-skill", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tech_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("skills", ctx_r0.skills)("cateroryTitle", tech_r1.categoryTitle)("techCategoryEnum", tech_r1.techCategoryEnum)("imgUrl", tech_r1.imgUrl)("rtl", tech_r1.rtl);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", tech_r1.description, " ");
  }
}
class AboutComponent {
  constructor() {
    this.downloadsServices = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(_core_services_file_downloads_service__WEBPACK_IMPORTED_MODULE_2__.FileDownloadsService);
    this.skillServices = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(_core_services_skills_skills_service__WEBPACK_IMPORTED_MODULE_3__.SkillsService);
    this.aboutService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(_core_services_about_service__WEBPACK_IMPORTED_MODULE_1__.AboutService);
    this.techCategoryEnum = _core_models_tech_category_enum__WEBPACK_IMPORTED_MODULE_0__.TechCategory;
  }
  ngOnInit() {
    this.skills = this.skillServices.getAllSkills();
    this.techStack = this.aboutService.getTechStack();
  }
  downloadResumen() {
    this.downloadsServices.download('/assets/doc/davidResumen.pdf').subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'JesusDuarteResumen.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) {
  return new (t || AboutComponent)();
};
AboutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: AboutComponent,
  selectors: [["app-about"]],
  decls: 14,
  vars: 1,
  consts: [[1, "rounded-2xl", "py-10"], ["src", "assets/img/david_profile.jpg", "alt", "Profile picture", 1, "mx-auto", "h-48", "w-48", "rounded-full", "md:h-56", "md:w-56"], [1, "mx-auto", "text-center"], [1, "mt-10", "flex", "items-center", "justify-center", "gap-x-6"], [3, "clickEvent"], [4, "ngFor", "ngForOf"], [3, "skills", "cateroryTitle", "techCategoryEnum", "imgUrl", "rtl"]],
  template: function AboutComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-banner")(1, "figure", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "img", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 2)(4, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "Jesus David Duarte");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Software Engineer");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Highly skilled and innovative Software Engineer with a strong background in developing and implementing cutting-edge software solutions.");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 3)(11, "app-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("clickEvent", function AboutComponent_Template_app_button_clickEvent_11_listener() {
        return ctx.downloadResumen();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12, "Get Resume Here");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, AboutComponent_ng_container_13_Template, 3, 6, "ng-container", 5);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.techStack);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_4__.ButtonComponent, _shared_components_category_tech_skill_category_tech_skill_component__WEBPACK_IMPORTED_MODULE_5__.CategoryTechSkillComponent, _shared_components_banner_banner_component__WEBPACK_IMPORTED_MODULE_6__.BannerComponent],
  styles: [".about-section[_ngcontent-%COMP%] {\n  padding-top: 5rem;\n  background: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.8) 100%);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGdHQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuYWJvdXQtc2VjdGlvbiB7XG4gIHBhZGRpbmctdG9wOiA1cmVtO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gYm90dG9tLFxuICAgICMwMDAgMCUsXG4gICAgcmdiYSgwLCAwLCAwLCAwLjkpIDc1JSxcbiAgICByZ2JhKDAsIDAsIDAsIDAuOCkgMTAwJVxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 8682:
/*!**********************************************************************!*\
  !*** ./src/app/landing-page/components/contact/contact.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactComponent": () => (/* binding */ ContactComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/components/button/button.component */ 42);


class ContactComponent {
  constructor() {}
  ngOnInit() {}
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) {
  return new (t || ContactComponent)();
};
ContactComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ContactComponent,
  selectors: [["app-contact"]],
  decls: 76,
  vars: 0,
  consts: [[1, "relative", "isolate", "bg-gray-950"], [1, "mx-auto", "grid", "max-w-7xl", "grid-cols-1", "lg:grid-cols-2"], [1, "relative", "px-6", "pb-20", "pt-24", "sm:pt-32", "lg:static", "lg:px-8", "lg:py-48"], [1, "mx-auto", "max-w-xl", "lg:mx-0", "lg:max-w-lg"], [1, "absolute", "inset-y-0", "left-0", "-z-10", "w-full", "overflow-hidden", "ring-1", "ring-white/5", "lg:w-1/2"], ["aria-hidden", "true", 1, "absolute", "inset-0", "h-full", "w-full", "stroke-gray-700", "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"], ["id", "54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2", "width", "200", "height", "200", "x", "100%", "y", "-1", "patternUnits", "userSpaceOnUse"], ["d", "M130 200V.5M.5 .5H200", "fill", "none"], ["x", "100%", "y", "-1", 1, "overflow-visible", "fill-gray-800/20"], ["d", "M-470.5 0h201v201h-201Z", "stroke-width", "0"], ["width", "100%", "height", "100%", "stroke-width", "0", "fill", "url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"], ["aria-hidden", "true", 1, "absolute", "-left-56", "top-[calc(100%-13rem)]", "transform-gpu", "blur-3xl", "lg:left-[max(-14rem,calc(100%-59rem))]", "lg:top-[calc(50%-7rem)]"], [1, "aspect-[1155/678]", "w-[72.1875rem]", "bg-gradient-to-br", "from-[#ff80b5]", "to-[#9089fc]", "opacity-20", 2, "clip-path", "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"], [1, "text-3xl", "font-bold", "tracking-tight", "text-white"], [1, "mt-6", "text-lg", "leading-8", "text-gray-300"], [1, "mt-10", "space-y-4", "text-base", "leading-7", "text-gray-300"], [1, "flex", "gap-x-4"], [1, "flex-none"], [1, "sr-only"], ["fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", "aria-hidden", "true", 1, "h-7", "w-6", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"], ["href", "tel:+1 (555) 234-5678", 1, "hover:text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"], ["href", "mailto:hello@example.com", 1, "hover:text-white"], ["action", "#", "method", "POST", 1, "px-6", "pb-24", "pt-20", "sm:pb-32", "lg:px-8", "lg:py-48"], [1, "mx-auto", "max-w-xl", "lg:mr-0", "lg:max-w-lg"], [1, "grid", "grid-cols-1", "gap-x-8", "gap-y-6", "sm:grid-cols-2"], ["for", "first-name", 1, "block", "text-sm", "font-semibold", "leading-6", "text-white"], [1, "mt-2.5"], ["type", "text", "name", "first-name", "id", "first-name", "autocomplete", "given-name", 1, "block", "w-full", "rounded-md", "border-0", "bg-white/5", "px-3.5", "py-2", "text-white", "shadow-sm", "ring-1", "ring-inset", "ring-white/10", "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6"], ["for", "last-name", 1, "block", "text-sm", "font-semibold", "leading-6", "text-white"], ["type", "text", "name", "last-name", "id", "last-name", "autocomplete", "family-name", 1, "block", "w-full", "rounded-md", "border-0", "bg-white/5", "px-3.5", "py-2", "text-white", "shadow-sm", "ring-1", "ring-inset", "ring-white/10", "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6"], [1, "sm:col-span-2"], ["for", "email", 1, "block", "text-sm", "font-semibold", "leading-6", "text-white"], ["type", "email", "name", "email", "id", "email", "autocomplete", "email", 1, "block", "w-full", "rounded-md", "border-0", "bg-white/5", "px-3.5", "py-2", "text-white", "shadow-sm", "ring-1", "ring-inset", "ring-white/10", "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6"], ["for", "phone-number", 1, "block", "text-sm", "font-semibold", "leading-6", "text-white"], ["type", "tel", "name", "phone-number", "id", "phone-number", "autocomplete", "tel", 1, "block", "w-full", "rounded-md", "border-0", "bg-white/5", "px-3.5", "py-2", "text-white", "shadow-sm", "ring-1", "ring-inset", "ring-white/10", "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6"], ["for", "message", 1, "block", "text-sm", "font-semibold", "leading-6", "text-white"], ["name", "message", "id", "message", "rows", "4", 1, "block", "w-full", "rounded-md", "border-0", "bg-white/5", "px-3.5", "py-2", "text-white", "shadow-sm", "ring-1", "ring-inset", "ring-white/10", "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6"], [1, "mt-8", "flex", "justify-end"]],
  template: function ContactComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "svg", 5)(6, "defs")(7, "pattern", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "path", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "svg", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "path", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "rect", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "h2", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Get in touch");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "p", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Please reach me out to work with oyu or your organization");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "dl", 15)(19, "div", 16)(20, "dt", 17)(21, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Address");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "svg", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "path", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "dd");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "3760 Metro Parkway Fort Myers, FL 33916");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 16)(28, "dt", 17)(29, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Telephone");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "svg", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "path", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "dd")(34, "a", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "+1 (239) 628-9725");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 16)(37, "dt", 17)(38, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "svg", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](41, "path", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "dd")(43, "a", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "jduartedsp@gmail.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "form", 25)(46, "div", 26)(47, "div", 27)(48, "div")(49, "label", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "First name");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](52, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "div")(54, "label", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, "Last name");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](57, "input", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "div", 33)(59, "label", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](62, "input", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "div", 33)(64, "label", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "Phone number");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](67, "input", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 33)(69, "label", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](70, "Message");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](72, "textarea", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div", 40)(74, "app-button");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](75, "Send message");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
    }
  },
  dependencies: [_shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_0__.ButtonComponent],
  styles: [".contact-section[_ngcontent-%COMP%] {\n  padding-top: 5rem;\n}\n\n.contact-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  border: 0;\n  border-bottom: 0.25rem solid #64a19d;\n}\n\n.card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n.card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #64a19d;\n  text-decoration: underline;\n}\n\n.contact-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border-color: #64a19d;\n  border-width: 0.25rem;\n  width: 3rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0Esc0NBQUE7RUFDQSxzQkFBQTtBQUNGO0FBQUU7RUFDRSxjQUFBO0VBQ0EsMEJBQUE7QUFFSjs7QUFFQTtFQUNFLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFjdC1zZWN0aW9uIHtcbiAgcGFkZGluZy10b3A6IDVyZW07XG59XG5cbi5jb250YWN0LXNlY3Rpb24gLmNhcmQge1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1ib3R0b206IDAuMjVyZW0gc29saWQgIzY0YTE5ZDtcbn1cblxuLmNhcmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNsaXA6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMjUpO1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICBhIHtcbiAgICBjb2xvcjogIzY0YTE5ZDtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxufVxuXG4uY29udGFjdC1zZWN0aW9uIC5jYXJkIGhyIHtcbiAgYm9yZGVyLWNvbG9yOiAjNjRhMTlkO1xuICBib3JkZXItd2lkdGg6IDAuMjVyZW07XG4gIHdpZHRoOiAzcmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 1979:
/*!****************************************************************!*\
  !*** ./src/app/landing-page/components/hero/hero.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeroComponent": () => (/* binding */ HeroComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/components/button/button.component */ 42);




class HeroComponent {
  constructor() {
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router);
  }
  ngOnInit() {}
  getStarted() {
    this.router.navigate(['/about']);
  }
}
HeroComponent.ɵfac = function HeroComponent_Factory(t) {
  return new (t || HeroComponent)();
};
HeroComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: HeroComponent,
  selectors: [["app-hero"]],
  decls: 12,
  vars: 0,
  consts: [[1, "hero"], [1, "container", "px-4", "px-lg-5", "d-flex", "h-100", "align-items-center", "justify-content-center"], [1, "d-flex", "justify-content-center"], [1, "text-center"], [1, "fs-3", "mx-auto", "my-0", "text-uppercase", "animate__animated", "animate__fadeInUp", "animate__slow"], [1, "text-white-50", "mx-auto", "mt-2", "mb-5", "animate__animated", "animate__fadeIn", "animate__delay-2s"], [3, "clickEvent"]],
  template: function HeroComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Jesus David Duarte ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Software Engineer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "h2", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Professional fullstack Web Developer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "app-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("clickEvent", function HeroComponent_Template_app_button_clickEvent_10_listener() {
        return ctx.getStarted();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Get Started");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    }
  },
  dependencies: [_shared_components_button_button_component__WEBPACK_IMPORTED_MODULE_0__.ButtonComponent],
  styles: [".hero[_ngcontent-%COMP%] {\n  height: 100vh;\n  padding: 0;\n  position: relative;\n  width: 100%;\n  height: auto;\n  min-height: 35rem;\n  padding: 15rem 0;\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url('bg-masthead.jpg');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: scroll;\n  background-size: cover;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: \"Varela Round\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  line-height: 2.5rem;\n  letter-spacing: 0.8rem;\n  background: linear-gradient(rgba(201, 14, 14, 0.9), rgba(34, 3, 3, 0.13));\n  -webkit-text-fill-color: transparent;\n  -webkit-background-clip: text;\n  background-clip: text;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvaGVyby9oZXJvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHdIQUFBO0VBT0EsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0Esc0JBQUE7QUFMRjtBQU1FO0VBQ0UscU1BQUE7RUFHQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUVBQUE7RUFDQSxvQ0FBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7QUFOSiIsInNvdXJjZXNDb250ZW50IjpbIi5oZXJvIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtaW4taGVpZ2h0OiAzNXJlbTtcbiAgcGFkZGluZzogMTVyZW0gMDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgdG8gYm90dG9tLFxuICAgICAgcmdiYSgwLCAwLCAwLCAwLjMpIDAlLFxuICAgICAgcmdiYSgwLCAwLCAwLCAwLjcpIDc1JSxcbiAgICAgICMwMDAgMTAwJVxuICAgICksXG4gICAgdXJsKC4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvYmctbWFzdGhlYWQuanBnKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IHNjcm9sbDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgaDEge1xuICAgIGZvbnQtZmFtaWx5OiAnVmFyZWxhIFJvdW5kJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLFxuICAgICAgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcbiAgICAgICdTZWdvZSBVSSBFbW9qaScsICdTZWdvZSBVSSBTeW1ib2wnLCAnTm90byBDb2xvciBFbW9qaSc7XG4gICAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC44cmVtO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2IoMjAxIDE0IDE0IC8gOTAlKSwgcmdiKDM0IDMgMyAvIDEzJSkpO1xuICAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 8157:
/*!*************************************************************************!*\
  !*** ./src/app/landing-page/components/projects/card/card.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardComponent": () => (/* binding */ CardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class CardComponent {
  constructor() {
    this.image = 'https://media-porfolio.s3.us-east-2.amazonaws.com/images/hazpan.gif';
  }
  ngOnInit() {}
}
CardComponent.ɵfac = function CardComponent_Factory(t) {
  return new (t || CardComponent)();
};
CardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CardComponent,
  selectors: [["app-card"]],
  inputs: {
    project: "project"
  },
  decls: 13,
  vars: 7,
  consts: [[1, "flip"], [1, "front"], [1, "text-shadow", "text-center", "text-dark"], [1, "back"], [1, "text-center"], [1, "ms-5", 3, "href"]],
  template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3)(5, "h2", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Click here to see the project");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url(" + ctx.project.imageUrl + ")");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.project.projectName);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.project.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.project.description, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.project.technologies, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx.project.projectUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    }
  },
  styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);h1[_ngcontent-%COMP%] {\n  font-size: 2.2em;\n}\n\n.flip[_ngcontent-%COMP%] {\n  position: relative;\n}\n.flip[_ngcontent-%COMP%]    > .front[_ngcontent-%COMP%], .flip[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%] {\n  display: block;\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition-duration: 1.5s;\n  transition-property: transform, opacity;\n}\n.flip[_ngcontent-%COMP%]    > .front[_ngcontent-%COMP%] {\n  transform: rotateY(0deg);\n}\n.flip[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  transform: rotateY(-180deg);\n}\n.flip[_ngcontent-%COMP%]:hover    > .front[_ngcontent-%COMP%] {\n  transform: rotateY(180deg);\n}\n.flip[_ngcontent-%COMP%]:hover    > .front[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: none;\n}\n.flip[_ngcontent-%COMP%]:hover    > .back[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotateY(0deg);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.flip.flip-vertical[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%] {\n  transform: rotateX(-180deg);\n}\n.flip.flip-vertical[_ngcontent-%COMP%]:hover    > .front[_ngcontent-%COMP%] {\n  transform: rotateX(180deg);\n}\n.flip.flip-vertical[_ngcontent-%COMP%]:hover    > .back[_ngcontent-%COMP%] {\n  transform: rotateX(0deg);\n}\n\n.flip[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  margin-right: 2px;\n  margin-bottom: 1em;\n  width: 100%;\n}\n.flip[_ngcontent-%COMP%]    > .front[_ngcontent-%COMP%], .flip[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%] {\n  display: block;\n  color: white;\n  width: inherit;\n  background-size: cover !important;\n  background-position: center !important;\n  height: 320px;\n  padding: 1em 2em;\n  background: #313131;\n  border-radius: 10px;\n}\n.flip[_ngcontent-%COMP%]    > .front[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .flip[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9125rem;\n  line-height: 160%;\n  color: #999;\n}\n\n.text-shadow[_ngcontent-%COMP%] {\n  text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04), 3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04), 0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04), 7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04), 9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04), 11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04), 13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04), 0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04), 17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04), 19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);\n  position: relative;\n  bottom: 90px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvcHJvamVjdHMvY2FyZC9jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZ0JBQUE7QUFBRjs7QUFJQTtFQUNFLGtCQUFBO0FBREY7QUFFRTs7RUFFRSxjQUFBO0VBQ0EsbUVBQUE7RUFDQSx5QkFBQTtFQUNBLHVDQUFBO0FBQUo7QUFFRTtFQUNFLHdCQUFBO0FBQUo7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQUFKO0FBR0k7RUFDRSwwQkFBQTtBQUROO0FBRU07RUFDRSxhQUFBO0FBQVI7QUFHSTtFQUNFLFVBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FBRE47QUFNSTtFQUNFLDJCQUFBO0FBSk47QUFPTTtFQUNFLDBCQUFBO0FBTFI7QUFPTTtFQUNFLHdCQUFBO0FBTFI7O0FBWUE7RUFDRSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFURjtBQVVFOztFQUVFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGlDQUFBO0VBQ0Esc0NBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBUko7QUFTSTs7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQU5OOztBQVdBO0VBQ0UsdW9CQUFBO0VBVUUsa0JBQUE7RUFDQSxZQUFBO0FBakJKIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8rTW9ubycpO1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMi4yZW07XG59XG5cbi8vIGJhc2Vcbi5mbGlwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICA+IC5mcm9udCxcbiAgPiAuYmFjayB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxLjVzO1xuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgb3BhY2l0eTtcbiAgfVxuICA+IC5mcm9udCB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xuICB9XG4gID4gLmJhY2sge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRvcDogMHB4O1xuICAgIGxlZnQ6IDBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpO1xuICB9XG4gICY6aG92ZXIge1xuICAgID4gLmZyb250IHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xuICAgICAgaDEge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgIH1cbiAgICA+IC5iYWNrIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBcbiAgICB9XG4gIH1cbiAgJi5mbGlwLXZlcnRpY2FsIHtcbiAgICA+IC5iYWNrIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgtMTgwZGVnKTtcbiAgICB9XG4gICAgJjpob3ZlciB7XG4gICAgICA+IC5mcm9udCB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpO1xuICAgICAgfVxuICAgICAgPiAuYmFjayB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gY3VzdG9tXG4uZmxpcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tcmlnaHQ6IDJweDtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICB3aWR0aDogMTAwJTtcbiAgPiAuZnJvbnQsXG4gID4gLmJhY2sge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB3aWR0aDogaW5oZXJpdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAzMjBweDtcbiAgICBwYWRkaW5nOiAxZW0gMmVtO1xuICAgIGJhY2tncm91bmQ6ICMzMTMxMzE7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45MTI1cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDE2MCU7XG4gICAgICBjb2xvcjogIzk5OTtcbiAgICB9XG4gIH1cbn1cblxuLnRleHQtc2hhZG93IHtcbiAgdGV4dC1zaGFkb3c6IDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA0KSwgMnB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDQpLFxuICAgIDNweCAzcHggcmdiYSgwLCAwLCAwLCAwLjA0KSwgNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMDQpLFxuICAgIDAuMTI1cmVtIDAuMTI1cmVtIHJnYmEoMCwgMCwgMCwgMC4wNCksIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjA0KSxcbiAgICA3cHggN3B4IHJnYmEoMCwgMCwgMCwgMC4wNCksIDhweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA0KSxcbiAgICA5cHggOXB4IHJnYmEoMCwgMCwgMCwgMC4wNCksIDAuMzEyNXJlbSAwLjMxMjVyZW0gcmdiYSgwLCAwLCAwLCAwLjA0KSxcbiAgICAxMXB4IDExcHggcmdiYSgwLCAwLCAwLCAwLjA0KSwgMTJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNCksXG4gICAgMTNweCAxM3B4IHJnYmEoMCwgMCwgMCwgMC4wNCksIDE0cHggMTRweCByZ2JhKDAsIDAsIDAsIDAuMDQpLFxuICAgIDAuNjI1cmVtIDAuNjI1cmVtIHJnYmEoMCwgMCwgMCwgMC4wNCksIDE2cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMDQpLFxuICAgIDE3cHggMTdweCByZ2JhKDAsIDAsIDAsIDAuMDQpLCAxOHB4IDE4cHggcmdiYSgwLCAwLCAwLCAwLjA0KSxcbiAgICAxOXB4IDE5cHggcmdiYSgwLCAwLCAwLCAwLjA0KSwgMS4yNXJlbSAxLjI1cmVtIHJnYmEoMCwgMCwgMCwgMC4wNCk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvdHRvbTogOTBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 7066:
/*!************************************************************************!*\
  !*** ./src/app/landing-page/components/projects/projects.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectsComponent": () => (/* binding */ ProjectsComponent)
/* harmony export */ });
/* harmony import */ var _projects_store_projects_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projects/store/projects.actions */ 4102);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ 5312);
/* harmony import */ var _shared_components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/wrapper-container/wrapper-container.component */ 5078);
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card/card.component */ 8157);







function ProjectsComponent_mat_spinner_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-spinner", 5);
  }
}
function ProjectsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProjectsComponent_div_8_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.onClearError());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.error, " ");
  }
}
function ProjectsComponent_div_9_app_card_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-card", 11);
  }
  if (rf & 2) {
    const project_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("project", project_r6);
  }
}
function ProjectsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ProjectsComponent_div_9_app_card_2_Template, 1, 1, "app-card", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.projects);
  }
}
class ProjectsComponent {
  constructor(store) {
    this.store = store;
    this.isLoading = false;
    this.error = null;
  }
  ngOnInit() {
    this.onSubscribeData();
    this.onDispatchAction();
  }
  onSubscribeData() {
    this.projectsSub = this.store.select('projects')
    // .pipe(take(1))
    .subscribe(respStateDataProjects => {
      this.projects = respStateDataProjects.projects;
      this.isLoading = respStateDataProjects.loading;
      this.error = respStateDataProjects.errorMessage;
    });
  }
  onDispatchAction() {
    this.store.dispatch(_projects_store_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjects());
  }
  onClearError() {
    this.store.dispatch(_projects_store_projects_actions__WEBPACK_IMPORTED_MODULE_0__.clearError());
  }
  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
ProjectsComponent.ɵfac = function ProjectsComponent_Factory(t) {
  return new (t || ProjectsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
ProjectsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: ProjectsComponent,
  selectors: [["app-projects"]],
  decls: 10,
  vars: 3,
  consts: [[1, "container", "px-4", "px-lg-5"], [1, "text-center"], ["class", "m-auto mb-5", 4, "ngIf"], ["style", "z-index: 10", "class", "alert alert-warning", "role", "alert", 4, "ngIf"], ["class", "container", 4, "ngIf"], [1, "m-auto", "mb-5"], ["role", "alert", 1, "alert", "alert-warning", 2, "z-index", "10"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "container"], [1, "row", "justify-content-center"], ["class", "pt-5 mt-5 col-12 col-md-4", 3, "project", 4, "ngFor", "ngForOf"], [1, "pt-5", "mt-5", "col-12", "col-md-4", 3, "project"]],
  template: function ProjectsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-wrapper-container")(1, "div", 0)(2, "div", 1)(3, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Projects Portfolio");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " Portfolio of personal projects and with companies, in this section I try to summarize all the hard work that I have used and the different concepts that I have implemented, as well as technological stacks, frameworks, preprocessor, databases, etc. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, ProjectsComponent_mat_spinner_7_Template, 1, 0, "mat-spinner", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, ProjectsComponent_div_8_Template, 4, 1, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, ProjectsComponent_div_9_Template, 3, 1, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.error);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.error);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__.MatProgressSpinner, _shared_components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_1__.WrapperContainerComponent, _card_card_component__WEBPACK_IMPORTED_MODULE_2__.CardComponent],
  styles: [".grid-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 500px);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsdUNBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5ncmlkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDUwMHB4KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 4102:
/*!****************************************************************************!*\
  !*** ./src/app/landing-page/components/projects/store/projects.actions.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearError": () => (/* binding */ clearError),
/* harmony export */   "fetchProjects": () => (/* binding */ fetchProjects),
/* harmony export */   "fetchProjectsFail": () => (/* binding */ fetchProjectsFail),
/* harmony export */   "fetchProjectsSuccess": () => (/* binding */ fetchProjectsSuccess)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const fetchProjectsSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Projects] Set Projects', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const fetchProjects = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Projects] Fetch Projects');
const fetchProjectsFail = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Projects] Fail Fetch Projects', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const clearError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Projects] Clear Error');

/***/ }),

/***/ 6124:
/*!****************************************************************************!*\
  !*** ./src/app/landing-page/components/projects/store/projects.effects.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectsEffects": () => (/* binding */ ProjectsEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _projects_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.actions */ 4102);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 4307);








class ProjectsEffects {
  constructor(actions$, http, store) {
    this.actions$ = actions$;
    this.http = http;
    this.store = store;
    this.fetchProjects$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjects), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => {
      return this.http.get(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_URL_FIREBASE}.json`);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(responseData => {
      const projectsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          projectsArray.push({
            ...responseData[key],
            id: key
          });
        }
      }
      return projectsArray;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(projects => {
      return this.store.dispatch(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjectsSuccess({
        projects
      }));
    })), {
      dispatch: false
    });
  }
}
ProjectsEffects.ɵfac = function ProjectsEffects_Factory(t) {
  return new (t || ProjectsEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store));
};
ProjectsEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: ProjectsEffects,
  factory: ProjectsEffects.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 6209:
/*!****************************************************************************!*\
  !*** ./src/app/landing-page/components/projects/store/projects.reducer.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectReducer": () => (/* binding */ projectReducer)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _projects_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.actions */ 4102);


const initialState = {
  projects: [],
  errorMessage: null,
  loading: false
};
const _projectsReducer = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(initialState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjectsSuccess, (state, action) => ({
  ...state,
  projects: [...action.projects],
  errorMessage: null,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjects, (state, action) => ({
  ...state,
  errorMessage: null,
  loading: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.fetchProjectsFail, (state, action) => ({
  ...state,
  errorMessage: action.errorMessage,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_projects_actions__WEBPACK_IMPORTED_MODULE_0__.clearError, (state, action) => ({
  ...state,
  errorMessage: null,
  loading: false
})));
function projectReducer(state, action) {
  return _projectsReducer(state, action);
}

/***/ }),

/***/ 5860:
/*!**************************************************************************!*\
  !*** ./src/app/landing-page/components/skill-bar/skill-bar.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkillBarComponent": () => (/* binding */ SkillBarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _core_services_skills_skills_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/skills/skills.service */ 5798);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/wrapper-container/wrapper-container.component */ 5078);




function SkillBarComponent_div_7_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Proficient");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SkillBarComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6)(1, "div", 7)(2, "figure", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SkillBarComponent_div_7_span_6_Template, 2, 0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 12)(8, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", skill_r1.logo, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", skill_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](skill_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", skill_r1.proficient && skill_r1.knowledge > 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", skill_r1.knowledge, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", skill_r1.knowledge, "% ");
  }
}
class SkillBarComponent {
  constructor(skillsService) {
    this.skillsService = skillsService;
  }
  ngOnInit() {
    this.skills = this.skillsService.getAllSkills();
  }
}
SkillBarComponent.ɵfac = function SkillBarComponent_Factory(t) {
  return new (t || SkillBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_skills_skills_service__WEBPACK_IMPORTED_MODULE_0__.SkillsService));
};
SkillBarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: SkillBarComponent,
  selectors: [["app-skill-bar"]],
  decls: 8,
  vars: 1,
  consts: [[1, "container-fluid", "skill-section"], [1, "row", "justify-content-center"], [1, "col-12", "col-md-6"], [1, "text-white-50", "text-center", "mb-4"], [1, "skill-bars", "mx-auto"], ["class", "bar mb-4", 4, "ngFor", "ngForOf"], [1, "bar", "mb-4"], [1, "info", "flex-col", "items-center"], [1, "w-20"], [3, "src", "alt"], [1, "mb-2"], [4, "ngIf"], [1, "progress"], ["role", "progressbar", 1, "progress-bar", "bg-danger", "progress-bar-striped", "progress-bar-animated"]],
  template: function SkillBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-wrapper-container")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "h2", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Skills");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, SkillBarComponent_div_7_Template, 10, 7, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.skills);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _shared_components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_1__.WrapperContainerComponent],
  styles: [".skill-section[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n\n.skill-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  margin: 20px 0;\n}\n\n.skill-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:first-child {\n  margin-top: 0px;\n}\n\n.skill-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.skill-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: 500;\n  font-size: 17px;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_showText 0.5s 1s linear forwards;\n}\n\n@keyframes _ngcontent-%COMP%_showText {\n  100% {\n    opacity: 1;\n  }\n}\n.skill-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   .progress-line[_ngcontent-%COMP%] {\n  height: 10px;\n  width: 100%;\n  background: #f0f0f0;\n  position: relative;\n  transform: scaleX(0);\n  transform-origin: left;\n  border-radius: 10px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05), 0 1px rgba(255, 255, 255, 0.8);\n  animation: _ngcontent-%COMP%_animate 1s cubic-bezier(1, 0, 0.5, 1) forwards;\n}\n\n@keyframes _ngcontent-%COMP%_animate {\n  100% {\n    transform: scaleX(1);\n  }\n}\n.bar[_ngcontent-%COMP%]   .progress-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 100%;\n  position: absolute;\n  border-radius: 10px;\n  transform: scaleX(0);\n  transform-origin: left;\n  background: #e00a0a;\n  animation: _ngcontent-%COMP%_animate 1s 1s cubic-bezier(1, 0, 0.5, 1) forwards;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGFuZGluZy1wYWdlL2NvbXBvbmVudHMvc2tpbGwtYmFyL3NraWxsLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGFBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDZCQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLDJDQUFBO0FBQUY7O0FBR0E7RUFDRTtJQUNFLFVBQUE7RUFBRjtBQUNGO0FBR0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSwrRUFBQTtFQUVBLHlEQUFBO0FBRkY7O0FBS0E7RUFDRTtJQUNFLG9CQUFBO0VBRkY7QUFDRjtBQUtBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0REFBQTtBQUhGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczp3Z2h0QDIwMDszMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcpO1xuLnNraWxsLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4uc2tpbGwtYmFycyAuYmFyIHtcbiAgbWFyZ2luOiAyMHB4IDA7XG59XG5cbi5za2lsbC1iYXJzIC5iYXI6Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tdG9wOiAwcHg7XG59XG5cbi5za2lsbC1iYXJzIC5iYXIgLmluZm8ge1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4uc2tpbGwtYmFycyAuYmFyIC5pbmZvIHNwYW4ge1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBvcGFjaXR5OiAwO1xuICBhbmltYXRpb246IHNob3dUZXh0IDAuNXMgMXMgbGluZWFyIGZvcndhcmRzO1xufVxuXG5Aa2V5ZnJhbWVzIHNob3dUZXh0IHtcbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4uc2tpbGwtYmFycyAuYmFyIC5wcm9ncmVzcy1saW5lIHtcbiAgaGVpZ2h0OiAxMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSksXG4gICAgMCAxcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICBhbmltYXRpb246IGFuaW1hdGUgMXMgY3ViaWMtYmV6aWVyKDEsIDAsIDAuNSwgMSkgZm9yd2FyZHM7XG59XG5cbkBrZXlmcmFtZXMgYW5pbWF0ZSB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpO1xuICB9XG59XG5cbi5iYXIgLnByb2dyZXNzLWxpbmUgc3BhbiB7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICB0cmFuc2Zvcm06IHNjYWxlWCgwKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdDtcbiAgYmFja2dyb3VuZDogI2UwMGEwYTtcbiAgYW5pbWF0aW9uOiBhbmltYXRlIDFzIDFzIGN1YmljLWJlemllcigxLCAwLCAwLjUsIDEpIGZvcndhcmRzO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 4229:
/*!********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingPageComponent": () => (/* binding */ LandingPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _components_hero_hero_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/hero/hero.component */ 1979);


class LandingPageComponent {
  constructor() {}
  ngOnInit() {}
}
LandingPageComponent.ɵfac = function LandingPageComponent_Factory(t) {
  return new (t || LandingPageComponent)();
};
LandingPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: LandingPageComponent,
  selectors: [["app-landing-page"]],
  decls: 1,
  vars: 0,
  template: function LandingPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-hero");
    }
  },
  dependencies: [_components_hero_hero_component__WEBPACK_IMPORTED_MODULE_0__.HeroComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 6674:
/*!********************************************!*\
  !*** ./src/app/layout/layout.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutComponent": () => (/* binding */ LayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _shared_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/components/navbar/navbar.component */ 3502);
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/footer/footer.component */ 6526);




class LayoutComponent {
  constructor() {}
  ngOnInit() {}
}
LayoutComponent.ɵfac = function LayoutComponent_Factory(t) {
  return new (t || LayoutComponent)();
};
LayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: LayoutComponent,
  selectors: [["app-layout"]],
  decls: 4,
  vars: 0,
  template: function LayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-navbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "main");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "app-footer");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _shared_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 898:
/*!*********************************************!*\
  !*** ./src/app/material/material.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialModule": () => (/* binding */ MaterialModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/sidenav */ 9101);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/slider */ 7824);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/grid-list */ 3574);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 2193);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/menu */ 9314);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 9941);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 3677);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/layout */ 919);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 6322);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ 6069);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/table */ 3348);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 8750);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/paginator */ 6907);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 4322);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ 6508);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/progress-spinner */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 6839);


















const modules = [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_0__.MatProgressSpinnerModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_1__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_2__.MatSliderModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__.MatGridListModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__.LayoutModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule];
class MaterialModule {}
MaterialModule.ɵfac = function MaterialModule_Factory(t) {
  return new (t || MaterialModule)();
};
MaterialModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({
  type: MaterialModule
});
MaterialModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({
  imports: [modules, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_0__.MatProgressSpinnerModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_1__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_2__.MatSliderModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__.MatGridListModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__.LayoutModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](MaterialModule, {
    imports: [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_0__.MatProgressSpinnerModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_1__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_2__.MatSliderModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__.MatGridListModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__.LayoutModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule],
    exports: [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_0__.MatProgressSpinnerModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_1__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_2__.MatSliderModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__.MatGridListModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__.LayoutModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_11__.MatTableModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule]
  });
})();

/***/ }),

/***/ 439:
/*!************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageNotFoundComponent": () => (/* binding */ PageNotFoundComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 6679);


const _c0 = function () {
  return ["/"];
};
class PageNotFoundComponent {
  constructor() {}
  ngOnInit() {}
}
PageNotFoundComponent.ɵfac = function PageNotFoundComponent_Factory(t) {
  return new (t || PageNotFoundComponent)();
};
PageNotFoundComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PageNotFoundComponent,
  selectors: [["app-page-not-found"]],
  decls: 8,
  vars: 2,
  consts: [[1, "notFound__hero"], ["src", "https://media-porfolio.s3.us-east-2.amazonaws.com/images/404_error.png", "alt", "astronaut"], [1, "container-astro"], [1, "img-astro"], [3, "routerLink"], ["src", "https://media-porfolio.s3.us-east-2.amazonaws.com/images/astronauta.png", "alt", "astro"]],
  template: function PageNotFoundComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Page not Found please click on the astronaut to return to homePage");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink],
  styles: [".notFound__hero[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  background-position: center;\n  position: relative;\n  bottom: 10px;\n  top: 0;\n  background: url(\"https://media-porfolio.s3.us-east-2.amazonaws.com/images/stars.svg\"), #1b1b25;\n  background-repeat: repeat;\n  color: #ffffff;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n.notFound__hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  position: relative;\n  top: -100px;\n}\n\n.notFound__hero[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border: none;\n  width: 500px;\n  height: 500px;\n  margin: 0;\n}\n\n.container-astro[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.img-astro[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n}\n\n.img-astro[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 80px;\n  will-change: width, transform;\n  transition: 1s;\n  transform-origin: center;\n  animation-name: _ngcontent-%COMP%_astronauta, _ngcontent-%COMP%_mov;\n  animation-duration: 100s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear, linear, ease-in;\n  animation-direction: alternate;\n  position: relative;\n}\n\n@keyframes _ngcontent-%COMP%_astronauta {\n  0% {\n    transform: rotate(0deg) scale(1);\n  }\n  25% {\n    transform: rotate(90deg) scale(1.5);\n  }\n  50% {\n    transform: rotate(180deg) scale(2);\n  }\n  75% {\n    transform: rotate(270deg) scale(1.5);\n  }\n  100% {\n    transform: rotate(360deg) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_mov {\n  0% {\n    left: 300px;\n    right: 0px;\n    top: 500px;\n    bottom: 550px;\n  }\n  25% {\n    left: 300px;\n    right: 0px;\n    top: 0px;\n    bottom: 500px;\n  }\n  50% {\n    left: 1000px;\n    right: 500px;\n    top: 0px;\n    bottom: 500px;\n  }\n  75% {\n    left: 0px;\n    right: 500px;\n    top: 500px;\n    bottom: 0;\n  }\n  100% {\n    left: 1000px;\n    top: 0px;\n    right: 500px;\n    bottom: 0px;\n  }\n}\n.img-astro[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover {\n  transition: 1s;\n  width: 100px;\n  height: 160px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLDhGQUFBO0VBRUEseUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUFGO0FBQ0U7RUFDRSxrQkFBQTtFQUNBLFdBQUE7QUFDSjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFNBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQUVGOztBQUFBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7QUFHRjs7QUFEQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSwrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsbUNBQUE7RUFDQSxrREFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFJRjs7QUFGQTtFQUNFO0lBQ0UsZ0NBQUE7RUFLRjtFQUhBO0lBQ0UsbUNBQUE7RUFLRjtFQUhBO0lBQ0Usa0NBQUE7RUFLRjtFQUhBO0lBQ0Usb0NBQUE7RUFLRjtFQUhBO0lBQ0Usa0NBQUE7RUFLRjtBQUNGO0FBSEE7RUFDRTtJQUNFLFdBQUE7SUFDQSxVQUFBO0lBQ0EsVUFBQTtJQUNBLGFBQUE7RUFLRjtFQUhBO0lBQ0UsV0FBQTtJQUNBLFVBQUE7SUFDQSxRQUFBO0lBQ0EsYUFBQTtFQUtGO0VBSEE7SUFDRSxZQUFBO0lBQ0EsWUFBQTtJQUNBLFFBQUE7SUFDQSxhQUFBO0VBS0Y7RUFIQTtJQUNFLFNBQUE7SUFDQSxZQUFBO0lBQ0EsVUFBQTtJQUNBLFNBQUE7RUFLRjtFQUhBO0lBQ0UsWUFBQTtJQUNBLFFBQUE7SUFDQSxZQUFBO0lBQ0EsV0FBQTtFQUtGO0FBQ0Y7QUFIQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQUtGIiwic291cmNlc0NvbnRlbnQiOlsiLm5vdEZvdW5kX19oZXJvIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDEwcHg7XG4gIHRvcDogMDtcbiAgYmFja2dyb3VuZDogdXJsKCdodHRwczovL21lZGlhLXBvcmZvbGlvLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy9zdGFycy5zdmcnKSxcbiAgICAjMWIxYjI1O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICYgcCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTEwMHB4O1xuICB9XG59XG4ubm90Rm91bmRfX2hlcm8gaW1nIHtcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogNTAwcHg7XG4gIGhlaWdodDogNTAwcHg7XG4gIG1hcmdpbjogMDtcbn1cbi5jb250YWluZXItYXN0cm8ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbn1cbi5pbWctYXN0cm8ge1xuICB3aWR0aDogNDAwcHg7XG4gIGhlaWdodDogNDAwcHg7XG59XG4uaW1nLWFzdHJvIGltZyB7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDgwcHg7XG4gIHdpbGwtY2hhbmdlOiB3aWR0aCwgdHJhbnNmb3JtO1xuICB0cmFuc2l0aW9uOiAxcztcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICBhbmltYXRpb24tbmFtZTogYXN0cm9uYXV0YSwgbW92O1xuICBhbmltYXRpb24tZHVyYXRpb246IDEwMHM7XG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXIsIGxpbmVhciwgZWFzZS1pbjtcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5Aa2V5ZnJhbWVzIGFzdHJvbmF1dGEge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgc2NhbGUoMSk7XG4gIH1cbiAgMjUlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoMS41KTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZykgc2NhbGUoMik7XG4gIH1cbiAgNzUlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpIHNjYWxlKDEuNSk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKSBzY2FsZSgxKTtcbiAgfVxufVxuQGtleWZyYW1lcyBtb3Yge1xuICAwJSB7XG4gICAgbGVmdDogMzAwcHg7XG4gICAgcmlnaHQ6IDBweDtcbiAgICB0b3A6IDUwMHB4O1xuICAgIGJvdHRvbTogNTUwcHg7XG4gIH1cbiAgMjUlIHtcbiAgICBsZWZ0OiAzMDBweDtcbiAgICByaWdodDogMHB4O1xuICAgIHRvcDogMHB4O1xuICAgIGJvdHRvbTogNTAwcHg7XG4gIH1cbiAgNTAlIHtcbiAgICBsZWZ0OiAxMDAwcHg7XG4gICAgcmlnaHQ6IDUwMHB4O1xuICAgIHRvcDogMHB4O1xuICAgIGJvdHRvbTogNTAwcHg7XG4gIH1cbiAgNzUlIHtcbiAgICBsZWZ0OiAwcHg7XG4gICAgcmlnaHQ6IDUwMHB4O1xuICAgIHRvcDogNTAwcHg7XG4gICAgYm90dG9tOiAwO1xuICB9XG4gIDEwMCUge1xuICAgIGxlZnQ6IDEwMDBweDtcbiAgICB0b3A6IDBweDtcbiAgICByaWdodDogNTAwcHg7XG4gICAgYm90dG9tOiAwcHg7XG4gIH1cbn1cbi5pbWctYXN0cm8gaW1nOmhvdmVyIHtcbiAgdHJhbnNpdGlvbjogMXM7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxNjBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 3228:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/banner/banner.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BannerComponent": () => (/* binding */ BannerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

const _c0 = ["*"];
class BannerComponent {}
BannerComponent.ɵfac = function BannerComponent_Factory(t) {
  return new (t || BannerComponent)();
};
BannerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: BannerComponent,
  selectors: [["app-banner"]],
  ngContentSelectors: _c0,
  decls: 9,
  vars: 0,
  consts: [[1, "flex", "justify-center", "h-screen", "relative", "isolate", "overflow-hidden", "bg-gray-950"], ["viewBox", "0 0 1024 1024", "aria-hidden", "true", 1, "absolute", "left-1/2", "top-1/2", "-z-10", "h-[64rem]", "w-[64rem]", "-translate-x-1/2", "[mask-image:radial-gradient(closest-side,white,transparent)]"], ["cx", "512", "cy", "512", "r", "512", "fill", "url(#8d958450-c69f-4251-94bc-4e091a323369)", "fill-opacity", "0.7"], ["id", "8d958450-c69f-4251-94bc-4e091a323369"], ["stop-color", "#7775D6"], ["offset", "1", "stop-color", "#E935C1"]],
  template: function BannerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "circle", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "defs")(6, "radialGradient", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "stop", 4)(8, "stop", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 42:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/button/button.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonComponent": () => (/* binding */ ButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var src_app_material_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/material/material.module */ 898);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 3677);





const _c0 = ["*"];
class ButtonComponent {
  constructor() {
    this.clickEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.color = 'primary';
  }
  triggerEvent() {
    this.clickEvent.emit(new Event('click'));
  }
}
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) {
  return new (t || ButtonComponent)();
};
ButtonComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ButtonComponent,
  selectors: [["app-button"]],
  inputs: {
    color: "color"
  },
  outputs: {
    clickEvent: "clickEvent"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 1,
  consts: [["mat-raised-button", "", 1, "animate__animated", "animate__fadeInUp", "animate__slow", 3, "color", "click"]],
  template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ButtonComponent_Template_button_click_0_listener() {
        return ctx.triggerEvent();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx.color);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, src_app_material_material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 3535:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/category-tech-skill/category-tech-skill.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryTechSkillComponent": () => (/* binding */ CategoryTechSkillComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _tech_skill_tech_skill_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tech-skill/tech-skill.component */ 7609);



function CategoryTechSkillComponent_ng_container_18_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-tech-skill", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const skill_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("skill", skill_r1);
  }
}
function CategoryTechSkillComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryTechSkillComponent_ng_container_18_ng_container_1_Template, 2, 1, "ng-container", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", skill_r1.category === ctx_r0.techCategoryEnum);
  }
}
const _c0 = function (a0) {
  return {
    "md:-mt-12 lg:col-start-2": a0
  };
};
const _c1 = ["*"];
class CategoryTechSkillComponent {
  constructor() {
    this.rtl = false;
  }
}
CategoryTechSkillComponent.ɵfac = function CategoryTechSkillComponent_Factory(t) {
  return new (t || CategoryTechSkillComponent)();
};
CategoryTechSkillComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: CategoryTechSkillComponent,
  selectors: [["app-category-tech-skill"]],
  inputs: {
    cateroryTitle: "cateroryTitle",
    skills: "skills",
    techCategoryEnum: "techCategoryEnum",
    imgUrl: "imgUrl",
    rtl: "rtl"
  },
  ngContentSelectors: _c1,
  decls: 21,
  vars: 6,
  consts: [[1, "relative", "isolate", "bg-gray-950", "px-4", "md:px-5", "lg:overflow-visible", "py-20"], [1, "absolute", "inset-0", "-z-10", "overflow-hidden"], ["aria-hidden", "true", 1, "absolute", "left-[max(50%,25rem)]", "top-0", "h-[64rem]", "w-[128rem]", "-translate-x-1/2", "stroke-gray-200", "[mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"], ["id", "e813992c-7d03-4cc4-a2bd-151760b470a0", "width", "200", "height", "200", "x", "50%", "y", "-1", "patternUnits", "userSpaceOnUse"], ["d", "M100 200V.5M.5 .5H200", "fill", "none"], ["width", "100%", "height", "100%", "stroke-width", "0", "fill", "url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"], [1, "mx-auto", "grid", "max-w-2xl", "grid-cols-1", "gap-x-8", "lg:mx-0", "lg:max-w-none", "lg:grid-cols-2", "lg:items-start"], [1, "hidden", "md:block", "sticky", "lg:top-4", "lg:row-span-2", "lg:row-start-1", "lg:overflow-hidden", 3, "ngClass"], ["alt", "code snippet ", 1, "w-full", "h-full", "max-w-none", "rounded-xl", "bg-gray-900", "shadow-xl", "ring-1", "ring-gray-400/10", 3, "src"], [1, "flex", "justify-center"], [1, "lg:pr-4"], [1, "max-w-xl"], ["role", "list", 1, "mt-8", "text-gray-600"], [4, "ngFor", "ngForOf"], ["aria-hidden", "true", 1, "pointer-events-none", "absolute", "left-12", "top-1/2", "-z-10", "-translate-y-1/2", "transform-gpu", "blur-3xl", "lg:bottom-[-12rem]", "lg:top-auto", "lg:translate-y-0", "lg:transform-gpu"], [1, "aspect-[1155/678]", "w-[72rem]", "bg-gradient-to-tr", "from-[#ff80b5]", "to-[#9089fc]", "opacity-25", 2, "clip-path", "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"], [4, "ngIf"], [3, "skill"]],
  template: function CategoryTechSkillComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "svg", 2)(3, "defs")(4, "pattern", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "path", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rect", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 6)(8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 9)(11, "div", 10)(12, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 11)(15, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "ul", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, CategoryTechSkillComponent_ng_container_18_Template, 2, 1, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c0, !ctx.rtl));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.imgUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.cateroryTitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.skills);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _tech_skill_tech_skill_component__WEBPACK_IMPORTED_MODULE_0__.TechSkillComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 6526:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/footer/footer.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _core_services_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/nav.service */ 651);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 6679);





const _c0 = function (a0) {
  return [a0];
};
function FooterComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 15)(2, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const navLink_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, navLink_r1.link));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](navLink_r1.title);
  }
}
class FooterComponent {
  constructor() {
    this.navServices = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_nav_service__WEBPACK_IMPORTED_MODULE_0__.NavService);
    this.currrentYear = new Date().getFullYear();
  }
  ngOnInit() {
    this.navLinks = this.navServices.getNavLinks();
  }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) {
  return new (t || FooterComponent)();
};
FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: FooterComponent,
  selectors: [["app-footer"]],
  decls: 22,
  vars: 2,
  consts: [[1, "bg-black", "relative"], [1, "mx-auto", "max-w-7xl", "overflow-hidden", "px-6", "py-10", "lg:px-8"], ["aria-label", "Footer", 1, "-mb-6", "columns-2", "sm:flex", "sm:justify-center", "sm:space-x-12"], [4, "ngFor", "ngForOf"], [1, "mt-10", "flex", "justify-center", "space-x-10"], ["href", "http://linkedin.com/in/jesus-duarte-948a5b1aa", "target", "_blank", 1, "text-gray-400", "hover:text-gray-500"], [1, "sr-only"], ["fill", "currentColor", "viewBox", "0 0 128 128", "aria-hidden", "true", 1, "h-6", "w-6"], ["fill-rule", "evenodd", "d", "M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"], ["href", "https://www.instagram.com/jesusduarte739/", "target", "_blank", 1, "text-gray-400", "hover:text-gray-500"], ["fill", "currentColor", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-6", "w-6"], ["fill-rule", "evenodd", "d", "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", "clip-rule", "evenodd"], ["href", "https://github.com/davidduarte-979", "target", "_blank", 1, "text-gray-400", "hover:text-gray-500"], ["fill-rule", "evenodd", "d", "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", "clip-rule", "evenodd"], [1, "mt-10", "text-center", "text-xs", "leading-5", "text-gray-500"], [1, "flex", "justify-center", "md:block", "pb-6"], [1, "text-sm", "leading-6", "text-gray-600", "hover:text-gray-900", 3, "routerLink"]],
  template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "footer", 0)(1, "div", 1)(2, "nav", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, FooterComponent_ng_container_3_Template, 4, 4, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4)(5, "a", 5)(6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "LinkedIn");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "svg", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "path", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 9)(11, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Instagram");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "svg", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "path", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "a", 12)(16, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "GitHub");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "svg", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "path", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "p", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.navLinks);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A9 ", ctx.currrentYear, " Jesus David Duarte. All rights reserved.");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
  styles: [".footer[_ngcontent-%COMP%] {\n  padding: 5rem 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5mb290ZXIge1xuICBwYWRkaW5nOiA1cmVtIDA7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3502:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarComponent": () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _core_services_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/nav.service */ 651);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9151);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6477);







function NavbarComponent__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "path", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return [a0];
};
const _c1 = function () {
  return {
    exact: true
  };
};
function NavbarComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const navLink_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, navLink_r4.link))("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](navLink_r4.title);
  }
}
function NavbarComponent_div_16_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const navLink_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, navLink_r6.link))("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", navLink_r6.title, " ");
  }
}
function NavbarComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19)(1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, NavbarComponent_div_16_ng_container_2_Template, 3, 6, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.navLinks);
  }
}
class NavbarComponent {
  constructor() {
    this.isOpen = false;
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router);
    this.navService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_nav_service__WEBPACK_IMPORTED_MODULE_0__.NavService);
  }
  ngOnInit() {
    this.navLinks = this.navService.getNavLinks();
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd)).subscribe(() => {
      this.isOpen = false;
    });
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) {
  return new (t || NavbarComponent)();
};
NavbarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: NavbarComponent,
  selectors: [["app-navbar"]],
  decls: 17,
  vars: 4,
  consts: [[1, "bg-black"], [1, "mx-auto", "max-w-7xl", "px-2", "md:px-6", "lg:px-8"], [1, "relative", "flex", "h-16", "items-center", "justify-between"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "md:hidden"], ["type", "button", "aria-controls", "mobile-menu", "aria-expanded", "false", 1, "inline-flex", "items-center", "justify-center", "rounded-md", "p-2", "text-gray-400", "hover:bg-gray-700", "hover:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-inset", "focus:ring-white", 3, "click"], [1, "sr-only"], ["class", "h-6 w-6", "fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", "aria-hidden", "true", 4, "ngIf"], [1, "flex", "flex-1", "items-center", "justify-center", "md:items-stretch", "md:justify-start"], [1, "flex", "flex-shrink-0", "items-center"], ["src", "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500", "alt", "Your Company", 1, "block", "h-8", "w-auto", "lg:hidden"], ["src", "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500", "alt", "Your Company", 1, "hidden", "h-8", "w-auto", "lg:block"], [1, "hidden", "md:ml-6", "md:block"], [1, "flex", "space-x-4"], [4, "ngFor", "ngForOf"], ["class", "md:hidden", "id", "mobile-menu", 4, "ngIf"], ["fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", "aria-hidden", "true", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], ["routerLinkActive", "bg-gray-900 text-white", 1, "text-gray-300", "hover:bg-gray-700", "hover:text-white", "rounded-md", "px-3", "py-2", "text-sm", "font-medium", 3, "routerLink", "routerLinkActiveOptions"], ["id", "mobile-menu", 1, "md:hidden"], [1, "space-y-1", "px-2", "pb-3", "pt-2"], ["routerLinkActive", "bg-gray-900 text-white", 1, "text-gray-300", "hover:bg-gray-700", "hover:text-white", "block", "rounded-md", "px-3", "py-2", "text-base", "font-medium", 3, "routerLink", "routerLinkActiveOptions"]],
  template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavbarComponent_Template_button_click_4_listener() {
        return ctx.toggleMenu();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Open main menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, NavbarComponent__svg_svg_7_Template, 2, 0, "svg", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, NavbarComponent__svg_svg_8_Template, 2, 0, "svg", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7)(10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "img", 9)(12, "img", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 11)(14, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, NavbarComponent_ng_container_15_Template, 3, 6, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, NavbarComponent_div_16_Template, 3, 1, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.navLinks);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isOpen);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 7609:
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/tech-skill/tech-skill.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TechSkillComponent": () => (/* binding */ TechSkillComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class TechSkillComponent {}
TechSkillComponent.ɵfac = function TechSkillComponent_Factory(t) {
  return new (t || TechSkillComponent)();
};
TechSkillComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TechSkillComponent,
  selectors: [["app-tech-skill"]],
  inputs: {
    skill: "skill"
  },
  decls: 12,
  vars: 4,
  consts: [[1, "flex", "flex-col", "md:flex-row", "items-center", "gap-x-3", "mb-10"], [1, "w-20", "flex-none"], [3, "src"], [1, "text-lg", "font-semibold", "text-purple-800"], [1, "font-semibold", "text-purple-800"]],
  template: function TechSkillComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 0)(1, "figure", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span")(4, "strong", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Years of Experience: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "strong", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.skill.logo, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.skill.name);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.skill.yearsOfExperience);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.skill.description, " ");
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 5078:
/*!************************************************************************************!*\
  !*** ./src/app/shared/components/wrapper-container/wrapper-container.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WrapperContainerComponent": () => (/* binding */ WrapperContainerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

const _c0 = ["*"];
class WrapperContainerComponent {}
WrapperContainerComponent.ɵfac = function WrapperContainerComponent_Factory(t) {
  return new (t || WrapperContainerComponent)();
};
WrapperContainerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WrapperContainerComponent,
  selectors: [["app-wrapper-container"]],
  ngContentSelectors: _c0,
  decls: 15,
  vars: 0,
  consts: [[1, "relative", "isolate", "bg-gray-950"], [1, "mx-auto"], [1, "relative", "px-6", "lg:static", "lg:px-8"], [1, "absolute", "inset-y-0", "left-0", "-z-10", "w-full", "overflow-hidden", "ring-1", "ring-white/5", "lg:w-full"], ["aria-hidden", "true", 1, "absolute", "inset-0", "h-full", "w-full", "stroke-gray-700", "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"], ["id", "54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2", "width", "200", "height", "200", "x", "100%", "y", "-1", "patternUnits", "userSpaceOnUse"], ["d", "M130 200V.5M.5 .5H200", "fill", "none"], ["x", "100%", "y", "-1", 1, "overflow-visible", "fill-gray-800/20"], ["d", "M-470.5 0h201v201h-201Z", "stroke-width", "0"], ["width", "100%", "height", "100%", "stroke-width", "0", "fill", "url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"], ["aria-hidden", "true", 1, "absolute", "-left-56", "top-[calc(100%-13rem)]", "transform-gpu", "blur-3xl", "lg:left-[max(-14rem,calc(100%-59rem))]", "lg:top-[calc(50%-7rem)]"], [1, "aspect-[1155/678]", "w-[72.1875rem]", "bg-gradient-to-br", "from-[#ff80b5]", "to-[#9089fc]", "opacity-20", 2, "clip-path", "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"]],
  template: function WrapperContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "svg", 4)(6, "defs")(7, "pattern", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "svg", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "rect", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 4466:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/navbar/navbar.component */ 3502);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/footer/footer.component */ 6526);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../material/material.module */ 898);
/* harmony import */ var _components_button_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/button/button.component */ 42);
/* harmony import */ var _components_tech_skill_tech_skill_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tech-skill/tech-skill.component */ 7609);
/* harmony import */ var _components_category_tech_skill_category_tech_skill_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/category-tech-skill/category-tech-skill.component */ 3535);
/* harmony import */ var _components_banner_banner_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/banner/banner.component */ 3228);
/* harmony import */ var _components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/wrapper-container/wrapper-container.component */ 5078);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);











class SharedModule {}
SharedModule.ɵfac = function SharedModule_Factory(t) {
  return new (t || SharedModule)();
};
SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: SharedModule
});
SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _material_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule, _components_button_button_component__WEBPACK_IMPORTED_MODULE_3__.ButtonComponent, _material_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent, _components_tech_skill_tech_skill_component__WEBPACK_IMPORTED_MODULE_4__.TechSkillComponent, _components_category_tech_skill_category_tech_skill_component__WEBPACK_IMPORTED_MODULE_5__.CategoryTechSkillComponent, _components_banner_banner_component__WEBPACK_IMPORTED_MODULE_6__.BannerComponent, _components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_7__.WrapperContainerComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _material_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule, _components_button_button_component__WEBPACK_IMPORTED_MODULE_3__.ButtonComponent],
    exports: [_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent, _material_material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule, _components_button_button_component__WEBPACK_IMPORTED_MODULE_3__.ButtonComponent, _components_tech_skill_tech_skill_component__WEBPACK_IMPORTED_MODULE_4__.TechSkillComponent, _components_category_tech_skill_category_tech_skill_component__WEBPACK_IMPORTED_MODULE_5__.CategoryTechSkillComponent, _components_banner_banner_component__WEBPACK_IMPORTED_MODULE_6__.BannerComponent, _components_wrapper_container_wrapper_container_component__WEBPACK_IMPORTED_MODULE_7__.WrapperContainerComponent]
  });
})();

/***/ }),

/***/ 713:
/*!*************************************!*\
  !*** ./src/app/store/app.reduce.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appReducer": () => (/* binding */ appReducer)
/* harmony export */ });
/* harmony import */ var _landing_page_components_projects_store_projects_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../landing-page/components/projects/store/projects.reducer */ 6209);
/* harmony import */ var _admin_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../admin/auth/store/auth.reducer */ 7881);


const appReducer = {
  projects: _landing_page_components_projects_store_projects_reducer__WEBPACK_IMPORTED_MODULE_0__.projectReducer,
  auth: _admin_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_1__.authReducer
};

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  API_URL_FIREBASE: 'https://porfolio-8433c-default-rtdb.firebaseio.com/projects',
  API_AUTH_FIREBASE_SIGNUP: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  API_AUTH_FIREBASE_SIGNIN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  API_KEY_FIREBASE: 'AIzaSyB1i143xgUQYNvO9BOLHh9N-tLLbYicGDI',
  API_DEV: 'http://localhost:3000/api/projects/',
  API_AUTH_DEV: 'http://localhost:3000'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map